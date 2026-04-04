"use client";

import { cn } from "@/lib/utils";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatbotProps {
  locale: string;
}

export function Chatbot({ locale }: ChatbotProps) {
  const t = useTranslations("chatbot");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const welcome: Message = { role: "assistant", content: t("welcome") };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      if (messages.length === 0) setMessages([welcome]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, locale }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "..." }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: locale === "nl" ? "Er is een fout opgetreden. Probeer het opnieuw." : "An error occurred. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("close") : t("open")}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300",
          open
            ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
            : "bg-[var(--color-accent)] text-[var(--color-background)] shadow-[var(--color-accent-muted)]",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl transition-all duration-300 origin-bottom-right",
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none",
        )}
        style={{ height: "480px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent-muted)]">
            <Bot className="h-5 w-5 text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="font-display text-sm font-bold">{t("title")}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{t("subtitle")}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-hide">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.role === "assistant" && (
                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-muted)]">
                  <Bot className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  msg.role === "user"
                    ? "rounded-tr-sm bg-[var(--color-accent)] text-[var(--color-background)]"
                    : "rounded-tl-sm bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]",
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-muted)]">
                <Bot className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-[var(--color-surface-hover)] px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-[var(--color-text-muted)]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[var(--color-border)] p-3">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent-muted)] transition-all">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label={t("send")}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)] text-[var(--color-background)] transition-opacity disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
