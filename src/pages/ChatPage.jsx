import { useState } from 'react'
import {
  Search,
  Share2,
  History,
  Bell,
  RefreshCw,
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
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

function HeaderAvatar() {
  return (
    <div className="relative shrink-0">
      <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden" />
      <span className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white dark:border-gray-900" />
    </div>
  )
}

export default function ChatPage() {
  const [showPanel, setShowPanel] = useState(true)
  const [input, setInput] = useState('')

  return (
    <div className="h-screen flex overflow-hidden font-sans bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Left: Sidebar */}
      <Sidebar />

      {/* Center: Chat area */}
      <main className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden min-w-0 transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-8 py-4 flex justify-between items-center shrink-0 transition-colors duration-200">
          <h1 className="text-2xl font-bold text-text-primary dark:text-white">Motor Efficiency Optimization</h1>
          <div className="flex items-center gap-4">
            <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <Search size={20} />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <Share2 size={20} />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <History size={20} />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <Bell size={20} />
            </button>
            <HeaderAvatar />
          </div>
        </header>

        {/* Chat messages — scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-md bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tr-sm px-5 py-4 text-sm text-text-primary dark:text-gray-200 leading-relaxed">
              We have several 50HP induction motors in our textile plant that are running at around 60% load. What are the best strategies to optimize their efficiency?
            </div>
          </div>

          {/* AI response */}
          <div className="flex gap-3 mb-6">
            {/* AI avatar */}
            <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
              <Zap size={14} color="white" />
            </div>

            {/* Response body */}
            <div className="flex-1">
              <p className="text-sm text-text-primary dark:text-gray-200 leading-relaxed mb-5">
                For 50HP induction motors operating consistently at ~60% load, you are likely suffering from poor power factor and reduced efficiency. Here are the recommended strategies tailored to your textile plant scenario:
              </p>

              {/* Section 1 */}
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw size={15} className="text-brand-green shrink-0" />
                <h3 className="text-base font-semibold text-brand-green">1. Implement Variable Frequency Drives (VFDs)</h3>
              </div>
              <p className="text-sm text-text-primary dark:text-gray-300 leading-relaxed mb-3">
                Since the load is partial, installing VFDs can significantly reduce energy consumption by matching motor speed to the actual load requirement. This is particularly effective for centrifugal loads like pumps or fans often found in textile operations.
              </p>

              {/* Citation badge */}
              <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2 mb-4">
                <FileText size={12} />
                BEE Motor Energy Efficiency Guide, Sec 4.2
              </span>

              {/* Section 2 */}
              <div className="flex items-center gap-2 mb-2">
                <Zap size={15} className="text-brand-green shrink-0" />
                <h3 className="text-base font-semibold text-brand-green">2. Evaluate Motor Downsizing</h3>
              </div>
              <p className="text-sm text-text-primary dark:text-gray-300 leading-relaxed">
                If the load profile is consistently at 60% and rarely peaks, consider replacing the 50HP motors with appropriately sized Energy Efficient (IE3 or IE4) motors. Motors typically operate at peak efficiency between 75% and 100% load.
              </p>

              {/* Sources & Citations */}
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

              {/* Action buttons */}
              <div className="flex items-center gap-3 mt-4">
                <button type="button" className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                  <ThumbsUp size={16} />
                </button>
                <button type="button" className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                  <ThumbsDown size={16} />
                </button>
                <button type="button" className="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom input bar */}
        <div className="border-t border-gray-100 dark:border-gray-700 px-8 py-4 bg-white dark:bg-gray-900 shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3">
            <Paperclip size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask follow-up questions or request calculations..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 text-text-primary dark:text-white"
            />
            <button
              type="button"
              className="w-9 h-9 rounded-xl bg-brand-green hover:bg-brand-greenHover flex items-center justify-center shrink-0 transition-colors"
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
              <span className="text-sm font-semibold text-text-primary dark:text-white">Source Verification</span>
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
                <p className="text-sm font-semibold text-text-primary dark:text-white">BEE Motor Energy Efficiency Guide</p>
                <p className="text-xs text-gray-400 mt-0.5">Bureau of Energy Efficiency</p>
              </div>
            </div>
          </div>

          {/* Metrics row */}
          <div className="px-5 py-3 flex gap-6 border-b border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-xs text-text-primary dark:text-gray-200 font-medium mt-1">Page 42, Sec 4.2</p>
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
              ...in typical industrial scenarios where induction motors operate consistently below 70% of their rated load capacity.
            </p>

            {/* Highlighted quote */}
            <div className="bg-teal-50 dark:bg-teal-900/20 border-l-2 border-brand-green rounded-r-lg px-3 py-3 mb-3">
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "For partial loads, particularly around the 50-60% margin, the implementation of Variable Frequency Drives (VFDs) offers the most substantial energy savings by aligning the motor's operational speed with the actual mechanical load demands, thereby improving the overall power factor and reducing wasted energy..."
              </p>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Furthermore, considerations for motor rightsizing must be evaluated if the load profile is static and does not experience periodic spikes...
            </p>
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
