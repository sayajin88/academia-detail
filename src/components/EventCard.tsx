import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface EventCardProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export function EventCard({ title, price, duration, features, isPopular, ctaText }: EventCardProps) {
  return (
    <Card className={`glass-card border-2 ${isPopular ? 'border-primary shadow-glow' : 'border-white/10'} hover:border-primary/50 transition-all duration-300 relative`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-primary text-white px-4 py-1 font-semibold">
            MÁS POPULAR
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">{duration}</div>
        <div className="text-4xl font-bold gradient-text mt-4">{price}</div>
        <div className="text-sm text-muted-foreground">+ IVA</div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-white/90 text-sm">{feature}</span>
          </div>
        ))}
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={isPopular ? "hero" : "cta"} 
          size="lg" 
          className="w-full"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
