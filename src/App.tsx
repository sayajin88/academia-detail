import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";

// Lazy-loaded pages — code splitting por ruta
const JornadasIntensivas = lazy(() => import("./pages/JornadasIntensivas"));
const JornadaCero = lazy(() => import("./pages/JornadaCero"));
const UpDetail = lazy(() => import("./pages/UpDetail"));
const FormationDetail = lazy(() => import("./pages/FormationDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const CarreraDetailing = lazy(() => import("./pages/CarreraDetailing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const Glossary = lazy(() => import("./pages/Glossary"));
const CalculadoraDilucion = lazy(() => import("./pages/CalculadoraDilucion"));
const Directory = lazy(() => import("./pages/Directory"));
const DirectoryCity = lazy(() => import("./pages/DirectoryCity"));
const DetailerPage = lazy(() => import("./pages/DetailerPage"));
const DirectoryJoin = lazy(() => import("./pages/DirectoryJoin"));

const queryClient = new QueryClient();

// Fallback mínimo para Suspense — evita CLS
const PageFallback = () => (
  <div className="min-h-screen bg-background" />
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageFallback />}>
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
              <Route path="/glosario-detailing" element={<Glossary />} />
              <Route path="/calculadora-dilucion-detailing" element={<CalculadoraDilucion />} />
              <Route path="/directorio" element={<Directory />} />
              <Route path="/directorio/unete" element={<DirectoryJoin />} />
              <Route path="/directorio/:province/:city" element={<DirectoryCity />} />
              <Route path="/directorio/:slug" element={<DetailerPage />} />
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
