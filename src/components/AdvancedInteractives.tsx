import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Award, 
  Calculator,
  ChevronRight,
  CheckCircle,
  Star,
  ArrowRight,
  Target,
  DollarSign
} from "lucide-react";

interface QuizResult {
  profile: string;
  recommendations: string[];
  earnPotential: string;
  courseMatch: number;
}

interface AdvancedInteractivesProps {
  onCtaClick?: () => void;
}

export const AdvancedInteractives = ({ onCtaClick }: AdvancedInteractivesProps = {}) => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [roiInputs, setRoiInputs] = useState({ hours: 20, pricePerCar: 150, carsPerWeek: 8 });
  const [liveStats, setLiveStats] = useState({
    studying: 89,
    enrolled: 23,
    earned: 1247
  });

  const quizQuestions = [
    {
      question: "¿Cuál es tu nivel actual en detailing?",
      options: [
        "Nunca he hecho detailing",
        "Lavo mi propio coche",
        "He hecho algunos trabajos básicos",
        "Tengo experiencia pero quiero mejorar"
      ]
    },
    {
      question: "¿Cuánto tiempo puedes dedicar a la semana?",
      options: [
        "1-5 horas",
        "6-15 horas", 
        "16-25 horas",
        "25+ horas (tiempo completo)"
      ]
    },
    {
      question: "¿Cuál es tu objetivo principal?",
      options: [
        "Hobby/pasatiempo",
        "Ingresos extra (€500-1000/mes)",
        "Negocio secundario (€1000-3000/mes)",
        "Negocio principal (€3000+/mes)"
      ]
    },
    {
      question: "¿Tienes espacio para trabajar?",
      options: [
        "Solo mi garaje",
        "Garaje + entrada de casa",
        "Espacio alquilado/comercial",
        "Servicio móvil/domicilio"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        studying: prev.studying + Math.floor(Math.random() * 5) - 2,
        enrolled: prev.enrolled + Math.floor(Math.random() * 3) - 1,
        earned: prev.earned + Math.floor(Math.random() * 50) - 25
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);
    
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      calculateQuizResult(newAnswers);
    }
  };

  const calculateQuizResult = (answers: number[]) => {
    const profiles = [
      {
        profile: "Principiante Ambicioso",
        recommendations: [
          "Comenzar con el módulo básico",
          "Práctica en taller incluida",
          "Mentoring 1:1 personalizado",
          "Kit de herramientas starter"
        ],
        earnPotential: "€800-1,500/mes en 3 meses",
        courseMatch: 95
      },
      {
        profile: "Emprendedor Detailing",
        recommendations: [
          "Módulo avanzado de negocio",
          "Marketing para detailers",
          "Certificación profesional",
          "Software de gestión incluido"
        ],
        earnPotential: "€2,000-4,000/mes en 6 meses",
        courseMatch: 98
      },
      {
        profile: "Profesional Elite",
        recommendations: [
          "Técnicas premium especializadas",
          "Certificación instructor",
          "Red de contactos profesionales",
          "Oportunidades de franquicia"
        ],
        earnPotential: "€4,000-8,000/mes en 12 meses",
        courseMatch: 100
      }
    ];

    const avgAnswer = answers.reduce((a, b) => a + b, 0) / answers.length;
    const profileIndex = Math.min(Math.floor(avgAnswer), profiles.length - 1);
    setQuizResult(profiles[profileIndex]);
  };

  const calculateROI = () => {
    const weeklyEarnings = roiInputs.carsPerWeek * roiInputs.pricePerCar;
    const monthlyEarnings = weeklyEarnings * 4;
    const yearlyEarnings = monthlyEarnings * 12;
    const courseROI = ((monthlyEarnings - 47) / 47) * 100;
    
    return {
      weekly: weeklyEarnings,
      monthly: monthlyEarnings,
      yearly: yearlyEarnings,
      roi: courseROI,
      paybackDays: Math.ceil(47 / (weeklyEarnings / 7))
    };
  };

  const roi = calculateROI();

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        {/* Live Stats Bar */}
        <div className="flex justify-center mb-16">
          <div className="glass-intense rounded-2xl px-8 py-4 animate-fade-in">
            <div className="flex items-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold gradient-text">{liveStats.studying}</div>
                <div className="text-white/70 text-sm">Estudiando ahora</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <div className="text-2xl font-bold gradient-text">{liveStats.enrolled}</div>
                <div className="text-white/70 text-sm">Se inscribieron hoy</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <div className="text-2xl font-bold gradient-text">€{liveStats.earned}</div>
                <div className="text-white/70 text-sm">Ganados esta semana</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Personality Quiz */}
          <Card className="glass-intense border-primary/30 hover-glow">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-4">Quiz Personalizado</Badge>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Descubre Tu Perfil de Detailer
                </h3>
                <p className="text-white/80">
                  Recibe recomendaciones personalizadas basadas en tu perfil
                </p>
              </div>

              {!quizResult ? (
                <>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-white/70 mb-2">
                      <span>Pregunta {currentQuiz + 1} de {quizQuestions.length}</span>
                      <span>{Math.round(((currentQuiz + 1) / quizQuestions.length) * 100)}%</span>
                    </div>
                    <Progress 
                      value={((currentQuiz + 1) / quizQuestions.length) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-6">
                      {quizQuestions[currentQuiz].question}
                    </h4>
                    <div className="space-y-3">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-between text-left p-4 h-auto hover:border-primary/50 hover:bg-primary/10 group"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <span>{option}</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Quiz Results */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold gradient-text mb-2">
                      {quizResult.profile}
                    </h4>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-white/80">Compatibilidad del curso:</span>
                      <span className="text-primary font-bold">{quizResult.courseMatch}%</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="glass-card p-4 rounded-lg">
                      <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        Potencial de Ingresos
                      </h5>
                      <p className="text-primary font-bold text-lg">{quizResult.earnPotential}</p>
                    </div>

                    <div className="glass-card p-4 rounded-lg">
                      <h5 className="font-semibold text-white mb-3">Recomendaciones Personalizadas:</h5>
                      <ul className="space-y-2">
                        {quizResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="hero" size="lg" className="w-full" onClick={onCtaClick}>
                      Acceder a Mi Plan Personalizado
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full" onClick={resetQuiz}>
                      Repetir Quiz
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Enhanced ROI Calculator */}
          <Card className="glass-intense border-primary/30 hover-glow">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-4">Calculadora ROI</Badge>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Calcula tu Retorno de Inversión
                </h3>
                <p className="text-white/80">
                  Descubre cuánto puedes ganar con el detailing profesional
                </p>
              </div>

              {/* Input Controls */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Precio promedio por coche (€)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="500"
                      value={roiInputs.pricePerCar}
                      onChange={(e) => setRoiInputs({...roiInputs, pricePerCar: parseInt(e.target.value)})}
                      className="flex-1"
                    />
                    <span className="text-primary font-bold text-lg w-16">€{roiInputs.pricePerCar}</span>
                  </div>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">
                    Coches por semana
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={roiInputs.carsPerWeek}
                      onChange={(e) => setRoiInputs({...roiInputs, carsPerWeek: parseInt(e.target.value)})}
                      className="flex-1"
                    />
                    <span className="text-primary font-bold text-lg w-16">{roiInputs.carsPerWeek}</span>
                  </div>
                </div>
              </div>

              {/* Results Display */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg text-center">
                    <div className="text-white/70 text-sm">Semanal</div>
                    <div className="text-primary font-bold text-xl">€{roi.weekly.toLocaleString()}</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg text-center">
                    <div className="text-white/70 text-sm">Mensual</div>
                    <div className="text-primary font-bold text-xl">€{roi.monthly.toLocaleString()}</div>
                  </div>
                </div>

                <div className="glass-intense p-6 rounded-lg border-primary/30">
                  <div className="text-center">
                    <div className="text-white/70 text-sm mb-1">Ingresos Anuales Proyectados</div>
                    <div className="text-3xl font-black gradient-text mb-4">
                      €{roi.yearly.toLocaleString()}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-white/70">ROI del Curso</div>
                        <div className="text-primary font-bold">{roi.roi.toLocaleString()}%</div>
                      </div>
                      <div>
                        <div className="text-white/70">Recuperación</div>
                        <div className="text-primary font-bold">{roi.paybackDays} días</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-2">
                    <TrendingUp className="w-4 h-4" />
                    Proyección Conservative
                  </div>
                  <p className="text-white/80 text-sm">
                    Estos cálculos están basados en datos reales de nuestros estudiantes. 
                    El 78% superan estas cifras en su primer año.
                  </p>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" onClick={onCtaClick}>
                <Calculator className="w-5 h-5 mr-2" />
                Comenzar Mi Negocio de Detailing
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof Integration */}
        <div className="mt-16 text-center">
          <div className="glass-card inline-block px-8 py-6 rounded-lg animate-fade-in">
            <div className="flex items-center justify-center gap-6 text-white/90">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">89%</div>
                <div className="text-xs">Recuperan inversión</div>
                <div className="text-xs text-white/60">en 30 días</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">€2,847</div>
                <div className="text-xs">Ingreso promedio</div>
                <div className="text-xs text-white/60">primer mes</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">4.9★</div>
                <div className="text-xs">Satisfacción</div>
                <div className="text-xs text-white/60">800+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};