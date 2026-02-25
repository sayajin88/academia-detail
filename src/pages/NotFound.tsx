import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import detailParkLogo from "@/assets/detail-park-logo-white.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <Helmet>
        <title>Página no encontrada | Academia Detail</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        {/* Logo */}
        <img 
          src={detailParkLogo} 
          alt="Detail Park Academy" 
          className="h-12 md:h-14 mx-auto mb-8 opacity-80"
        />
        
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-black text-primary mb-4 leading-none">
          404
        </h1>
        
        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Página no encontrada
        </h2>
        
        <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/contacto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Contactar
            </Link>
          </Button>
        </div>
        
        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">¿Buscas formación en detailing?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/curso-detailing-iniciacion" className="text-primary hover:underline">
              Jornada Zero
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/curso-detailing-profesional" className="text-primary hover:underline">
              Cursos Detailing
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/formacion-profesional-detailing" className="text-primary hover:underline">
              Carrera Completa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
