import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Car, Trophy, Briefcase, Heart, CheckCircle } from "lucide-react";

const questions = [
  {
    question: "¿Cuál es tu principal motivación?",
    options: [
      { text: "Convertir mi hobby en negocio", type: "entrepreneur" },
      { text: "Perfeccionar mis habilidades", type: "perfectionist" },
      { text: "Ganar dinero extra", type: "pragmatic" },
      { text: "Pasión por los coches", type: "passionate" }
    ]
  },
  {
    question: "¿Cuánto tiempo puedes dedicar?", 
    options: [
      { text: "Fines de semana completos", type: "entrepreneur" },
      { text: "2-3 horas diarias", type: "perfectionist" },
      { text: "Solo los ratos libres", type: "pragmatic" },
      { text: "Todo el tiempo necesario", type: "passionate" }
    ]
  },
  {
    question: "¿Qué te emociona más?",
    options: [
      { text: "Tener mi propio negocio", type: "entrepreneur" },
      { text: "Dominar técnicas perfectas", type: "perfectionist" },
      { text: "Resultados rápidos", type: "pragmatic" },
      { text: "Trabajar con coches únicos", type: "passionate" }
    ]
  }
];

const results = {
  entrepreneur: {
    title: "El Emprendedor",
    icon: Briefcase,
    description: "Tienes mentalidad de negocio y visión para crear tu empresa",
    recommendation: "Experiencia Profesional + Módulo de Negocio",
    color: "text-blue-400"
  },
  perfectionist: {
    title: "El Perfeccionista", 
    icon: Trophy,
    description: "Buscas la excelencia técnica y resultados impecables",
    recommendation: "Workshop Avanzado + Técnicas Premium",
    color: "text-purple-400"
  },
  pragmatic: {
    title: "El Pragmático",
    icon: CheckCircle, 
    description: "Quieres resultados efectivos con el mínimo esfuerzo",
    recommendation: "Evento Express + Guías Rápidas",
    color: "text-green-400"
  },
  passionate: {
    title: "El Apasionado",
    icon: Heart,
    description: "El detailing es tu pasión y quieres vivir de ello",
    recommendation: "Experiencia Completa + Especialización Premium",
    color: "text-red-400"
  }
};

export function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const counts = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).reduce((a, b) => counts[a[0]] > counts[b[0]] ? a : b)[0];
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const resultType = getResult();
    const result = results[resultType as keyof typeof results];
    const Icon = result.icon;

    return (
      <Card className="glass-intense border-primary/30 hover-glow animate-scale-in">
        <CardContent className="p-8 text-center">
          <Icon className={`w-16 h-16 mx-auto mb-4 ${result.color}`} />
          <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
          <p className="text-white/80 mb-6">{result.description}</p>
          
          <div className="bg-gradient-primary/20 rounded-xl p-4 mb-6 border border-primary/30">
            <h4 className="font-semibold gradient-text mb-2">Tu Recomendación Personalizada:</h4>
            <p className="text-white">{result.recommendation}</p>
          </div>

          <div className="space-y-3">
            <Button variant="hero" className="w-full">
              VER MI EXPERIENCIA PERSONALIZADA
            </Button>
            <Button variant="ghost" onClick={reset} className="w-full text-white/70">
              Repetir Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-intense border-primary/30 hover-glow">
      <CardHeader>
        <CardTitle className="text-white text-center">
          ¿Qué tipo de detailer eres?
        </CardTitle>
        <Progress 
          value={((currentQuestion + 1) / questions.length) * 100} 
          className="w-full"
        />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="glass"
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswer(option.type)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}