import { useState, useEffect } from "react";
import { Users, MapPin, Clock } from "lucide-react";

const notifications = [
  { name: "Carlos M.", location: "Madrid", action: "se inscribió", time: "hace 2 min" },
  { name: "Ana L.", location: "Barcelona", action: "completó el curso", time: "hace 5 min" },
  { name: "Miguel R.", location: "Valencia", action: "se certificó", time: "hace 8 min" },
  { name: "Sofia P.", location: "Sevilla", action: "empezó su negocio", time: "hace 12 min" },
  { name: "David G.", location: "Bilbao", action: "se inscribió", time: "hace 15 min" }
];

export function SocialProofBar() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 300);
    }, 3800);

    return () => clearTimeout(timer);
  }, [currentNotification]);

  const notification = notifications[currentNotification];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className={`glass-card border-primary/30 px-4 py-3 rounded-full transition-all duration-300 ${
        isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 transform translate-y-2'
      }`}>
        <div className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <Users className="w-4 h-4 text-primary" />
          <span className="text-white font-semibold">{notification.name}</span>
          <span className="text-white/80">en</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-white/60" />
            <span className="text-white/80">{notification.location}</span>
          </div>
          <span className="text-white/80">{notification.action}</span>
          <div className="flex items-center gap-1 text-white/60">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{notification.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}