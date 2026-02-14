import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Search, Mail, Phone, MessageCircle,
  GraduationCap, Wrench, Shield, Paintbrush, Car,
  Clock, CheckCircle2, Save,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// --- Label maps ---
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
  contact_status: string;
  contacted_at: string | null;
  admin_notes: string | null;
};

const FORMATION_TABS = [
  { key: "all", label: "Todos" },
  { key: "detailing", label: "Detailing" },
  { key: "wrapping", label: "Wrapping" },
  { key: "ppf", label: "PPF" },
  { key: "restauracion", label: "Restauración" },
  { key: "carrera", label: "Carrera" },
];

const STATUS_TABS = [
  { key: "all", label: "Todos" },
  { key: "pendiente", label: "Pendientes", icon: Clock, color: "text-orange-600" },
  { key: "contactado", label: "Contactados", icon: CheckCircle2, color: "text-green-600" },
];

const AdminContacts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const queryClient = useQueryClient();

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

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const updates: Record<string, any> = { contact_status: status };
      if (status === "contactado") updates.contacted_at = new Date().toISOString();
      else updates.contacted_at = null;
      const { error } = await supabase.from("contact_submissions").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      toast({ title: "Estado actualizado" });
    },
  });

  const saveNotesMutation = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase.from("contact_submissions").update({ admin_notes: notes }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      toast({ title: "Notas guardadas" });
    },
  });

  const pendingCount = contacts.filter((c) => c.contact_status === "pendiente").length;
  const contactedCount = contacts.filter((c) => c.contact_status === "contactado").length;

  const formationCounts = FORMATION_TABS.reduce((acc, tab) => {
    acc[tab.key] = tab.key === "all"
      ? contacts.length
      : contacts.filter((c) => c.tipo_formacion === tab.key).length;
    return acc;
  }, {} as Record<string, number>);

  const filtered = contacts
    .filter((c) => {
      const matchTab = activeTab === "all" || c.tipo_formacion === activeTab;
      const matchStatus = statusFilter === "all" || c.contact_status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.nombre.toLowerCase().includes(q) ||
        c.apellidos.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.telefono.includes(q);
      return matchTab && matchStatus && matchSearch;
    })
    .sort((a, b) => {
      // Pendientes first
      if (a.contact_status === "pendiente" && b.contact_status !== "pendiente") return -1;
      if (a.contact_status !== "pendiente" && b.contact_status === "pendiente") return 1;
      return 0;
    });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("es-ES", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

  const handleToggleStatus = (e: React.MouseEvent, c: ContactSubmission) => {
    e.stopPropagation();
    const newStatus = c.contact_status === "pendiente" ? "contactado" : "pendiente";
    updateStatusMutation.mutate({ id: c.id, status: newStatus });
  };

  const openDetail = (c: ContactSubmission) => {
    setSelected(c);
    setEditNotes(c.admin_notes || "");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Contactos / Leads</h1>
          <p className="text-muted-foreground text-sm">
            {contacts.length} total — <span className="text-orange-600 font-medium">{pendingCount} pendientes</span> · <span className="text-green-600 font-medium">{contactedCount} contactados</span>
          </p>
        </div>

        {/* Status filter */}
        <div className="flex gap-2">
          {STATUS_TABS.map((tab) => {
            const Icon = tab.icon;
            const count = tab.key === "all" ? contacts.length : tab.key === "pendiente" ? pendingCount : contactedCount;
            return (
              <Button
                key={tab.key}
                size="sm"
                variant={statusFilter === tab.key ? "default" : "outline"}
                onClick={() => setStatusFilter(tab.key)}
                className="gap-1.5"
              >
                {Icon && <Icon className={`h-4 w-4 ${statusFilter !== tab.key ? tab.color : ""}`} />}
                {tab.label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Formation counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {FORMATION_TABS.map((tab) => (
            <Card
              key={tab.key}
              className={`cursor-pointer transition-all ${activeTab === tab.key ? "ring-2 ring-primary" : "hover:shadow-md"}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold">{formationCounts[tab.key] ?? 0}</p>
                <p className="text-xs text-muted-foreground">{tab.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre, email o teléfono..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No hay contactos para mostrar</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estado</TableHead>
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
                      className={`cursor-pointer ${c.contact_status === "pendiente" ? "bg-orange-50/50 dark:bg-orange-950/10" : ""}`}
                      onClick={() => openDetail(c)}
                    >
                      <TableCell>
                        <button
                          onClick={(e) => handleToggleStatus(e, c)}
                          className="focus:outline-none"
                          title={c.contact_status === "pendiente" ? "Marcar como contactado" : "Marcar como pendiente"}
                        >
                          {c.contact_status === "pendiente" ? (
                            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 gap-1 cursor-pointer border-0">
                              <Clock className="h-3 w-3" /> Pendiente
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 gap-1 cursor-pointer border-0">
                              <CheckCircle2 className="h-3 w-3" /> Contactado
                            </Badge>
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="font-medium">{c.nombre} {c.apellidos}</TableCell>
                      <TableCell className="hidden md:table-cell">{c.email}</TableCell>
                      <TableCell className="hidden lg:table-cell">{c.telefono}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${formacionColors[c.tipo_formacion] || "bg-muted text-foreground"}`}>
                          {formacionIcons[c.tipo_formacion]}
                          {formacionLabels[c.tipo_formacion] || c.tipo_formacion}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{experienciaLabels[c.experiencia] || c.experiencia}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{inversionLabels[c.inversion] || c.inversion}</TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{formatDate(c.created_at)}</TableCell>
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
                  <DialogTitle>{selected.nombre} {selected.apellidos}</DialogTitle>
                  <DialogDescription>Recibido el {formatDate(selected.created_at)}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                  {/* Status toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs">Estado:</span>
                    <Button
                      size="sm"
                      variant={selected.contact_status === "pendiente" ? "outline" : "default"}
                      className={selected.contact_status === "contactado" ? "bg-green-600 hover:bg-green-700 gap-1.5" : "gap-1.5 border-orange-300 text-orange-700"}
                      onClick={() => {
                        const newStatus = selected.contact_status === "pendiente" ? "contactado" : "pendiente";
                        updateStatusMutation.mutate({ id: selected.id, status: newStatus });
                        setSelected({ ...selected, contact_status: newStatus, contacted_at: newStatus === "contactado" ? new Date().toISOString() : null });
                      }}
                    >
                      {selected.contact_status === "pendiente" ? <><Clock className="h-4 w-4" /> Pendiente — Marcar contactado</> : <><CheckCircle2 className="h-4 w-4" /> Contactado</>}
                    </Button>
                  </div>
                  {selected.contacted_at && (
                    <p className="text-xs text-muted-foreground">Contactado el {formatDate(selected.contacted_at)}</p>
                  )}

                  {/* Contact info */}
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${selected.email}`}><Mail className="h-4 w-4 mr-1" /> {selected.email}</a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${selected.telefono}`}><Phone className="h-4 w-4 mr-1" /> {selected.telefono}</a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`https://wa.me/${selected.telefono.replace(/\s+/g, "").replace(/^\+/, "")}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-1" /> WhatsApp
                      </a>
                    </Button>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 bg-muted/50 rounded-lg p-4">
                    <div>
                      <p className="text-muted-foreground text-xs">Formación</p>
                      <p className="font-medium">{formacionLabels[selected.tipo_formacion] || selected.tipo_formacion}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Experiencia</p>
                      <p className="font-medium">{experienciaLabels[selected.experiencia] || selected.experiencia}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Centro propio</p>
                      <p className="font-medium">{centroLabels[selected.centro_propio] || selected.centro_propio}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Inversión</p>
                      <p className="font-medium">{inversionLabels[selected.inversion] || selected.inversion}</p>
                    </div>
                  </div>

                  {/* Message */}
                  {selected.mensaje && (
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Mensaje</p>
                      <p className="bg-muted/50 rounded-lg p-3 whitespace-pre-wrap">{selected.mensaje}</p>
                    </div>
                  )}

                  {/* Admin notes */}
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Notas internas</p>
                    <Textarea
                      placeholder="Ej: Le envié presupuesto, llamar el lunes..."
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      rows={3}
                    />
                    <Button
                      size="sm"
                      className="mt-2 gap-1.5"
                      disabled={saveNotesMutation.isPending}
                      onClick={() => {
                        saveNotesMutation.mutate({ id: selected.id, notes: editNotes });
                        setSelected({ ...selected, admin_notes: editNotes });
                      }}
                    >
                      <Save className="h-4 w-4" /> Guardar notas
                    </Button>
                  </div>
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
