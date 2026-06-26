import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Eye, EyeOff, Zap, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { adminLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = adminLogin(email, password)
      setLoading(false)
      if (result.ok) navigate('/admin')
      else setError(result.reason || 'Invalid admin credentials')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-surface-bg dark:bg-gray-900 flex flex-col items-center justify-center px-4 transition-colors duration-200">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-green to-brand-greenHover flex items-center justify-center shadow-sm relative">
          <Zap size={24} color="white" fill="white" />
          <span className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5">
            <ShieldCheck size={10} color="white" />
          </span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary dark:text-white mt-4">Admin Portal</h1>
        <p className="text-sm text-text-subtitle dark:text-gray-400 mt-1">Restricted — Authorized Personnel Only</p>
      </div>

      <div className="w-full max-w-sm mt-8 bg-surface-card dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-200">
        {/* Hint bar */}
        <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl px-4 py-3 mb-6">
          <ShieldCheck size={15} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            Use <strong>admin@carbontatva.com</strong> / <strong>admin123</strong> to sign in.
          </p>
        </div>

        <div className="mb-5">
          <label className="text-xs font-semibold text-text-label uppercase tracking-widest block mb-2">Admin Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disclaimer dark:text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignIn()}
              placeholder="admin@carbontatva.com"
              className="w-full bg-surface-input dark:bg-gray-700 border border-border-default dark:border-gray-600 rounded-xl px-4 py-3 pl-10 text-sm text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green placeholder:text-text-disclaimer dark:placeholder:text-gray-500 transition-colors"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold text-text-label uppercase tracking-widest block mb-2">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disclaimer dark:text-gray-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignIn()}
              placeholder="••••••••"
              className="w-full bg-surface-input dark:bg-gray-700 border border-border-default dark:border-gray-600 rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green placeholder:text-text-disclaimer dark:placeholder:text-gray-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disclaimer dark:text-gray-500 hover:text-text-secondary dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`w-full bg-brand-green hover:bg-brand-greenHover text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Signing in...' : <> Sign In to Admin <ArrowRight size={16} /> </>}
        </button>

        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
          <Link to="/login" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
            ← Back to User Login
          </Link>
        </div>
      </div>
    </div>
  )
}
