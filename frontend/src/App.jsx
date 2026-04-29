import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserManagement from './pages/users/UserManagement'
import PropertyPage from "./pages/property/PropertyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/property" element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  )
}