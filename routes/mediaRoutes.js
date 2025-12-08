const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Google Drive file details
const DRIVE_FILE_ID = '1HD419a8g6zUkTWhlBsOlqln_nwHMzRJf';
const PRIMARY_URL = `https://drive.usercontent.google.com/uc?id=${DRIVE_FILE_ID}&export=download`;
const FALLBACK_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;
// Optional: use Drive API if GOOGLE_API_KEY is provided
const API_KEY = process.env.GOOGLE_API_KEY || '';
const API_MEDIA_URL = API_KEY
  ? `https://www.googleapis.com/drive/v3/files/${DRIVE_FILE_ID}?alt=media&key=${API_KEY}`
  : '';

const CACHE_DIR = path.join(__dirname, '..', 'uploads', 'cache');
const CACHE_FILE = path.join(CACHE_DIR, 'roadcargo.mp4');

function ensureCacheDir() {
  try { fs.mkdirSync(CACHE_DIR, { recursive: true }); } catch (_) {}
}

function serveLocal(filePath, req, res, method = 'GET') {
  try {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    res.setHeader('content-type', 'video/mp4');
    res.setHeader('accept-ranges', 'bytes');
    res.setHeader('content-disposition', 'inline; filename="roadcargo.mp4"');
    res.setHeader('last-modified', stat.mtime.toUTCString());

    if (!range) {
      res.setHeader('content-length', fileSize);
      if (method === 'HEAD') return res.status(200).end();
      const fileStream = fs.createReadStream(filePath);
      return fileStream.pipe(res);
    }

    // Parse range header
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    if (isNaN(start) || isNaN(end) || start > end || end >= fileSize) {
      return res.status(416).set('content-range', `bytes */${fileSize}`).end();
    }
    const chunkSize = (end - start) + 1;
    res.status(206);
    res.setHeader('content-range', `bytes ${start}-${end}/${fileSize}`);
    res.setHeader('content-length', chunkSize);
    if (method === 'HEAD') return res.end();
    const stream = fs.createReadStream(filePath, { start, end });
    return stream.pipe(res);
  } catch (e) {
    return false;
  }
}

async function proxyStream(url, req, res, method = 'GET') {
  const headers = {
    // Forward Range header to support seeking/streaming
    ...(req.headers.range ? { Range: req.headers.range } : {}),
    // Spoof a UA to reduce chance of 403s
    'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    // Basic accept types
    Accept: req.headers.accept || 'video/mp4,video/*;q=0.9,*/*;q=0.8',
  };

  const response = await fetch(url, { method, headers, redirect: 'follow' });

  if (!response.ok) {
    throw new Error(`Upstream responded with status ${response.status}`);
  }

  // Copy essential headers for media playback
  const passHeaders = [
    'content-type',
    'content-length',
    'accept-ranges',
    'content-range',
    'cache-control',
    'etag',
    'last-modified',
  ];

  // Default content-type to video/mp4 if not present
  const contentType = response.headers.get('content-type') || 'video/mp4';

  passHeaders.forEach((h) => {
    const v = response.headers.get(h);
    if (v) {
      res.setHeader(h, v);
    }
  });
  if (!response.headers.get('content-type')) {
    res.setHeader('content-type', contentType);
  }
  if (!response.headers.get('accept-ranges')) {
    res.setHeader('accept-ranges', 'bytes');
  }
  if (!response.headers.get('content-disposition')) {
    res.setHeader('content-disposition', 'inline; filename="roadcargo.mp4"');
  }
  // Encourage client caching for a short period
  if (!response.headers.get('cache-control')) {
    res.setHeader('cache-control', 'public, max-age=3600');
  }

  // Status: propagate 206 for partial content, else 200
  const status = response.status === 206 ? 206 : 200;
  res.status(status);

  // For HEAD requests, do not stream body
  if (method === 'HEAD') {
    return res.end();
  }
  // Stream body for GET
  if (response.body) {
    response.body.on('error', (err) => {
      // End response on stream error
      try { res.end(); } catch (_) {}
    });
    response.body.pipe(res);
  } else {
    res.end();
  }
}

// Serve under both /roadcargo and /roadcargo.mp4
router.get(['/roadcargo', '/roadcargo.mp4'], async (req, res) => {
  try {
    // If we have a cached file, serve it locally (supports Range/seek)
    if (fs.existsSync(CACHE_FILE)) {
      return serveLocal(CACHE_FILE, req, res) || res.status(500).json({ message: 'Failed streaming cached video' });
    }

    ensureCacheDir();

    // Try Drive API first if available (most reliable)
    if (API_MEDIA_URL) {
      // Download and cache while streaming
      const tmpPath = CACHE_FILE + '.part';
      try { fs.unlinkSync(tmpPath); } catch (_) {}
      const headers = { ...(req.headers.range ? { Range: req.headers.range } : {}) };
      const response = await fetch(API_MEDIA_URL, { method: 'GET', headers, redirect: 'follow' });
      if (!response.ok) throw new Error('Drive API fetch failed ' + response.status);

      // Mirror headers for client
      res.setHeader('content-type', response.headers.get('content-type') || 'video/mp4');
      res.setHeader('accept-ranges', response.headers.get('accept-ranges') || 'bytes');
      const status = response.status === 206 ? 206 : 200;
      if (response.headers.get('content-range')) res.setHeader('content-range', response.headers.get('content-range'));
      if (response.headers.get('content-length')) res.setHeader('content-length', response.headers.get('content-length'));
      res.status(status);

      // Pipe to client and to temp file simultaneously only for full content (no Range)
      if (!req.headers.range) {
        const writeStream = fs.createWriteStream(tmpPath);
        response.body.on('data', (chunk) => writeStream.write(chunk));
        response.body.on('end', () => {
          writeStream.end(() => {
            try { fs.renameSync(tmpPath, CACHE_FILE); } catch (_) {}
          });
        });
        response.body.on('error', () => { try { writeStream.close(); fs.unlinkSync(tmpPath); } catch (_) {} });
      }

      return response.body.pipe(res);
    }
    // Try primary usercontent URL
    await proxyStream(PRIMARY_URL, req, res);
  } catch (e1) {
    try {
      // Fallback to alternative URL format
      await proxyStream(FALLBACK_URL, req, res);
    } catch (e2) {
      if (!res.headersSent) {
        res.status(502).json({ message: 'Failed to fetch video from Google Drive' });
      } else {
        try { res.end(); } catch (_) {}
      }
    }
  }
});

router.head(['/roadcargo', '/roadcargo.mp4'], async (req, res) => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return serveLocal(CACHE_FILE, req, res, 'HEAD') || res.status(200).end();
    }
    if (API_MEDIA_URL) {
      await proxyStream(API_MEDIA_URL, req, res, 'HEAD');
      return;
    }
    await proxyStream(PRIMARY_URL, req, res, 'HEAD');
  } catch (e1) {
    try {
      await proxyStream(FALLBACK_URL, req, res, 'HEAD');
    } catch (e2) {
      if (!res.headersSent) {
        res.status(502).end();
      } else {
        try { res.end(); } catch (_) {}
      }
    }
  }
});

// Safe test route
router.get('/test', function (req, res) {
  return res.json({ success: true, message: 'media routes work' });
});

module.exports = router;
