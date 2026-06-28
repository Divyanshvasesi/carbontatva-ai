import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Share2,
  History,
  Bell,
  Zap,
  FileText,
  Link,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Paperclip,
  SendHorizontal,
  CheckSquare,
  X,
  CheckCircle,
  ChevronsUpDown,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import { useChatContext } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Render a Mistral markdown-ish response into React elements.
 * Supports: **bold**, headings (##), bullet points, and plain text.
 */
function renderMarkdown(text) {
  const lines = text.split('\n')
  const elements = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      elements.push(<br key={key++} />)
      continue
    }

    // ## Heading
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={key++} className="text-sm font-semibold text-brand-green mt-3 mb-1">
          {trimmed.slice(3)}
        </h3>,
      )
      continue
    }
    // ### Sub-heading
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={key++} className="text-sm font-medium text-text-primary dark:text-gray-300 mt-2 mb-1">
          {trimmed.slice(4)}
        </h4>,
      )
      continue
    }

    // Bullet point
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.slice(2)
      elements.push(
        <li key={key++} className="text-sm text-text-primary dark:text-gray-300 leading-relaxed ml-4 list-disc">
          {applyInline(content)}
        </li>,
      )
      continue
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s/, '')
      elements.push(
        <li key={key++} className="text-sm text-text-primary dark:text-gray-300 leading-relaxed ml-4 list-decimal">
          {applyInline(content)}
        </li>,
      )
      continue
    }

    // Normal paragraph
    elements.push(
      <p key={key++} className="text-sm text-text-primary dark:text-gray-300 leading-relaxed">
        {applyInline(trimmed)}
      </p>,
    )
  }

  return elements
}

function applyInline(text) {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-text-primary dark:text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

// ─── Loading dots component ──────────────────────────────────────────────────

function LoadingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-brand-green rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

// ─── Profile avatar button ───────────────────────────────────────────────────

function ProfileButton() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'

  return (
    <button
      type="button"
      id="header-profile-btn"
      onClick={() => navigate('/profile')}
      className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity text-white text-xs font-bold"
      aria-label="Open profile"
    >
      {initials}
    </button>
  )
}

function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

// ─── Single message bubble ───────────────────────────────────────────────────

