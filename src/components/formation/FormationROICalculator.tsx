import { useState } from 'react';
import { Calculator, TrendingUp, Clock, Banknote, Target, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { FormationDetail } from '@/data/formationDetails';

interface FormationROICalculatorProps {
  formation: FormationDetail;
  onCTAClick?: () => void;
}

export function FormationROICalculator({ formation, onCTAClick }: FormationROICalculatorProps) {
  const [servicesPerMonth, setServicesPerMonth] = useState(12);
  const [pricePerService, setPricePerService] = useState(250);
  
  const coursePrice = formation.price;
  const monthlyRevenue = servicesPerMonth * pricePerService;
  const yearlyRevenue = monthlyRevenue * 12;
  
  // Calculate payback
  const jobsToPayback = Math.ceil(coursePrice / pricePerService);
  const daysToPayback = Math.ceil(jobsToPayback / (servicesPerMonth / 30));
  const weeksToPayback = Math.ceil(daysToPayback / 7);
  const monthsToPayback = (coursePrice / monthlyRevenue);
  
  // ROI calculation
  const yearlyProfit = yearlyRevenue - coursePrice;
  const roi = Math.round((yearlyProfit / coursePrice) * 100);

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Calculadora de Rentabilidad</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿En Cuántos Trabajos{' '}
            <span className="gradient-text">Amortizas el Curso?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre cuánto tiempo te llevará recuperar la inversión y el potencial de ingresos que puedes generar con las habilidades que aprenderás.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sliders Card */}
            <AnimatedSection delay={100}>
              <Card className="bg-card/80 backdrop-blur-sm border-white/10 h-full">
                <CardContent className="p-6 space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-primary" />
                        Precio por Servicio
                      </label>
                      <span className="text-2xl font-bold text-primary">€{pricePerService}</span>
                    </div>
                    <Slider
                      value={[pricePerService]}
                      onValueChange={(value) => setPricePerService(value[0])}
                      min={100}
                      max={500}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>€100</span>
                      <span>€500</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        Servicios al Mes
                      </label>
                      <span className="text-2xl font-bold text-primary">{servicesPerMonth}</span>
                    </div>
                    <Slider
                      value={[servicesPerMonth]}
                      onValueChange={(value) => setServicesPerMonth(value[0])}
                      min={4}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>4 servicios</span>
                      <span>30 servicios</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-muted-foreground text-center">
                      Inversión del curso: <span className="font-bold text-foreground">€{coursePrice.toLocaleString()}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Results Card */}
            <AnimatedSection delay={200}>
              <Card className="bg-gradient-to-br from-primary/10 via-card to-primary-glow/10 border-primary/20 h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer" />
                
                <CardContent className="p-6 relative z-10">
                  {/* Main Result */}
                  <div className="text-center mb-6 pb-6 border-b border-white/10">
                    <p className="text-sm text-muted-foreground mb-2">Amortización en</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <span className="text-5xl font-extrabold gradient-text">{jobsToPayback}</span>
                        <p className="text-sm text-muted-foreground">trabajos</p>
                      </div>
                      <span className="text-2xl text-muted-foreground">=</span>
                      <div className="text-center">
                        <span className="text-5xl font-extrabold gradient-text">
                          {weeksToPayback < 5 ? weeksToPayback : monthsToPayback.toFixed(1)}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {weeksToPayback < 5 ? 'semanas' : 'meses'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-background/50 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Mensual</span>
                      </div>
                      <p className="text-xl font-bold text-green-500">€{monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Anual</span>
                      </div>
                      <p className="text-xl font-bold text-green-500">€{yearlyRevenue.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 text-center mb-6 border border-green-500/30">
                    <p className="text-sm text-green-400 mb-1">ROI Primer Año</p>
                    <p className="text-4xl font-extrabold text-green-400">+{roi}%</p>
                    <p className="text-xs text-green-400/70 mt-1">
                      Beneficio neto: €{yearlyProfit.toLocaleString()}
                    </p>
                  </div>

                  {onCTAClick && (
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full ripple-button group"
                      onClick={onCTAClick}
                    >
                      <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Empezar a Rentabilizar
                    </Button>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Bottom Note */}
          <AnimatedSection delay={300} className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                Con solo <strong className="text-foreground">{Math.ceil(servicesPerMonth / 4)} servicios por semana</strong> a <strong className="text-foreground">€{pricePerService}</strong>, 
                recuperas tu inversión en <strong className="text-primary">{weeksToPayback} semanas</strong>
              </span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
