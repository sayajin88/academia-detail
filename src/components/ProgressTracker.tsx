import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Award, Star, Trophy } from "lucide-react";

const steps = [
  { id: 1, title: "Información vista", icon: CheckCircle, threshold: 20 },
  { id: 2, title: "Problemas identificados", icon: Star, threshold: 40 },
  { id: 3, title: "Solución comprendida", icon: Award, threshold: 60 },
  { id: 4, title: "Beneficios evaluados", icon: Trophy, threshold: 80 }
];

export function ProgressTracker() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Calculate completed steps based on scroll progress
      const completed = steps.filter(step => progress >= step.threshold).length;
      setCompletedSteps(completed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-40 animate-slide-in-right">
      <Card className="glass-card border-primary/30 w-64">
        <CardContent className="p-4">
          <h3 className="text-white font-semibold mb-3 text-sm">Tu progreso hacia la decisión</h3>
          
          <Progress value={scrollProgress} className="mb-4" />
          
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isCompleted = scrollProgress >= step.threshold;
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted 
                      ? 'bg-primary shadow-glow animate-pulse' 
                      : 'bg-white/10 border border-white/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-white/50'}`} />
                  </div>
                  <span className={`text-sm transition-colors duration-500 ${
                    isCompleted ? 'text-white font-semibold' : 'text-white/60'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {completedSteps === steps.length && (
            <div className="mt-4 p-3 bg-gradient-primary/20 rounded-lg border border-primary/30 animate-bounce-in">
              <p className="text-white text-xs text-center font-semibold">
                🎉 ¡Listo para el siguiente paso!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}