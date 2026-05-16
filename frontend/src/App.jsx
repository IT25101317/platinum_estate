import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import UserManagement from './pages/users/UserManagement'
import AdminManagement from './pages/admin/AdminManagement'
import PropertyListing from './pages/property/PropertyListing'
import PropertyPage from './pages/property/PropertyPage'
import BookingManagement from './pages/booking/BookingManagement'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/admin/admins" element={<AdminManagement />} />
        <Route path="/property" element={<PropertyListing />} />
        <Route path="/admin/property" element={<PropertyPage />} />
        <Route path="/booking" element={<BookingManagement />} />
      </Routes>
    </BrowserRouter>
  )
}