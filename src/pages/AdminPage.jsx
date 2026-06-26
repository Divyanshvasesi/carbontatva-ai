import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap,
  ShieldCheck,
  Bell,
  Search,
  LogOut,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import { useAuth, getRequests, saveRequests } from '../context/AuthContext'

// Hardcoded seed requests (shown if localStorage is empty)
const SEED_REQUESTS = [
  {
    id: 1,
    name: 'Priya Nair',
    email: 'priya.nair@greensteel.in',
    company: 'GreenSteel Industries',
    role: 'Energy Manager',
    submitted: '2026-06-24',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    email: 'arjun.m@texfab.co',
    company: 'TexFab Manufacturing',
    role: 'Plant Engineer',
    submitted: '2026-06-23',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Fatima Al-Rashid',
    email: 'f.alrashid@emiratespower.ae',
    company: 'Emirates Power Corp',
    role: 'Sustainability Lead',
    submitted: '2026-06-22',
    status: 'pending',
  },
  {
    id: 4,
    name: 'Marcus Weber',
    email: 'marcus.weber@bayernchem.de',
    company: 'Bayern Chemical AG',
    role: 'Chief Engineer',
    submitted: '2026-06-21',
    status: 'pending',
  },
  {
    id: 5,
    name: 'Li Wei',
    email: 'li.wei@sinocarbon.cn',
    company: 'SinoCarbon Solutions',
    role: 'ESG Analyst',
    submitted: '2026-06-20',
    status: 'pending',
  },
  {
    id: 6,
    name: 'Sarah Okafor',
    email: 's.okafor@lagosrefinery.ng',
    company: 'Lagos Refinery Co.',
    role: 'Operations Director',
    submitted: '2026-06-19',
    status: 'pending',
  },
]

function initRequests() {
  const stored = getRequests()
  if (stored.length === 0) {
    saveRequests(SEED_REQUESTS)
    return SEED_REQUESTS
  }
  return stored
}

function StatusBadge({ status }) {
  const map = {
    pending: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700/50',
    approved: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700/50',
    rejected: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700/50',
  }
  const icons = {
    pending: <Clock size={11} />,
    approved: <CheckCircle size={11} />,
    rejected: <XCircle size={11} />,
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${map[status]}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function AdminSidebar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="w-[210px] shrink-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-colors duration-200">
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-green to-brand-greenHover flex items-center justify-center shadow-sm shrink-0 relative">
            <Zap size={16} color="white" fill="white" />
            <span className="absolute -bottom-0.5 -right-0.5 bg-amber-500 rounded-full p-0.5">
              <ShieldCheck size={8} color="white" />
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-brand-green leading-tight">CarbonTatva AI</p>
            <p className="text-xs text-amber-500 leading-tight font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Admin info pill */}
      <div className="mx-3 mb-3 px-3 py-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-700/40">
        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Signed in as</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">{user?.email}</p>
      </div>

      <nav className="flex-1 px-2">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-3 mb-2 px-2">Navigation</p>
        <button type="button" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border-l-2 border-brand-green bg-green-50 dark:bg-green-900/20 text-brand-green font-medium text-sm mb-1">
          <Users size={15} className="text-brand-green shrink-0" />
          Access Requests
        </button>
        <button type="button" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-600 dark:text-gray-400 text-sm mb-1">
          <LayoutDashboard size={15} className="shrink-0" />
          Dashboard
        </button>
        <button type="button" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-600 dark:text-gray-400 text-sm">
          <Settings size={15} className="shrink-0" />
          Settings
        </button>
      </nav>

      <div className="pb-4 px-2">
        <button
          type="button"
          onClick={() => { logout(); navigate('/login') }}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer transition-colors group"
        >
          <LogOut size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

export default function AdminPage() {
  const { approveUser, revokeUser } = useAuth()
  const [requests, setRequests] = useState(() => initRequests())
  const [search, setSearch] = useState('')

  // Persist to localStorage whenever requests change
  useEffect(() => {
    saveRequests(requests)
  }, [requests])

  const pending = requests.filter(r => r.status === 'pending').length

  const updateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(r => {
      if (r.id !== id) return r
      // Update real auth approved list
      if (newStatus === 'approved') approveUser(r.email, r.name)
      else revokeUser(r.email)
      return { ...r, status: newStatus }
    }))
  }

  const filtered = requests.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-screen flex overflow-hidden font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-text-primary dark:text-white">Access Requests</h1>
            {pending > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-700/50">
                {pending} pending
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-gray-100 dark:bg-gray-700 rounded-xl pl-8 pr-3 py-2 text-sm outline-none placeholder:text-gray-400 text-text-primary dark:text-white w-44 transition-colors"
              />
            </div>
            <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto p-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            {[
              { label: 'Total', value: requests.length, color: 'text-text-primary dark:text-white', bg: 'bg-white dark:bg-gray-800' },
              { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
              { label: 'Approved', value: requests.filter(r => r.status === 'approved').length, color: 'text-brand-green', bg: 'bg-green-50 dark:bg-green-900/20' },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl border border-gray-100 dark:border-gray-700 px-5 py-4 transition-colors`}>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                <p className={`text-3xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Table wrapper — horizontal scroll if needed */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Name</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Email</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Company</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Role</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((req, idx) => (
                    <tr
                      key={req.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${idx < filtered.length - 1 ? 'border-b border-gray-50 dark:border-gray-700/50' : ''}`}
                    >
                      {/* Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-green to-brand-greenHover flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {req.name.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-text-primary dark:text-white whitespace-nowrap">{req.name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{req.email}</span>
                      </td>

                      {/* Company */}
                      <td className="px-4 py-3">
                        <span className="text-sm text-text-primary dark:text-gray-300 whitespace-nowrap">{req.company}</span>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{req.role}</span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-400 whitespace-nowrap">{req.submitted}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={req.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {req.status !== 'approved' && (
                            <button
                              type="button"
                              onClick={() => updateStatus(req.id, 'approved')}
                              className="px-2.5 py-1 bg-brand-green hover:bg-brand-greenHover text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                            >
                              Approve
                            </button>
                          )}
                          {req.status === 'approved' && (
                            <button
                              type="button"
                              onClick={() => updateStatus(req.id, 'rejected')}
                              className="px-2.5 py-1 border border-red-300 dark:border-red-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                            >
                              Revoke
                            </button>
                          )}
                          {req.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => updateStatus(req.id, 'rejected')}
                              className="px-2.5 py-1 border border-red-300 dark:border-red-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                            >
                              Reject
                            </button>
                          )}
                          {req.status === 'rejected' && (
                            <span className="text-xs text-gray-300 dark:text-gray-600 italic">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Users size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No requests match your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
