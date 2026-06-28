import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { sendMessage as mistralSend } from '../services/mistral'

const ChatContext = createContext(null)

const STORAGE_KEY = 'ct_chats'

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function loadChats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveChats(chats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  } catch {
    // quota exceeded — silently fail
  }
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(() => loadChats())
  const [activeChatId, setActiveChatId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // ── Keep a ref always in sync so async functions can read latest state ──
  const chatsRef = useRef(chats)
  useEffect(() => {
    chatsRef.current = chats
    saveChats(chats)
  }, [chats])

  const activeChatIdRef = useRef(activeChatId)
  useEffect(() => {
    activeChatIdRef.current = activeChatId
  }, [activeChatId])

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null
  const messages = activeChat?.messages ?? []

  // ── Create a brand-new chat session ──────────────────────────────────────
  const createNewChat = useCallback(() => {
    const id = generateId()
    const newChat = {
      id,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    }
    setChats((prev) => [newChat, ...prev])
    setActiveChatId(id)
    setError(null)
    return id
  }, [])

  // ── Load an existing chat by id ───────────────────────────────────────────
  const loadChat = useCallback((id) => {
    setActiveChatId(id)
    setError(null)
  }, [])

  // ── Delete a chat ─────────────────────────────────────────────────────────
  const deleteChat = useCallback((id) => {
    setChats((prev) => prev.filter((c) => c.id !== id))
    setActiveChatId((prev) => (prev === id ? null : prev))
  }, [])

  // ── Send a user message and get an AI response ────────────────────────────
  const sendUserMessage = useCallback(async (text) => {
    if (!text.trim()) return

    // ① Determine / create the active chat
    let currentId = activeChatIdRef.current
    let existingMessages = []

    if (!currentId) {
      currentId = generateId()
      const newChat = {
        id: currentId,
        title: 'New Chat',
        messages: [],
        createdAt: Date.now(),
      }
      // Add new chat to both state AND the ref immediately
      chatsRef.current = [newChat, ...chatsRef.current]
      setChats([...chatsRef.current])
      setActiveChatId(currentId)
      activeChatIdRef.current = currentId
    } else {
      // Read existing messages from the ref (always latest, no stale closure)
      const existing = chatsRef.current.find((c) => c.id === currentId)
      existingMessages = existing?.messages ?? []
    }

    // ② Build the new user message object
    const userMsg = { role: 'user', content: text, id: generateId() }

    // ③ Compute full message list for API BEFORE any state update
    const apiMessages = [...existingMessages, userMsg].map(({ role, content }) => ({
      role,
      content,
    }))

    // ④ Auto-title: use first 5 words of first user message in this chat
    const isFirstMessage = existingMessages.length === 0
    const title = isFirstMessage
      ? text.trim().split(/\s+/).slice(0, 5).join(' ')
      : chatsRef.current.find((c) => c.id === currentId)?.title ?? 'New Chat'

    // ⑤ Append user message to state
    const updatedChats = chatsRef.current.map((c) =>
      c.id === currentId
        ? { ...c, title, messages: [...c.messages, userMsg] }
        : c,
    )
    chatsRef.current = updatedChats
    setChats(updatedChats)

    setIsLoading(true)
    setError(null)

    try {
      // ⑥ Call Mistral with the full history (including the new user message)
      const aiContent = await mistralSend(apiMessages)
      const aiMsg = { role: 'assistant', content: aiContent, id: generateId() }

      // ⑦ Append AI response to state
      const withAi = chatsRef.current.map((c) =>
        c.id === currentId ? { ...c, messages: [...c.messages, aiMsg] } : c,
      )
      chatsRef.current = withAi
      setChats(withAi)
    } catch (err) {
      setError(err.message || 'Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, []) // no deps needed — everything read via refs

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        activeChat,
        messages,
        isLoading,
        error,
        createNewChat,
        loadChat,
        deleteChat,
        sendUserMessage,
        clearError: () => setError(null),
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used inside ChatProvider')
  return ctx
}
