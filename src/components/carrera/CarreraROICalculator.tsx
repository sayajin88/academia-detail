import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Clock, Euro, ArrowRight } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface CarreraROICalculatorProps {
  onCtaClick?: () => void;
}

const CarreraROICalculator = ({ onCtaClick }: CarreraROICalculatorProps) => {
  const [servicesPerMonth, setServicesPerMonth] = useState(20);
  const [pricePerService, setPricePerService] = useState(150);
  
  const coursePrice = carreraDetailingData.price;
  const monthlyRevenue = servicesPerMonth * pricePerService;
  const yearlyRevenue = monthlyRevenue * 12;
  
  // Calculate payback period
  const monthsToPayback = coursePrice / monthlyRevenue;
  const weeksToPayback = Math.ceil(monthsToPayback * 4);
  const daysToPayback = Math.ceil(monthsToPayback * 30);
  
  // ROI calculation
  const yearlyProfit = yearlyRevenue - coursePrice;
  const roi = Math.round((yearlyProfit / coursePrice) * 100);

  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Calculator className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">
              Calculadora de Inversión
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-monument mb-4">
            <span className="text-foreground">¿EN CUÁNTO TIEMPO </span>
            <span className="gold-gradient-text">RECUPERAS TU INVERSIÓN?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calcula cuánto tardarás en amortizar los €{coursePrice.toLocaleString()} y empezar a generar beneficios
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card border-2 border-gold/20 overflow-hidden relative">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/10 to-transparent" />
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left - Sliders */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-foreground font-medium">
                      Servicios al mes
                    </label>
                    <span className="text-2xl font-monument gold-gradient-text">
                      {servicesPerMonth}
                    </span>
                  </div>
                  <Slider
                    value={[servicesPerMonth]}
                    onValueChange={(value) => setServicesPerMonth(value[0])}
                    min={5}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Con {servicesPerMonth} servicios/mes (≈ {Math.round(servicesPerMonth / 4)} por semana)
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-foreground font-medium">
                      Precio promedio por servicio
                    </label>
                    <span className="text-2xl font-monument gold-gradient-text">
                      €{pricePerService}
                    </span>
                  </div>
                  <Slider
                    value={[pricePerService]}
                    onValueChange={(value) => setPricePerService(value[0])}
                    min={50}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Desde lavados (€50) hasta PPF completos (€500+)
                  </p>
                </div>
              </div>

              {/* Right - Results */}
              <div className="space-y-6">
                {/* Payback highlight */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-gold" />
                    <span className="text-foreground font-medium">Amortización en:</span>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-monument gold-gradient-text mb-2">
                      {monthsToPayback < 1 
                        ? `${daysToPayback} días` 
                        : monthsToPayback < 2 
                          ? `${weeksToPayback} semanas`
                          : `${monthsToPayback.toFixed(1)} meses`
                      }
                    </p>
                    <p className="text-muted-foreground">
                      para recuperar los €{coursePrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Euro className="w-4 h-4 text-gold" />
                      <span className="text-sm text-muted-foreground">Ingresos/mes</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      €{monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-gold" />
                      <span className="text-sm text-muted-foreground">Ingresos/año</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      €{yearlyRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* ROI */}
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">ROI primer año:</span>
                    <span className="text-3xl font-monument text-green-500">
                      {roi > 0 ? `+${roi}%` : `${roi}%`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom message */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Con solo <strong className="text-gold">{servicesPerMonth} servicios a €{pricePerService}/mes</strong>, 
                  recuperas la inversión en <strong className="text-gold">
                    {monthsToPayback < 2 ? `${weeksToPayback} semanas` : `${monthsToPayback.toFixed(1)} meses`}
                  </strong>
                </p>
                
                {onCtaClick && (
                  <Button 
                    onClick={onCtaClick}
                    className="h-14 px-8 text-lg bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground hover:shadow-gold-glow transition-all duration-300 font-bold"
                  >
                    Quiero Empezar Ya <ArrowRight className="ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CarreraROICalculator;
