import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserManagement from './pages/users/UserManagement'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  )
}