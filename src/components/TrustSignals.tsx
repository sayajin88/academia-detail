import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock, Star, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function TrustSignals() {
  const [completedRegistrations, setCompletedRegistrations] = useState(0);

  useEffect(() => {
    const fetchCompletedRegistrations = async () => {
      const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'completed');
      
      if (!error && count !== null) {
        setCompletedRegistrations(count);
      }
    };

    fetchCompletedRegistrations();
    const interval = setInterval(fetchCompletedRegistrations, 60000);
    return () => clearInterval(interval);
  }, []);

  const trustMetrics = [
    { 
      icon: Users, 
      number: `${completedRegistrations}+`, 
      label: "Alumnos Inscritos",
      color: "text-blue-400"
    },
    { 
      icon: Star, 
      number: "4.9", 
      label: "Puntuación Media",
      color: "text-yellow-400"
    },
    { 
      icon: Award, 
      number: "5+", 
      label: "Años de Experiencia",
      color: "text-green-400"
    },
    { 
      icon: Clock, 
      number: "1", 
      label: "Día de Formación",
      color: "text-purple-400"
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: "Garantía de 30 días",
      description: "Reembolso completo si no cumple expectativas tras asistir"
    },
    {
      icon: CheckCircle,
      title: "Certificación profesional",
      description: "Certificado oficial al completar la formación"
    },
    {
      icon: Users,
      title: "Soporte personalizado",
      description: "Acceso directo a instructores con +10 años de experiencia"
    }
  ];

  return (
    <section className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="glass-card border-white/10 text-center hover-glow">
                <CardContent className="p-6">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                  <div className="text-3xl font-black gradient-text mb-1">{metric.number}</div>
                  <div className="text-white/80 text-sm">{metric.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <Card key={index} className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{guarantee.title}</h3>
                  <p className="text-white/80 text-sm">{guarantee.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Data transparency note */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-xs">
            * Datos actualizados en tiempo real - Noviembre 2025
          </p>
        </div>
      </div>
    </section>
  );
}