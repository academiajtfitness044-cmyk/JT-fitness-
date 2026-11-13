import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Send, User as UserIcon, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FeedbackMessage {
  id: string;
  sender: "student" | "admin";
  text: string;
  date: string;
}

export function parseFeedback(feedback?: any): FeedbackMessage[] {
  if (!feedback) return [];
  if (Array.isArray(feedback)) return feedback;
  try {
    const parsed =
      typeof feedback === "string" ? JSON.parse(feedback) : feedback;
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    // Not JSON, assume legacy text
    return [
      {
        id: "legacy",
        sender: "student",
        text:
          typeof feedback === "string" ? feedback : JSON.stringify(feedback),
        date: new Date().toISOString(),
      },
    ];
  }
  return [];
}

export function FeedbacksView() {
  const { students, updateStudent } = useAppContext();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [replyText, setReplyText] = useState("");

  // Filter students who have some feedback
  const studentsWithFeedback = students.filter((s) => {
    const msgs = parseFeedback(s.feedback);
    return msgs.length > 0;
  });

  const selectedStudent = studentsWithFeedback.find(
    (s) => s.id === selectedStudentId,
  );
  const messages = parseFeedback(selectedStudent?.feedback);

  const handleSendReply = async () => {
    if (!selectedStudent || !replyText.trim()) return;

    try {
      const newMessageId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 15);

      const newMessage: FeedbackMessage = {
        id: newMessageId,
        sender: "admin",
        text: replyText.trim(),
        date: new Date().toISOString(),
      };

      const updatedMessages = [...messages, newMessage];

      // Save to context/DB
      await updateStudent(selectedStudent.id, {
        feedback: JSON.stringify(updatedMessages),
      });
      setReplyText("");
    } catch (e: any) {
      console.error(e);
      alert("Erro ao enviar mensagem: " + (e.message || String(e)));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full max-h-[80vh] bg-dark-bg border border-dark-border rounded-[32px] overflow-hidden">
      {/* Sidebar: List of students */}
      <div className="w-full md:w-1/3 border-r border-dark-border flex flex-col bg-dark-card/50">
        <div className="p-6 border-b border-dark-border">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="text-primary w-5 h-5" />
            Mensagens
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Bate-papo com os alunos
          </p>
        </div>

        <div className="flex-1 overflow-y-auto w-full">
          {studentsWithFeedback.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              Nenhum aluno enviou mensagem ainda.
            </div>
          ) : (
            studentsWithFeedback.map((s) => {
              const sMsgs = parseFeedback(s.feedback);
              const lastMsg = sMsgs[sMsgs.length - 1];
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStudentId(s.id)}
                  className={`w-full text-left p-6 flex flex-col gap-2 border-b border-white/5 transition-colors ${selectedStudentId === s.id ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-white/5 border-l-4 border-l-transparent"}`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-white text-sm">
                      {s.name}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {new Date(lastMsg?.date || "").toLocaleDateString(
                        "pt-BR",
                      )}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 truncate w-full">
                    {lastMsg?.sender === "admin" ? "Você: " : ""}
                    {lastMsg?.text}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-black/40">
        {selectedStudent ? (
          <>
            <div className="p-6 border-b border-dark-border flex items-center justify-between bg-dark-card/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold">
                    {selectedStudent.name}
                  </h3>
                  <span className="text-xs text-primary">
                    {selectedStudent.objective}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Tem certeza que deseja apagar todo o histórico de mensagens com este aluno? (Ação irreversível)",
                    )
                  ) {
                    updateStudent(selectedStudent.id, { feedback: "[]" });
                    setSelectedStudentId(null);
                  }
                }}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors px-3 py-2 rounded-lg text-xs"
              >
                Apagar Histórico
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => {
                  const isAdmin = msg.sender === "admin";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex w-full ${isAdmin ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                          isAdmin
                            ? "bg-primary text-black rounded-tr-none"
                            : "bg-dark-card border border-dark-border text-white rounded-tl-none"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <span
                          className={`text-[9px] mt-2 block ${isAdmin ? "text-black/60" : "text-gray-500"}`}
                        >
                          {new Date(msg.date).toLocaleString("pt-BR")}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="p-6 border-t border-dark-border bg-dark-card/50">
              <div className="flex relative">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl pl-6 pr-14 py-4 text-sm text-white focus:outline-none focus:border-primary transition-all"
                  placeholder="Escreva sua resposta..."
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-primary text-black rounded-lg w-10 flex items-center justify-center hover:bg-primary/80 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p>Selecione um aluno para ver as mensagens</p>
          </div>
        )}
      </div>
    </div>
  );
}
