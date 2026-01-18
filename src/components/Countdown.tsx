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

  // Show days only if > 0 and on larger screens when > 7 days
  const showDays = timeLeft.days > 0;
  const showDaysLabel = timeLeft.days >= 7;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-3 text-white">
      {showDays && (
        <>
          <div className="text-center">
            <div className="text-base sm:text-xl md:text-3xl font-bold bg-red-600/20 rounded-md sm:rounded-lg px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 border border-red-500/30 min-w-[32px] sm:min-w-[40px] md:min-w-[56px]">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className={`text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 text-muted-foreground ${showDaysLabel ? '' : 'hidden sm:block'}`}>
              {showDaysLabel ? 'Días' : 'D'}
            </div>
          </div>
          <div className="text-sm sm:text-lg md:text-2xl opacity-60">:</div>
        </>
      )}
      <div className="text-center">
        <div className="text-base sm:text-xl md:text-3xl font-bold bg-red-600/20 rounded-md sm:rounded-lg px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 border border-red-500/30 min-w-[32px] sm:min-w-[40px] md:min-w-[56px]">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <div className="text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 text-muted-foreground">
          <span className="sm:hidden">H</span>
          <span className="hidden sm:inline">Horas</span>
        </div>
      </div>
      <div className="text-sm sm:text-lg md:text-2xl opacity-60">:</div>
      <div className="text-center">
        <div className="text-base sm:text-xl md:text-3xl font-bold bg-red-600/20 rounded-md sm:rounded-lg px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 border border-red-500/30 min-w-[32px] sm:min-w-[40px] md:min-w-[56px]">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 text-muted-foreground">
          <span className="sm:hidden">M</span>
          <span className="hidden sm:inline">Min</span>
        </div>
      </div>
      <div className="text-sm sm:text-lg md:text-2xl opacity-60">:</div>
      <div className="text-center">
        <div className="text-base sm:text-xl md:text-3xl font-bold bg-red-600/20 rounded-md sm:rounded-lg px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 border border-red-500/30 min-w-[32px] sm:min-w-[40px] md:min-w-[56px]">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className="text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 text-muted-foreground">
          <span className="sm:hidden">S</span>
          <span className="hidden sm:inline">Seg</span>
        </div>
      </div>
    </div>
  );
}