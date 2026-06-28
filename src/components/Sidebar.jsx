import { useNavigate } from 'react-router-dom'
import {
  Zap,
  Plus,
  Search,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Trash2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'
import { useState } from 'react'

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
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { chats, activeChatId, createNewChat, loadChat, deleteChat } = useChatContext()
  const [search, setSearch] = useState('')
  const [hoveredId, setHoveredId] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNewChat = () => {
    createNewChat()
    navigate('/chat')
  }

  const handleLoadChat = (id) => {
    loadChat(id)
    navigate('/chat')
  }

  const filteredChats = chats.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <aside className="w-[210px] shrink-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-colors duration-200">
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <LogoIcon size={32} />
          <div>
            <p className="text-base font-semibold text-brand-green leading-tight">CarbonTatva AI</p>
            <p className="text-xs text-gray-400 leading-tight">Emissions Intelligence</p>
          </div>
        </div>
      </div>

      {/* New Chat */}
      <button
        id="new-chat-btn"
        type="button"
        onClick={handleNewChat}
        className="mt-4 mx-2 flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-greenHover text-white rounded-xl py-2.5 font-semibold text-sm transition-colors w-[calc(100%-1rem)]"
      >
        <Plus size={16} strokeWidth={2.5} />
        New Chat
      </button>

      {/* Search */}
      <div className="relative mt-3 mx-2">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="w-full bg-gray-100 dark:bg-gray-700 rounded-xl pl-9 pr-3 py-2 text-sm border-none outline-none placeholder:text-gray-400 text-text-primary dark:text-white transition-colors"
        />
      </div>

      {/* Recent Chats list */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-5 mb-2 px-4">
          Recent Chats
        </p>

        {filteredChats.length === 0 ? (
          <p className="text-xs text-gray-400 px-4 py-2">
            {chats.length === 0 ? 'No chats yet' : 'No results'}
          </p>
        ) : (
          <ul>
            {filteredChats.map((chat) => {
              const isActive = chat.id === activeChatId
              return (
                <li
                  key={chat.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(chat.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleLoadChat(chat.id)}
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'border-l-2 border-brand-green bg-green-50 dark:bg-green-900/20 text-brand-green'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <MessageSquare
                      size={15}
                      className={
                        isActive
                          ? 'text-brand-green shrink-0'
                          : 'text-gray-400 dark:text-gray-500 shrink-0'
                      }
                    />
                    <span
                      className={`text-sm truncate flex-1 text-left ${
                        isActive
                          ? 'text-brand-green font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {chat.title}
                    </span>
                  </button>

                  {/* Delete button — shows on hover */}
                  {hoveredId === chat.id && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteChat(chat.id)
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-red-500 transition-colors"
                      title="Delete chat"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Bottom nav */}
      <div className="pb-4">
        <button
          type="button"
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors"
        >
          <Settings size={16} className="text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Settings</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors"
        >
          <HelpCircle size={16} className="text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Help &amp; Documentation</span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer transition-colors group"
        >
          <LogOut size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
            Log Out
          </span>
        </button>
      </div>
    </aside>
  )
}
