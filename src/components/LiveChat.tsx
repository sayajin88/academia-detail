import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

const commonQuestions = [
  "¿Cuánto dura el curso?",
  "¿Incluye certificación?",
  "¿Hay práctica real?",
  "¿Cuál es el precio final?"
];

const autoResponses = {
  "¿Cuánto dura el curso?": "El curso tiene una duración de 3 semanas con clases prácticas y teóricas. Puedes completarlo a tu ritmo.",
  "¿Incluye certificación?": "Sí, incluye certificación oficial al finalizar el curso, reconocida en el sector del detailing.",
  "¿Hay práctica real?": "Por supuesto, tendrás acceso a nuestro taller para practicar con vehículos reales bajo supervisión.",
  "¿Cuál es el precio final?": "El precio actual con descuento es de €199 + IVA (precio normal €999 + IVA). Incluye todo sin costos adicionales."
};

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: '¡Hola! 👋 Soy el asistente de Detail Park. ¿En qué puedo ayudarte?' }
  ]);
  const [isOnline] = useState(true);

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: question },
      { type: 'bot', text: autoResponses[question as keyof typeof autoResponses] }
    ]);
  };

  const ChatBubble = () => (
    <div className="fixed bottom-6 left-6 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/80 shadow-glow animate-bounce"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
      
      {!isOpen && (
        <div className="absolute -top-12 left-0 bg-white text-black px-3 py-2 rounded-lg text-sm whitespace-nowrap animate-bounce-in">
          ¿Necesitas ayuda? 💬
        </div>
      )}
    </div>
  );

  if (!isOpen) return <ChatBubble />;

  return (
    <div className="fixed bottom-6 left-6 z-50 w-80 animate-slide-in-right">
      <Card className="glass-intense border-primary/30 shadow-glow-intense">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Asistente Detail Park</h3>
              <p className="text-white/70 text-xs">En línea • Respuesta inmediata</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  {message.text}
                </div>
                {message.type === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="mb-3">
              <p className="text-white/70 text-xs mb-2">Preguntas frecuentes:</p>
              <div className="flex flex-wrap gap-1">
                {commonQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2 text-white/80 border border-white/20 hover:bg-primary/20"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <Button variant="hero" size="sm" className="w-full">
                <Send className="w-3 h-3 mr-2" />
                Contactar con un experto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}