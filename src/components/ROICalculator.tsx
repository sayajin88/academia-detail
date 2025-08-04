import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Calculator, Euro } from "lucide-react";

export function ROICalculator() {
  const [servicesPerMonth, setServicesPerMonth] = useState([10]);
  const [pricePerService, setPricePerService] = useState([50]);
  
  const monthlyRevenue = servicesPerMonth[0] * pricePerService[0];
  const yearlyRevenue = monthlyRevenue * 12;
  const courseInvestment = 297;
  const roi = ((yearlyRevenue - courseInvestment) / courseInvestment * 100).toFixed(0);
  const paybackDays = Math.ceil((courseInvestment / monthlyRevenue) * 30);

  return (
    <Card className="glass-intense border-primary/30 hover-glow">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-white">
          <Calculator className="w-6 h-6 text-primary" />
          Calculadora de ROI
        </CardTitle>
        <p className="text-white/80 text-sm">Calcula cuánto ganarás con tu formación</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <label className="text-white text-sm font-semibold mb-2 block">
            Servicios por mes: {servicesPerMonth[0]}
          </label>
          <Slider
            value={servicesPerMonth}
            onValueChange={setServicesPerMonth}
            max={50}
            min={5}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-white text-sm font-semibold mb-2 block">
            Precio por servicio: €{pricePerService[0]}
          </label>
          <Slider
            value={pricePerService}
            onValueChange={setPricePerService}
            max={200}
            min={30}
            step={5}
            className="w-full"
          />
        </div>

        <div className="bg-gradient-primary/20 rounded-xl p-4 border border-primary/30">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold gradient-text">€{monthlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-white/70">Ingresos mensuales</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">€{yearlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-white/70">Ingresos anuales</div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-white font-semibold">ROI: {roi}%</span>
          </div>
          <div className="text-sm text-white/80">
            Recuperas la inversión en <strong>{paybackDays} días</strong>
          </div>
        </div>

        <Button variant="hero" className="w-full">
          <Euro className="w-4 h-4 mr-2" />
          EMPEZAR A GANAR AHORA
        </Button>
      </CardContent>
    </Card>
  );
}