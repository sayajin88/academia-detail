import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import JornadasIntensivas from "./pages/JornadasIntensivas";
import JornadaCero from "./pages/JornadaCero";
import UpDetail from "./pages/UpDetail";
import FormationDetail from "./pages/FormationDetail";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import CarreraDetailing from "./pages/CarreraDetailing";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";

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
            <Route path="/curso-detailing-iniciacion" element={<JornadasIntensivas />} />
            <Route path="/jornada-zero-detailing" element={<JornadaCero />} />
            <Route path="/up-detail-evento" element={<UpDetail />} />
            <Route path="/formacion-profesional-detailing" element={<CarreraDetailing />} />
            <Route path="/curso-detailing-profesional" element={<FormationDetail />} />
            <Route path="/curso-vinilado-vehiculos" element={<FormationDetail />} />
            <Route path="/curso-ppf-proteccion-pintura" element={<FormationDetail />} />
            <Route path="/curso-restauracion-vehiculos" element={<FormationDetail />} />
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* Legal Pages */}
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            
            {/* Redirects for legal pages */}
            <Route path="/privacidad" element={<Navigate to="/politica-privacidad" replace />} />
            <Route path="/terminos" element={<Navigate to="/politica-privacidad" replace />} />
            <Route path="/cookies" element={<Navigate to="/politica-privacidad" replace />} />
            <Route path="/aviso-legal" element={<Navigate to="/politica-privacidad" replace />} />
            
            {/* 301 Redirects - Old URLs to new SEO-optimized URLs */}
            <Route path="/jornada-cero" element={<Navigate to="/curso-detailing-iniciacion" replace />} />
            <Route path="/carrera-detailing" element={<Navigate to="/formacion-profesional-detailing" replace />} />
            <Route path="/formacion/detailing" element={<Navigate to="/curso-detailing-profesional" replace />} />
            <Route path="/formacion/wrapping" element={<Navigate to="/curso-vinilado-vehiculos" replace />} />
            <Route path="/formacion/ppf" element={<Navigate to="/curso-ppf-proteccion-pintura" replace />} />
            <Route path="/formacion/restauracion" element={<Navigate to="/curso-restauracion-vehiculos" replace />} />
            <Route path="/galeria" element={<Navigate to="/quienes-somos" replace />} />
            <Route path="/galeria-detailing" element={<Navigate to="/quienes-somos" replace />} />
            
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
