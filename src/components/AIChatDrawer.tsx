import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCw,
  User,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { Student } from '../types';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  students,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Olá, Treinador! Sou seu copiloto de inteligência artificial da Academia JT Fitness. Como posso ajudar com periodizações, treinos de musculação, cálculos de TMB/macros ou ajustes para seus alunos hoje?',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            totalStudents: students.length,
            activeAthletes: students.map((s) => ({ name: s.name, objective: s.objective })),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Falha ao processar mensagem.');
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Entendido. Como posso detalhar mais essa estratégia?',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Error in AI chat:', err);
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Desculpe, ocorreu um erro ao consultar o assistente. Verifique a conexão e tente novamente.',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 p-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 text-zinc-950 font-black shadow-md shadow-yellow-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                Treinador IA Copilot
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              </h3>
              <p className="text-[10px] text-zinc-400">Academia JT Fitness &bull; Copilot</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Question Prompts */}
        <div className="py-2.5 flex gap-1.5 overflow-x-auto scrollbar-none border-b border-zinc-900">
          {[
            'Como periodizar deltoides?',
            'Cálculo de macros para cutting',
            'Substitutos de frango na TBCA',
            'Como corrigir assimetria de braço?',
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              className="shrink-0 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:border-yellow-500/50 hover:text-yellow-400"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="h-7 w-7 shrink-0 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-bold text-xs">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-yellow-400 text-zinc-950 font-medium rounded-tr-none'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`block text-[9px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-zinc-800' : 'text-zinc-500'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 pl-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-yellow-400" />
              <span>Treinador IA formulando resposta técnica...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="pt-3 border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida clínica ou técnica..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-3 pr-10 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-yellow-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 text-black disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
