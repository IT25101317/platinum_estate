import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import UserManagement from './pages/users/UserManagement'
import PropertyListing from "./pages/property/PropertyListing"
import PropertyPage from "./pages/property/PropertyPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/property" element={<PropertyListing />} />
        <Route path="/admin/property" element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  )
}