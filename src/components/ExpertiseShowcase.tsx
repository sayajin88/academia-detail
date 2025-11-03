import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Award, Users, TrendingUp, Shield } from "lucide-react";
import portfolioMclaren from "@/assets/portfolio-mclaren.png";
import portfolioMercedes from "@/assets/portfolio-mercedes.png";
import portfolioBmw from "@/assets/portfolio-bmw.png";
import portfolioFerrari from "@/assets/portfolio-ferrari.png";
import portfolioPorsche from "@/assets/portfolio-porsche.png";
import portfolioAudi from "@/assets/portfolio-audi.png";
import portfolioAlfaRomeo from "@/assets/portfolio-alfa-romeo.png";
import portfolioAudiYellow from "@/assets/portfolio-audi-yellow.png";
import portfolioAudiR8 from "@/assets/portfolio-audi-r8.png";
import portfolioAudiRed from "@/assets/portfolio-audi-red.png";
import portfolioAudiR8Yellow from "@/assets/portfolio-audi-r8-yellow.png";
import portfolioAudiRs7 from "@/assets/portfolio-audi-rs7.png";
import portfolioAudiRs3 from "@/assets/portfolio-audi-rs3.png";
import portfolioAudiS6 from "@/assets/portfolio-audi-s6.png";
import portfolioBmwM2 from "@/assets/portfolio-bmw-m2.png";
import portfolioCorvette from "@/assets/portfolio-corvette.png";
import portfolioFerrari458 from "@/assets/portfolio-ferrari-458.png";
import portfolioFerrariF430 from "@/assets/portfolio-ferrari-f430.png";
import portfolioFerrariGtc4 from "@/assets/portfolio-ferrari-gtc4.png";
import portfolioToyotaSupra from "@/assets/portfolio-toyota-supra.png";
import portfolioRangeRoverVelar from "@/assets/portfolio-range-rover-velar.png";
import portfolioMclaren720sOrange from "@/assets/portfolio-mclaren-720s-orange.png";
import portfolioLotusEvora from "@/assets/portfolio-lotus-evora.png";
import portfolioPorscheCayenne from "@/assets/portfolio-porsche-cayenne.png";
import portfolioLamborghiniUrus from "@/assets/portfolio-lamborghini-urus.png";
import portfolioJaguarFType from "@/assets/portfolio-jaguar-f-type.png";
import portfolioLamborghiniHuracan from "@/assets/portfolio-lamborghini-huracan.png";
import portfolioHondaNsx from "@/assets/portfolio-honda-nsx.png";
import portfolioBentleyContinental from "@/assets/portfolio-bentley-continental.png";

const portfolioImages = [
  { src: portfolioMclaren, alt: "McLaren 720S Detailing Profesional" },
  { src: portfolioMercedes, alt: "Mercedes-AMG C63 Detailing" },
  { src: portfolioBmw, alt: "BMW X5 Detailing Premium" },
  { src: portfolioFerrari, alt: "Ferrari 488 Detailing de Alto Nivel" },
  { src: portfolioPorsche, alt: "Porsche 911 Turbo S Detailing" },
  { src: portfolioAudi, alt: "Audi Q4 e-tron Detailing" },
  { src: portfolioAlfaRomeo, alt: "Alfa Romeo Giulia QV Detailing" },
  { src: portfolioAudiYellow, alt: "Audi S1 Detailing" },
  { src: portfolioAudiR8, alt: "Audi R8 V10 Detailing" },
  { src: portfolioAudiRed, alt: "Audi R8 Detailing Exclusivo" },
  { src: portfolioAudiR8Yellow, alt: "Audi R8 Yellow Detailing" },
  { src: portfolioAudiRs7, alt: "Audi RS7 Sportback Detailing" },
  { src: portfolioAudiRs3, alt: "Audi RS3 Sportback Detailing" },
  { src: portfolioAudiS6, alt: "Audi S6 Sedan Detailing" },
  { src: portfolioBmwM2, alt: "BMW M2 Competition Detailing" },
  { src: portfolioCorvette, alt: "Chevrolet Corvette C7 Detailing" },
  { src: portfolioFerrari458, alt: "Ferrari 458 Italia Detailing" },
  { src: portfolioFerrariF430, alt: "Ferrari F430 Detailing" },
  { src: portfolioFerrariGtc4, alt: "Ferrari GTC4Lusso Detailing" },
  { src: portfolioToyotaSupra, alt: "Toyota Supra Detailing" },
  { src: portfolioRangeRoverVelar, alt: "Range Rover Velar Detailing" },
  { src: portfolioMclaren720sOrange, alt: "McLaren 720S Orange Detailing" },
  { src: portfolioLotusEvora, alt: "Lotus Evora Detailing" },
  { src: portfolioPorscheCayenne, alt: "Porsche Cayenne Detailing" },
  { src: portfolioLamborghiniUrus, alt: "Lamborghini Urus Detailing" },
  { src: portfolioJaguarFType, alt: "Jaguar F-Type Detailing" },
  { src: portfolioLamborghiniHuracan, alt: "Lamborghini Huracán Detailing" },
  { src: portfolioHondaNsx, alt: "Honda NSX Detailing" },
  { src: portfolioBentleyContinental, alt: "Bentley Continental GT Detailing" },
];

const stats = [
  {
    icon: Users,
    value: "10+",
    label: "Años de Experiencia",
    color: "text-blue-400",
  },
  {
    icon: Award,
    value: "500+",
    label: "Clientes Satisfechos",
    color: "text-yellow-400",
  },
  {
    icon: TrendingUp,
    value: "100%",
    label: "Centro Activo",
    color: "text-green-400",
  },
  {
    icon: Shield,
    value: "Único",
    label: "En el Sector",
    color: "text-purple-400",
  },
];

export function ExpertiseShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">
            Experiencia Real
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="gradient-text">El Único Centro Activo</span>
            <br />
            Que Vive del Detailing
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            No somos solo formadores, <span className="text-primary font-bold">somos detailers profesionales en activo</span>. 
            Durante más de <span className="text-primary font-bold">10 años</span>, hemos trabajado con 
            cientos de vehículos de alta gama, desde McLaren y Ferrari hasta Porsche y Mercedes-AMG. 
            Esta experiencia real en el día a día del detailing es lo que nos diferencia: 
            <span className="text-white font-semibold"> enseñamos lo que hacemos cada día</span>, 
            no teoría de manual.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6 text-center">
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Portfolio Carousel */}
        <div className="relative">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Nuestros Trabajos Reales
          </h3>
          
          {/* Desktop Carousel */}
          <div className="hidden md:block">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {portfolioImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="glass-card border-white/10 overflow-hidden hover-scale">
                        <CardContent className="p-0">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-64 object-cover"
                            loading="lazy"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="glass-card border-primary/40 text-white hover:bg-primary/20" />
              <CarouselNext className="glass-card border-primary/40 text-white hover:bg-primary/20" />
            </Carousel>
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {portfolioImages.map((image, index) => (
              <Card key={index} className="glass-card border-white/10 overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-lg text-white/90 leading-relaxed">
            Cada día trabajamos con vehículos de lujo y alto rendimiento. 
            <span className="text-primary font-bold"> Esta experiencia directa</span> es la que 
            compartimos en nuestra formación, avalada por <span className="text-primary font-bold">cientos de clientes 
            satisfechos</span> que confían en nosotros para el cuidado de sus vehículos más preciados.
          </p>
        </div>
      </div>
    </section>
  );
}
