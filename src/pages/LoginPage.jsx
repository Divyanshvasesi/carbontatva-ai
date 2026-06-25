import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setError('')
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/home') }, 1500)
  }

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-green to-brand-greenHover flex items-center justify-center shadow-sm">
          <Zap size={24} color="white" fill="white" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mt-4">CarbonTatva AI</h1>
        <p className="text-sm text-text-subtitle mt-1">Expert Industrial Sustainability Advisor</p>
      </div>

      <div className="w-full max-w-sm mt-8 bg-surface-card rounded-2xl shadow-lg p-8">
        <div className="mb-5">
          <label className="text-xs font-semibold text-text-label uppercase tracking-widest block mb-2">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disclaimer" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@enterprise.com"
              className="w-full bg-surface-input border border-border-default rounded-xl px-4 py-3 pl-10 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green placeholder:text-text-disclaimer" />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-text-label uppercase tracking-widest">Password</label>
            <span className="text-xs text-brand-green font-medium cursor-pointer hover:underline">Forgot Password?</span>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disclaimer" />
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-input border border-border-default rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green placeholder:text-text-disclaimer" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disclaimer hover:text-text-secondary">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

        <button onClick={handleSignIn} disabled={loading}
          className={`w-full bg-brand-green hover:bg-brand-greenHover text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
          {loading ? 'Signing in...' : <> Sign In <ArrowRight size={16} /> </>}
        </button>

        <p className="mt-6 text-xs text-center text-text-disclaimer">
          Authorized <span className="text-brand-green font-medium">enterprise</span> access only. System access is <span className="text-brand-green font-medium">monitored</span>.
        </p>
      </div>
    </div>
  )
}