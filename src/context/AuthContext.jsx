import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

// Keys for localStorage
const STORAGE_USER = 'ct_user'
const STORAGE_APPROVED = 'ct_approved_emails'
const STORAGE_REQUESTS = 'ct_requests'

// Helpers to read/write approved emails list
const getApproved = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_APPROVED) || '[]') } catch { return [] }
}
const setApproved = (list) => localStorage.setItem(STORAGE_APPROVED, JSON.stringify(list))

// Helpers to read/write access requests list
export const getRequests = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_REQUESTS) || '[]') } catch { return [] }
}
export const saveRequests = (list) => localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(list))

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USER)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (email, password) => {
    if (!email || !password) return { ok: false, reason: 'Please fill in all fields' }

    // Check if user is in the approved list
    const approved = getApproved()
    const found = approved.find(a => a.email.toLowerCase() === email.toLowerCase())
    if (!found) return { ok: false, reason: 'Access not granted. Request access or contact your admin.' }

    // Any password accepted for approved users (demo)
    const userData = { email: found.email, role: 'user', name: found.name || email.split('@')[0] }
    setUser(userData)
    localStorage.setItem(STORAGE_USER, JSON.stringify(userData))
    return { ok: true }
  }

  const adminLogin = (email, password) => {
    if (email === 'admin@carbontatva.com' && password === 'admin123') {
      const userData = { email, role: 'admin', name: 'Admin' }
      setUser(userData)
      localStorage.setItem(STORAGE_USER, JSON.stringify(userData))
      return { ok: true }
    }
    return { ok: false, reason: 'Invalid admin credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_USER)
  }

  // Called by AdminPage when approving a request
  const approveUser = (email, name) => {
    const approved = getApproved()
    if (!approved.find(a => a.email === email)) {
      setApproved([...approved, { email, name }])
    }
  }

  // Called by AdminPage when revoking/rejecting
  const revokeUser = (email) => {
    setApproved(getApproved().filter(a => a.email !== email))
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      adminLogin,
      logout,
      approveUser,
      revokeUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    return {
      user: null, isAuthenticated: false, isAdmin: false,
      login: () => ({ ok: false }), adminLogin: () => ({ ok: false }),
      logout: () => {}, approveUser: () => {}, revokeUser: () => {},
    }
  }
  return ctx
}
