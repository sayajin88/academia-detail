import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import JornadaCero from "./pages/JornadaCero";
import FormationDetail from "./pages/FormationDetail";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import CarreraDetailing from "./pages/CarreraDetailing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main Routes - New SEO-optimized slugs */}
            <Route path="/" element={<Home />} />
            <Route path="/curso-detailing-iniciacion" element={<JornadaCero />} />
            <Route path="/formacion-profesional-detailing" element={<CarreraDetailing />} />
            <Route path="/curso-detailing-profesional" element={<FormationDetail />} />
            <Route path="/curso-vinilado-vehiculos" element={<FormationDetail />} />
            <Route path="/curso-ppf-proteccion-pintura" element={<FormationDetail />} />
            <Route path="/curso-restauracion-vehiculos" element={<FormationDetail />} />
            <Route path="/galeria-detailing" element={<Gallery />} />
            <Route path="/contacto" element={<Contact />} />
            
            {/* 301 Redirects - Old URLs to new SEO-optimized URLs */}
            <Route path="/jornada-cero" element={<Navigate to="/curso-detailing-iniciacion" replace />} />
            <Route path="/carrera-detailing" element={<Navigate to="/formacion-profesional-detailing" replace />} />
            <Route path="/formacion/detailing" element={<Navigate to="/curso-detailing-profesional" replace />} />
            <Route path="/formacion/wrapping" element={<Navigate to="/curso-vinilado-vehiculos" replace />} />
            <Route path="/formacion/ppf" element={<Navigate to="/curso-ppf-proteccion-pintura" replace />} />
            <Route path="/formacion/restauracion" element={<Navigate to="/curso-restauracion-vehiculos" replace />} />
            <Route path="/galeria" element={<Navigate to="/galeria-detailing" replace />} />
            
            {/* Catch-all for old /formacion/:slug pattern */}
            <Route path="/formacion/:slug" element={<FormationDetail />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
