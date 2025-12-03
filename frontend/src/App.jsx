import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Homepage from '../components/Homepage.jsx'
import Warehouse from '../components/Warehouse.jsx'
import Fastdelivery from '../components/Fastdelivery.jsx'
import Services from '../components/Services.jsx'
import Globalcoverage from '../components/Globalcoverage.jsx'
import Securehandling from '../components/Securehandling.jsx'
import Domesticshipping from '../components/Domesticshipping.jsx'
import Internationalshipping from '../components/Internationalshipping.jsx'
import Specialcargo from '../components/Specialcargo.jsx'
import Speedcargo from '../components/Speedcargo.jsx'
import OceanfreightDetails from '../components/OceanfreightDetails.jsx'
import AirfreightDetails from '../components/AirfreightDetails.jsx'
import RoadtransportDetails from '../components/Roadtransportdetails.jsx'
import HeavyCargoDetails from '../components/HeavyCargoDetails.jsx'
import Warehousedetails from '../components/Warehousedetails.jsx'
import Customsdetails from '../components/Customsdetails.jsx'
import StandardContainer from '../components/StandardContainer.jsx'
import Reefer from '../components/Reefer.jsx'
import ContainerHighcube from '../components/ContainerHighcube.jsx'
import Flatrack from '../components/Flatrack.jsx'
import OPentop from '../components/OPentop.jsx'
import OPentopDetails from '../components/OPentopDetails.jsx'
import Tank from '../components/Tank.jsx'
import Insulated from '../components/Insulated.jsx'
import Booking from '../components/Booking.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Review from '../components/Review.jsx'
import Myreviews from '../components/Myreviews.jsx'
import Login from '../components/Login.jsx'
import Signup from '../components/SIgnup.jsx'
import ClientDashboard from '../components/ClientDashboard.jsx'
import MyBookings from '../components/MyBookings.jsx'
import Settings from '../components/Settings.jsx'
import ChatBot from '../components/ChatBot.jsx'
import AdminDashboard from '../admin/AdminDashboard.jsx'
import './App.css'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return null
}

function AdminRoute(props) {
  var element = props.element

  var storedUser = null
  try {
    var rawUser = window.localStorage.getItem('authUser')
    storedUser = rawUser ? JSON.parse(rawUser) : null
  } catch (e) {
    storedUser = null
  }

  if (!storedUser || storedUser.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return element
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/fast-delivery" element={<Fastdelivery />} />
          <Route path="/global-coverage" element={<Globalcoverage />} />
          <Route path="/secure-handling" element={<Securehandling />} />
          <Route path="/domestic-shipping" element={<Domesticshipping />} />
          <Route path="/international-shipping" element={<Internationalshipping />} />
          <Route path="/special-cargo" element={<Specialcargo />} />
          <Route path="/speed-cargo" element={<Speedcargo />} />
          <Route path="/ocean-freight" element={<OceanfreightDetails />} />
          <Route path="/air-freight" element={<AirfreightDetails />} />
          <Route path="/road-transport" element={<RoadtransportDetails />} />
          <Route path="/heavy-cargo" element={<HeavyCargoDetails />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/warehouse-details" element={<Warehousedetails />} />
          <Route path="/customs-clearance" element={<Customsdetails />} />
          <Route path="/container/standard" element={<StandardContainer />} />
          <Route path="/container/reefer" element={<Reefer />} />
          <Route path="/container/high-cube" element={<ContainerHighcube />} />
          <Route path="/container/flatrack" element={<Flatrack />} />
          <Route path="/container/open-top" element={<OPentop />} />
          <Route path="/container/open-top/details" element={<OPentopDetails />} />
          <Route path="/container/tank" element={<Tank />} />
          <Route path="/container/insulated" element={<Insulated />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/my-reviews" element={<Myreviews />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/admin-dashboard"
            element={<AdminRoute element={<AdminDashboard />} />}
          />
        </Routes>

        <ChatBot />
      </div>
    </Router>
  )
}

export default App
