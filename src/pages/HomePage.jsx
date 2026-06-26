import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  History,
  Bell,
  BarChart2,
  Settings2,
  LayoutGrid,
  FileText,
  Paperclip,
  SendHorizontal,
} from 'lucide-react'
import Sidebar, { LogoIcon } from '../components/Sidebar'

const suggestionCards = [
  {
    title: 'Boiler Efficiency Audit',
    subtitle: 'Analyze combustion data for optimal fuel usage.',
    subtitleColor: 'text-brand-green',
    icon: BarChart2,
  },
  {
    title: 'VFD Optimization',
    subtitle: 'Review variable frequency drive parameters.',
    subtitleColor: 'text-gray-400',
    icon: Settings2,
  },
  {
    title: 'Renewable Feasibility',
    subtitle: 'Assess potential for solar/wind integration.',
    subtitleColor: 'text-brand-green',
    icon: LayoutGrid,
  },
  {
    title: 'Generate ESG Report',
    subtitle: 'Compile data for quarterly sustainability metrics.',
    subtitleColor: 'text-gray-400',
    icon: FileText,
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  return (
    <div className="h-screen flex overflow-hidden font-sans bg-[#F1F5F9] dark:bg-gray-900 transition-colors duration-200">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-[#F1F5F9] dark:bg-gray-900 overflow-hidden min-w-0 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-3 flex justify-end items-center gap-4 shrink-0 transition-colors duration-200">
          <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
            <History size={20} />
          </button>
          <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
            <Bell size={20} />
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            aria-label="Open profile"
          />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4 overflow-y-auto">
          <div className="mb-6">
            <LogoIcon size={56} />
          </div>
          <h1 className="text-4xl font-bold text-text-primary dark:text-white text-center">Good Morning,</h1>
          <h2 className="text-4xl font-bold text-brand-green text-center">How can I assist today?</h2>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-2xl w-full">
            {suggestionCards.map(({ title, subtitle, subtitleColor, icon: Icon }) => (
              <button
                key={title}
                type="button"
                onClick={() => setInput(title)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-all text-left"
              >
                <Icon size={20} className="text-brand-green mb-3" />
                <p className="text-sm font-semibold text-text-primary dark:text-white">{title}</p>
                <p className={`text-xs mt-1 ${subtitleColor}`}>{subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-6 py-4 shrink-0 transition-colors duration-200">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 flex items-center gap-3">
              <Paperclip size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your energy challenge or upload data..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 text-text-primary dark:text-white"
              />
              <button
                type="button"
                onClick={() => navigate('/chat')}
                className="w-9 h-9 rounded-xl bg-brand-green hover:bg-brand-greenHover flex items-center justify-center shrink-0 transition-colors"
              >
                <SendHorizontal size={16} className="text-white" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
              CarbonTatva AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
