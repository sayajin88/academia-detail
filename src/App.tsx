import { lazy, Suspense } from "react";
import type { ComponentType } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import { CookieBanner } from "./components/shared/CookieBanner";

// Avisos emergentes: se cargan aparte para no pesar en la primera carga.
// Sonner lo usan los formularios públicos; el Toaster de Radix, solo el panel de admin.
const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));
const AdminToaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));

function Toasts() {
  const { pathname } = useLocation();
  return (
    <Suspense fallback={null}>
      <Sonner />
      {pathname.startsWith("/admin") && <AdminToaster />}
    </Suspense>
  );
}

// Lazy-loaded pages — code splitting por ruta
const JornadasIntensivas = lazy(() => import("./pages/JornadasIntensivas"));
const JornadaCero = lazy(() => import("./pages/JornadaCero"));
const UpDetail = lazy(() => import("./pages/UpDetail"));
const FormationDetail = lazy(() => import("./pages/FormationDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const CarreraDetailing = lazy(() => import("./pages/CarreraDetailing"));
const Blog = withQuery(() => import("./pages/Blog"));
const BlogPostPage = withQuery(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GlossaryTermPage = lazy(() => import("./pages/GlossaryTerm"));
const CalculadoraDilucion = lazy(() => import("./pages/CalculadoraDilucion"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

const AdminProfiles = lazy(() => import("./pages/AdminProfiles"));
const AdminContacts = withQuery(() => import("./pages/AdminContacts"));
const AdminBlog = withQuery(() => import("./pages/AdminBlog"));
const Gracias = lazy(() => import("./pages/Gracias"));
const MapaSitio = lazy(() => import("./pages/MapaSitio"));
const CursoDetailingCiudad = lazy(() => import("./pages/CursoDetailingCiudad"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const MarketingDigital = lazy(() => import("./pages/MarketingDigital"));

// Páginas que usan React Query: se envuelven con su proveedor al cargarse.
function withQuery(load: () => Promise<{ default: ComponentType }>) {
  return lazy(() =>
    Promise.all([load(), import("@/lib/query")]).then(([page, q]) => {
      const Page = page.default;
      return {
        default: () => (
          <q.QueryProvider>
            <Page />
          </q.QueryProvider>
        ),
      };
    })
  );
}

// Branded loading fallback for Suspense — shows spinner instead of blank screen
const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground">Cargando…</span>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
        <BrowserRouter>
          <Toasts />
          <CookieBanner />
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
              <Route path="/marketing-digital-detailing" element={<MarketingDigital />} />
              <Route path="/glosario-detailing" element={<Glossary />} />
              <Route path="/glosario-detailing/:slug" element={<GlossaryTermPage />} />
              <Route path="/calculadora-dilucion-detailing" element={<CalculadoraDilucion />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* City Landing Pages */}
              <Route path="/curso-detailing-madrid" element={<CursoDetailingCiudad />} />
              <Route path="/curso-detailing-barcelona" element={<CursoDetailingCiudad />} />
              <Route path="/curso-detailing-valencia" element={<CursoDetailingCiudad />} />
              <Route path="/curso-detailing-sevilla" element={<CursoDetailingCiudad />} />
              <Route path="/curso-detailing-bilbao" element={<CursoDetailingCiudad />} />
              <Route path="/curso-detailing-:ciudad" element={<CursoDetailingCiudad />} />

              {/* Payment result pages */}

              {/* Conversion & Utility Pages */}
              <Route path="/gracias" element={<Gracias />} />
              <Route path="/mapa-del-sitio" element={<MapaSitio />} />

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
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/applications" element={<Navigate to="/admin/profiles" replace />} />
              <Route path="/admin/profiles" element={<AdminProfiles />} />
              <Route path="/admin/contacts" element={<AdminContacts />} />
              <Route path="/admin/blog" element={<AdminBlog />} />

              {/* Unsubscribe */}
              <Route path="/unsubscribe" element={<Unsubscribe />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
  </HelmetProvider>
);

export default App;
