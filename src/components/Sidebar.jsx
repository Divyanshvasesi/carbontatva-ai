import {
  Zap,
  Plus,
  Search,
  MessageSquare,
  Settings,
  HelpCircle,
} from 'lucide-react'

const recentChats = [
  { label: 'Motor Efficiency', color: 'text-gray-700' },
  { label: 'Boiler Audit', color: 'text-gray-700' },
  { label: 'Renewable Integration', color: 'text-brand-green' },
  { label: 'Scope 2 Reduction', color: 'text-gray-700' },
  { label: 'HVAC Optimization', color: 'text-orange-400' },
  { label: 'Compressed Air Savi...', color: 'text-gray-700', truncate: true },
]

export function LogoIcon({ size = 32 }) {
  const iconSize = size === 56 ? 28 : 16
  return (
    <div
      className="rounded-2xl bg-gradient-to-br from-brand-green to-brand-greenHover flex items-center justify-center shadow-sm shrink-0"
      style={{ width: size, height: size }}
    >
      <Zap size={iconSize} color="white" fill="white" />
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-[210px] shrink-0 bg-white border-r border-gray-100 flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <LogoIcon size={32} />
          <div>
            <p className="text-base font-semibold text-brand-green leading-tight">CarbonTatva AI</p>
            <p className="text-xs text-gray-400 leading-tight">Emissions Intelligence</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 mx-2 flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-greenHover text-white rounded-xl py-2.5 font-semibold text-sm transition-colors w-[calc(100%-1rem)]"
      >
        <Plus size={16} strokeWidth={2.5} />
        New Chat
      </button>

      <div className="relative mt-3 mx-2">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full bg-gray-100 rounded-xl pl-9 pr-3 py-2 text-sm border-none outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-5 mb-2 px-4">
          Recent Chats
        </p>
        <ul>
          {recentChats.map(({ label, color, truncate }) => (
            <li key={label}>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <MessageSquare size={15} className="text-gray-400 shrink-0" />
                <span className={`text-sm ${color} ${truncate ? 'truncate' : ''}`}>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-4">
        <button
          type="button"
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
        >
          <Settings size={16} className="text-gray-400" />
          <span className="text-sm text-gray-500">Settings</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
        >
          <HelpCircle size={16} className="text-gray-400" />
          <span className="text-sm text-gray-500">Help & Documentation</span>
        </button>
      </div>
    </aside>
  )
}