function MessageBubble({ message, onCopy }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-md bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tr-sm px-5 py-4 text-sm text-text-primary dark:text-gray-200 leading-relaxed">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3 mb-6">
      {/* AI avatar */}
      <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
        <Zap size={14} color="white" />
      </div>

      {/* Response body */}
      <div className="flex-1 min-w-0">
        <div className="space-y-1">{renderMarkdown(message.content)}</div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            title="Thumbs up"
          >
            <ThumbsUp size={15} />
          </button>
          <button
            type="button"
            className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            title="Thumbs down"
          >
            <ThumbsDown size={15} />
          </button>
          <button
            type="button"
            onClick={() => onCopy(message.content)}
            className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            title="Copy"
          >
            <Copy size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({ onSuggestion }) {
  const suggestions = [
    'How do I optimize motor efficiency at 60% load?',
    'Explain ISO 50001 energy audit requirements',
    'What VFD settings reduce energy consumption?',
    'How to calculate Scope 2 emissions for my plant?',
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-green to-brand-greenHover flex items-center justify-center mb-5 shadow-lg">
        <Zap size={28} color="white" fill="white" />
      </div>
      <h2 className="text-xl font-bold text-text-primary dark:text-white mb-2">
        Start a Conversation
      </h2>
      <p className="text-sm text-gray-400 mb-8 max-w-sm">
        Ask CarbonTatva AI about energy efficiency, emissions, sustainability compliance, or industrial optimization.
      </p>
      <div className="grid grid-cols-1 gap-2 max-w-sm w-full">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSuggestion(s)}
            className="text-left text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-brand-green rounded-xl px-4 py-2.5 border border-gray-100 dark:border-gray-700 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main ChatPage ────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [showPanel, setShowPanel] = useState(true)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const { messages, isLoading, error, sendUserMessage, clearError, activeChat } =
    useChatContext()

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    inputRef.current?.focus()
    await sendUserMessage(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  const handleSuggestion = (text) => {
    setInput(text)
    inputRef.current?.focus()
  }

  const chatTitle = activeChat?.title || 'CarbonTatva AI'

  return (
    <div className="h-screen flex overflow-hidden font-sans bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Left: Sidebar */}
      <Sidebar />

      {/* Center: Chat area */}
      <main className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden min-w-0 transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-8 py-4 flex justify-between items-center shrink-0 transition-colors duration-200">
          <h1
            className="text-xl font-bold text-text-primary dark:text-white truncate max-w-xs"
            title={chatTitle}
          >
            {chatTitle}
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              title="Search"
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              title="Share"
            >
              <Share2 size={20} />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              title="History"
            >
              <History size={20} />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              title="Notifications"
            >
              <Bell size={20} />
            </button>
            <ThemeToggleButton />
            <ProfileButton />
          </div>
        </header>

        {/* Chat messages — scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col">
          {messages.length === 0 && !isLoading ? (
            <EmptyState onSuggestion={handleSuggestion} />
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onCopy={handleCopy} />
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
                    <Zap size={14} color="white" />
                  </div>
                  <div className="flex-1">
                    <LoadingDots />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-8 mb-2 flex items-center justify-between gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2.5">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            <button
              type="button"
              onClick={clearError}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Copy success toast */}
        {copied && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none z-50">
            Copied to clipboard!
          </div>
        )}

        {/* Bottom input bar */}
        <div className="border-t border-gray-100 dark:border-gray-700 px-8 py-4 bg-white dark:bg-gray-900 shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3">
            <Paperclip size={18} className="text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask follow-up questions or request calculations..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 text-text-primary dark:text-white"
              disabled={isLoading}
            />
            <button
              id="chat-send-btn"
              type="button"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-brand-green hover:bg-brand-greenHover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0 transition-colors"
            >
              <SendHorizontal size={16} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            AI responses may contain inaccuracies. Verify critical industrial parameters.
          </p>
        </div>
      </main>

      {/* Right: Source Verification panel */}
      {showPanel && (
        <aside className="w-72 border-l border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col overflow-y-auto shrink-0 transition-colors duration-200">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <CheckSquare size={16} className="text-brand-green" />
              <span className="text-sm font-semibold text-text-primary dark:text-white">
                Source Verification
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPanel(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Source card */}
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen size={16} className="text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary dark:text-white">
                  BEE Motor Energy Efficiency Guide
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Bureau of Energy Efficiency</p>
              </div>
            </div>
          </div>

          {/* Metrics row */}
          <div className="px-5 py-3 flex gap-6 border-b border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-xs text-text-primary dark:text-gray-200 font-medium mt-1">
                Page 42, Sec 4.2
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Confidence</p>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle size={12} className="text-brand-green" />
                <span className="text-xs text-brand-green font-semibold">98%</span>
              </div>
            </div>
          </div>

          {/* Source excerpt */}
          <div className="px-5 py-4 flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Source Excerpt</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              ...in typical industrial scenarios where induction motors operate consistently below
              70% of their rated load capacity.
            </p>
            <div className="bg-teal-50 dark:bg-teal-900/20 border-l-2 border-brand-green rounded-r-lg px-3 py-3 mb-3">
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "For partial loads, particularly around the 50-60% margin, the implementation of
                Variable Frequency Drives (VFDs) offers the most substantial energy savings by
                aligning the motor's operational speed with the actual mechanical load demands..."
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Furthermore, considerations for motor rightsizing must be evaluated if the load
              profile is static and does not experience periodic spikes...
            </p>

            {/* Quick links */}
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wide mb-3">
                <BookOpen size={12} />
                Sources &amp; Citations
              </p>
              <div className="flex items-center gap-2 text-xs text-brand-green mb-2 cursor-pointer hover:opacity-80 transition-opacity">
                <FileText size={12} />
                <span>BEE Motor Energy Efficiency Guide, Section 4.2, Page 42</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-green cursor-pointer hover:opacity-80 transition-opacity">
                <Link size={12} />
                <span>Industrial Motor Downsizing Best Practices</span>
              </div>
            </div>
          </div>

          {/* Expand context button */}
          <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-3 mt-auto">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1 text-xs text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <ChevronsUpDown size={14} />
              Expand Context
            </button>
          </div>
        </aside>
      )}
    </div>
  )
}
