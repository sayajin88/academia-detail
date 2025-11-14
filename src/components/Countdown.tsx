import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate?: Date;
}

export function Countdown({ targetDate = new Date('2026-01-17T10:00:00') }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-1.5 md:gap-4 text-white px-2">
      {timeLeft.days > 0 && (
        <>
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold bg-red-600/20 rounded-lg px-2 py-1 md:px-4 md:py-2 border border-red-500/30">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs mt-1 text-muted-foreground">Días</div>
          </div>
          <div className="text-lg md:text-2xl">:</div>
        </>
      )}
      <div className="text-center">
        <div className="text-xl md:text-3xl font-bold bg-red-600/20 rounded-lg px-2 py-1 md:px-4 md:py-2 border border-red-500/30">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <div className="text-[10px] md:text-xs mt-1 text-muted-foreground">Horas</div>
      </div>
      <div className="text-lg md:text-2xl">:</div>
      <div className="text-center">
        <div className="text-xl md:text-3xl font-bold bg-red-600/20 rounded-lg px-2 py-1 md:px-4 md:py-2 border border-red-500/30">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-[10px] md:text-xs mt-1 text-muted-foreground">Min</div>
      </div>
      <div className="text-lg md:text-2xl">:</div>
      <div className="text-center">
        <div className="text-xl md:text-3xl font-bold bg-red-600/20 rounded-lg px-2 py-1 md:px-4 md:py-2 border border-red-500/30">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className="text-[10px] md:text-xs mt-1 text-muted-foreground">Seg</div>
      </div>
    </div>
  );
}