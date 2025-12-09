"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageCircle, Send, User, Bot } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getChatbotAnswer } from "@/app/actions"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "bot"
  text: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const botResponse = await getChatbotAnswer(input)
      const botMessage: Message = { role: "bot", text: botResponse }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        role: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg">
        <SheetHeader className="p-6">
          <SheetTitle>Style Advisor Chat</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-6 pb-6">
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm">
                  Hello! How can I help you today? Feel free to ask about our products, sizing, or policies.
                </p>
              </div>
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3",
                  m.role === "user" && "flex-row-reverse"
                )}
              >
                <Avatar>
                  <AvatarFallback>{m.role === "user" ? <User /> : <Bot />}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-xs rounded-lg p-3 sm:max-w-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg bg-muted p-3 sm:max-w-sm">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
