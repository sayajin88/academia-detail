import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function SocialProofBar() {
  const [registeredCount, setRegisteredCount] = useState(0);

  useEffect(() => {
    const fetchRegisteredCount = async () => {
      const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'completed');
      
      if (!error && count !== null) {
        setRegisteredCount(count);
      }
    };

    fetchRegisteredCount();
    const interval = setInterval(fetchRegisteredCount, 60000);
    return () => clearInterval(interval);
  }, []);

  if (registeredCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="glass-card border-primary/30 px-6 py-3 rounded-full animate-fade-in">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <Users className="w-4 h-4 text-brand" />
          <span className="text-white font-semibold">{registeredCount}</span>
          <span className="text-white/80">personas ya han reservado su plaza</span>
        </div>
      </div>
    </div>
  );
}