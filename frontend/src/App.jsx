import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserManagement from './pages/users/UserManagement'
import PropertyListing from "./pages/property/PropertyListing";  // ← new public page
import PropertyPage from "./pages/property/PropertyPage";         // ← keep as admin page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/property" element={<PropertyListing />} />        {/* public */}
        <Route path="/admin/property" element={<PropertyPage />} />     {/* admin */}
      </Routes>
    </BrowserRouter>
  )
}