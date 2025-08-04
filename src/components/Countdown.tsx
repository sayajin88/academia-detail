import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate?: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 5,
    minutes: 44,
    seconds: 24
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft(prev => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (timeLeft.minutes > 0) {
        setTimeLeft(prev => ({ 
          ...prev, 
          minutes: prev.minutes - 1, 
          seconds: 59 
        }));
      } else if (timeLeft.hours > 0) {
        setTimeLeft(prev => ({ 
          ...prev, 
          hours: prev.hours - 1, 
          minutes: 59, 
          seconds: 59 
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex items-center justify-center gap-4 text-white">
      <div className="text-center">
        <div className="text-3xl font-bold bg-red-600/20 rounded-lg px-4 py-2 border border-red-500/30">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <div className="text-xs mt-1 text-muted-foreground">Días</div>
      </div>
      <div className="text-2xl">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold bg-red-600/20 rounded-lg px-4 py-2 border border-red-500/30">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <div className="text-xs mt-1 text-muted-foreground">Horas</div>
      </div>
      <div className="text-2xl">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold bg-red-600/20 rounded-lg px-4 py-2 border border-red-500/30">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-xs mt-1 text-muted-foreground">Minutos</div>
      </div>
      <div className="text-2xl">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold bg-red-600/20 rounded-lg px-4 py-2 border border-red-500/30">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className="text-xs mt-1 text-muted-foreground">Segundos</div>
      </div>
    </div>
  );
}