import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, User, Mail, Building2, Briefcase, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
import { getRequests, saveRequests } from '../context/AuthContext'

export default function RequestAccessPage() {
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    jobTitle: '',
    reason: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.workEmail.trim()) e.workEmail = 'Work email is required'
    else if (!/\S+@\S+\.\S+/.test(form.workEmail)) e.workEmail = 'Enter a valid email'
    if (!form.companyName.trim()) e.companyName = 'Company name is required'
    if (!form.jobTitle.trim()) e.jobTitle = 'Job title is required'
    if (!form.reason.trim()) e.reason = 'Please provide a reason'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => {
      // Persist to localStorage so AdminPage can see this request
      const existing = getRequests()
      const alreadyExists = existing.find(r => r.email.toLowerCase() === form.workEmail.toLowerCase())
      if (!alreadyExists) {
        const newRequest = {
          id: Date.now(),
          name: form.fullName,
          email: form.workEmail,
          company: form.companyName,
          role: form.jobTitle,
          reason: form.reason,
          submitted: new Date().toISOString().split('T')[0],
          status: 'pending',
        }
        saveRequests([...existing, newRequest])
      }
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const inputBase = 'w-full bg-surface-input dark:bg-gray-700 border border-border-default dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green placeholder:text-text-disclaimer dark:placeholder:text-gray-500 transition-colors'
  const labelBase = 'text-xs font-semibold text-text-label uppercase tracking-widest block mb-2'
  const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 text-text-disclaimer dark:text-gray-500'

  return (
    <div className="min-h-screen bg-surface-bg dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-10 transition-colors duration-200">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-green to-brand-greenHover flex items-center justify-center shadow-sm">
          <Zap size={24} color="white" fill="white" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary dark:text-white mt-4">Request Access</h1>
        <p className="text-sm text-text-subtitle dark:text-gray-400 mt-1">Submit a request to your administrator</p>
      </div>

      <div className="w-full max-w-sm bg-surface-card dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-200">
        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-5">
              <CheckCircle size={36} className="text-brand-green" />
            </div>
            <h2 className="text-lg font-bold text-text-primary dark:text-white mb-2">Request Submitted!</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Your admin will review your request within <span className="font-semibold text-brand-green">24 hours</span>. You'll receive an email once approved.
            </p>
            <Link
              to="/login"
              className="w-full bg-brand-green hover:bg-brand-greenHover text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors text-sm"
            >
              Back to Sign In <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            {/* Full Name */}
            <div className="mb-4">
              <label className={labelBase}>Full Name</label>
              <div className="relative">
                <User size={15} className={`${iconClass} pointer-events-none`} />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                  placeholder="Dr. Elias Thorne"
                  className={`${inputBase} pl-10`}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Work Email */}
            <div className="mb-4">
              <label className={labelBase}>Work Email</label>
              <div className="relative">
                <Mail size={15} className={`${iconClass} pointer-events-none`} />
                <input
                  type="email"
                  value={form.workEmail}
                  onChange={handleChange('workEmail')}
                  placeholder="you@company.com"
                  className={`${inputBase} pl-10`}
                />
              </div>
              {errors.workEmail && <p className="text-xs text-red-500 mt-1">{errors.workEmail}</p>}
            </div>

            {/* Company Name */}
            <div className="mb-4">
              <label className={labelBase}>Company Name</label>
              <div className="relative">
                <Building2 size={15} className={`${iconClass} pointer-events-none`} />
                <input
                  type="text"
                  value={form.companyName}
                  onChange={handleChange('companyName')}
                  placeholder="Acme Industrial Ltd."
                  className={`${inputBase} pl-10`}
                />
              </div>
              {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
            </div>

            {/* Job Title */}
            <div className="mb-4">
              <label className={labelBase}>Job Title</label>
              <div className="relative">
                <Briefcase size={15} className={`${iconClass} pointer-events-none`} />
                <input
                  type="text"
                  value={form.jobTitle}
                  onChange={handleChange('jobTitle')}
                  placeholder="Energy Manager"
                  className={`${inputBase} pl-10`}
                />
              </div>
              {errors.jobTitle && <p className="text-xs text-red-500 mt-1">{errors.jobTitle}</p>}
            </div>

            {/* Reason */}
            <div className="mb-6">
              <label className={labelBase}>Reason for Access</label>
              <div className="relative">
                <MessageSquare size={15} className="absolute left-3 top-3.5 text-text-disclaimer dark:text-gray-500 pointer-events-none" />
                <textarea
                  value={form.reason}
                  onChange={handleChange('reason')}
                  rows={3}
                  placeholder="Briefly describe how you'll use CarbonTatva AI..."
                  className={`${inputBase} pl-10 resize-none`}
                />
              </div>
              {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-brand-green hover:bg-brand-greenHover text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-all text-sm ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : <><span>Submit Request</span><ArrowRight size={15} /></>}
            </button>

            {/* Sign in link */}
            <div className="mt-5 text-center">
              <Link
                to="/login"
                className="text-sm text-brand-green font-medium hover:underline"
              >
                Already have access? Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
