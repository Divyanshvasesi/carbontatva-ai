import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RequestAccessPage from './pages/RequestAccessPage'
import AdminLoginPage from './pages/AdminLoginPage'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/request-access" element={<RequestAccessPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected user routes */}
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* Protected admin routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPage /></ProtectedRoute>} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
