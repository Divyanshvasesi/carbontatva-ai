import { useState } from 'react'
import {
  Search,
  Share2,
  Bell,
  Lock,
  Monitor,
  Smartphone,
  X,
  SlidersHorizontal,
  Save,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

function ToggleSwitch({ on, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors duration-200 mt-2 ${on ? 'bg-brand-green' : 'bg-gray-200'}`}
    >
      <span
        className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-200 ${on ? 'left-5' : 'left-1'}`}
      />
    </button>
  )
}

function HeaderAvatar() {
  return (
    <div className="relative shrink-0">
      <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden" />
      <span className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
    </div>
  )
}

export default function ProfilePage() {
  const [twoFaEnabled, setTwoFaEnabled] = useState(false)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const handleEmailUpdate = () => {
    console.log('Email update requested')
  }

  return (
    <div className="h-screen flex overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-gray-50 overflow-y-auto min-w-0">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-text-primary">Profile & Security</h1>
          <div className="flex items-center gap-4">
            <button type="button" className="text-gray-400 hover:text-gray-500 transition-colors">
              <Search size={20} />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-500 transition-colors">
              <Share2 size={20} />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-500 transition-colors">
              <Bell size={20} />
            </button>
            <HeaderAvatar />
          </div>
        </header>

        <p className="px-8 pt-5 pb-4 text-sm text-brand-green shrink-0">
          Manage your account details, security protocols, and active sessions.
        </p>

        {/* User Profile Card */}
        <div className="mx-8 mb-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-5">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-700 shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-text-primary">Dr. Elias Thorne</h2>
            <p className="text-sm text-brand-green font-medium mt-0.5">Lead Energy Auditor</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide mt-4 mb-2">Primary Email</p>
            <div className="flex items-center gap-3">
              <input
                type="email"
                readOnly
                value="elias.thorne@carbontatva.com"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-text-primary flex-1 outline-none"
              />
              <button
                type="button"
                onClick={handleEmailUpdate}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors shrink-0"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Security & Active Sessions */}
        <div className="mx-8 mb-5 grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lock size={18} className="text-brand-green" />
              <h3 className="text-base font-bold text-text-primary">Security</h3>
            </div>
            <label className="text-xs text-gray-400 uppercase tracking-wide mb-2 block">
              Current Password
            </label>
            <input
              type="password"
              readOnly
              value="••••••••"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full outline-none"
            />
            <label className="text-xs text-gray-400 uppercase tracking-wide mb-2 mt-4 block">
              New Password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full outline-none"
            />
            <button
              type="button"
              className="mt-5 w-full border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors"
            >
              Change Password
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Monitor size={18} className="text-brand-green" />
                <h3 className="text-base font-bold text-text-primary">Active Sessions</h3>
              </div>
              <button type="button" className="text-xs text-red-400 font-medium cursor-pointer hover:underline">
                Revoke All
              </button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl mb-3">
              <Monitor size={18} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">MacBook Pro - CarbonTatva Web</p>
                <p className="text-xs text-gray-400 mt-0.5">Frankfurt, DE • IP: 192.168.1.42</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-brand-green" />
                  <span className="text-xs text-brand-green font-medium">Current Session</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl">
              <Smartphone size={18} className="text-gray-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">iPhone 14 Pro - Carbon App</p>
                <p className="text-xs text-gray-400 mt-0.5">Berlin, DE • Last active: 2h ago</p>
              </div>
              <button type="button" className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                <X size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="mx-8 mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal size={18} className="text-brand-green" />
            <h3 className="text-base font-bold text-text-primary">System Preferences</h3>
          </div>

          <div className="flex items-start gap-12">
            <div>
              <p className="text-sm font-medium text-text-primary">2FA Enforcement</p>
              <p className="text-xs text-brand-green mt-0.5">Require for login</p>
              <ToggleSwitch on={twoFaEnabled} onToggle={() => setTwoFaEnabled(!twoFaEnabled)} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Theme Mode</p>
              <p className="text-xs text-gray-400 mt-0.5">Switch to Dark Mode</p>
              <ToggleSwitch on={darkModeEnabled} onToggle={() => setDarkModeEnabled(!darkModeEnabled)} />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-brand-green hover:bg-brand-greenHover text-white rounded-xl px-6 py-2.5 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Save size={15} />
              Save Preferences
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
