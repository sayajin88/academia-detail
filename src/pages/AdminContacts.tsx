import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Search, Mail, Phone, ExternalLink, MessageCircle,
  GraduationCap, Wrench, Shield, Paintbrush, Car,
} from "lucide-react";

// --- Label maps (same as edge function) ---
const formacionLabels: Record<string, string> = {
  detailing: "Detailing Profesional",
  wrapping: "Car Wrapping",
  ppf: "PPF – Protección de Pintura",
  restauracion: "Restauración de Vehículos",
  carrera: "Carrera Profesional Completa",
};

const experienciaLabels: Record<string, string> = {
  sin_experiencia: "No, soy nuevo en el sector",
  basico: "Nivel básico (lavado, limpieza interior)",
  intermedio: "Nivel intermedio (pulido, corrección)",
  avanzado: "Nivel avanzado (PPF, wrapping, cerámicos)",
};

const inversionLabels: Record<string, string> = {
  menos_500: "Menos de 500 €",
  "500_1000": "500 € – 1.000 €",
  "1000_2000": "1.000 € – 2.000 €",
  "2000_5000": "2.000 € – 5.000 €",
  mas_5000: "Más de 5.000 €",
};

const centroLabels: Record<string, string> = {
  si_tengo: "Sí, ya tengo un centro / taller",
  quiero_montar: "Quiero montar uno",
  no_interesa: "No, busco trabajar para otros",
  movil: "Servicio móvil / a domicilio",
};

const formacionColors: Record<string, string> = {
  detailing: "bg-blue-100 text-blue-800",
  wrapping: "bg-purple-100 text-purple-800",
  ppf: "bg-green-100 text-green-800",
  restauracion: "bg-amber-100 text-amber-800",
  carrera: "bg-rose-100 text-rose-800",
};

const formacionIcons: Record<string, React.ReactNode> = {
  detailing: <Wrench className="h-4 w-4" />,
  wrapping: <Paintbrush className="h-4 w-4" />,
  ppf: <Shield className="h-4 w-4" />,
  restauracion: <Car className="h-4 w-4" />,
  carrera: <GraduationCap className="h-4 w-4" />,
};

type ContactSubmission = {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  tipo_formacion: string;
  experiencia: string;
  centro_propio: string;
  inversion: string;
  mensaje: string | null;
  created_at: string;
};

const TABS = [
  { key: "all", label: "Todos" },
  { key: "detailing", label: "Detailing" },
  { key: "wrapping", label: "Wrapping" },
  { key: "ppf", label: "PPF" },
  { key: "restauracion", label: "Restauración" },
  { key: "carrera", label: "Carrera" },
];

const AdminContacts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ContactSubmission[];
    },
  });

  const counts = TABS.reduce((acc, tab) => {
    acc[tab.key] = tab.key === "all"
      ? contacts.length
      : contacts.filter((c) => c.tipo_formacion === tab.key).length;
    return acc;
  }, {} as Record<string, number>);

  const filtered = contacts.filter((c) => {
    const matchTab = activeTab === "all" || c.tipo_formacion === activeTab;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.nombre.toLowerCase().includes(q) ||
      c.apellidos.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.telefono.includes(q);
    return matchTab && matchSearch;
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Contactos / Leads</h1>
          <p className="text-muted-foreground text-sm">
            Solicitudes de información de alumnos interesados en los cursos
          </p>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {TABS.map((tab) => (
            <Card
              key={tab.key}
              className={`cursor-pointer transition-all ${activeTab === tab.key ? "ring-2 ring-primary" : "hover:shadow-md"}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold">{counts[tab.key] ?? 0}</p>
                <p className="text-xs text-muted-foreground">{tab.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email o teléfono..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No hay contactos para mostrar
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden lg:table-cell">Teléfono</TableHead>
                    <TableHead>Formación</TableHead>
                    <TableHead className="hidden lg:table-cell">Experiencia</TableHead>
                    <TableHead className="hidden md:table-cell">Inversión</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow
                      key={c.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(c)}
                    >
                      <TableCell className="font-medium">
                        {c.nombre} {c.apellidos}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{c.email}</TableCell>
                      <TableCell className="hidden lg:table-cell">{c.telefono}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${formacionColors[c.tipo_formacion] || "bg-muted text-foreground"}`}>
                          {formacionIcons[c.tipo_formacion]}
                          {formacionLabels[c.tipo_formacion] || c.tipo_formacion}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {experienciaLabels[c.experiencia] || c.experiencia}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {inversionLabels[c.inversion] || c.inversion}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(c.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-lg">
            {selected && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {selected.nombre} {selected.apellidos}
                  </DialogTitle>
                  <DialogDescription>
                    Recibido el {formatDate(selected.created_at)}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                  {/* Contact info */}
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${selected.email}`}>
                        <Mail className="h-4 w-4 mr-1" /> {selected.email}
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${selected.telefono}`}>
                        <Phone className="h-4 w-4 mr-1" /> {selected.telefono}
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={`https://wa.me/${selected.telefono.replace(/\s+/g, "").replace(/^\+/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" /> WhatsApp
                      </a>
                    </Button>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 bg-muted/50 rounded-lg p-4">
                    <div>
                      <p className="text-muted-foreground text-xs">Formación</p>
                      <p className="font-medium">
                        {formacionLabels[selected.tipo_formacion] || selected.tipo_formacion}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Experiencia</p>
                      <p className="font-medium">
                        {experienciaLabels[selected.experiencia] || selected.experiencia}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Centro propio</p>
                      <p className="font-medium">
                        {centroLabels[selected.centro_propio] || selected.centro_propio}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Inversión</p>
                      <p className="font-medium">
                        {inversionLabels[selected.inversion] || selected.inversion}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  {selected.mensaje && (
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Mensaje</p>
                      <p className="bg-muted/50 rounded-lg p-3 whitespace-pre-wrap">
                        {selected.mensaje}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
