"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

interface Msg { role: "user" | "assistant"; content: string }

export default function ChatAssistant() {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your Learnix study assistant. Ask me anything about a lesson, a concept you're stuck on, or what to learn next." },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!user) return null; // chat assistant is a logged-in feature, tied to the user's own learning context

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await api.post("/ai/chat", { message: text });
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      setMessages((m) => [...m, { role: "assistant", content: err.response?.data?.message || "Something went wrong reaching the assistant. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="card mb-3 flex h-[28rem] w-80 flex-col overflow-hidden sm:w-96">
          <div className="flex items-center justify-between border-b border-themed px-4 py-3">
            <p className="text-sm font-semibold">Study Assistant</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "ml-auto bg-ink text-white" : "bg-ink/5 dark:bg-white/10"}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-xs text-muted"><Loader2 size={14} className="animate-spin" /> Thinking…</div>}
            <div ref={bottomRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-themed p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question…"
              className="flex-1 rounded-full border border-themed bg-transparent px-3 py-2 text-sm outline-none focus-visible:outline-2 focus-visible:outline-trail"
            />
            <button onClick={send} disabled={loading} aria-label="Send message" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-white disabled:opacity-50">
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open study assistant"
        className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-card hover:bg-ink/90"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
