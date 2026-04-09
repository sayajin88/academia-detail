import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Search, Mail, Phone, MessageCircle, Users,
  GraduationCap, Wrench, Shield, Paintbrush, Car,
  Clock, CheckCircle2, Save, Trash2, StickyNote, Euro,
  Eye, EyeOff, Send, FileText,
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

const inversionColors: Record<string, string> = {
  menos_500: "bg-slate-100 text-slate-700",
  "500_1000": "bg-sky-100 text-sky-700",
  "1000_2000": "bg-indigo-100 text-indigo-700",
  "2000_5000": "bg-violet-100 text-violet-700",
  mas_5000: "bg-emerald-100 text-emerald-700",
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
  dossier_email_sent: boolean;
  dossier_opened: boolean;
  dossier_opened_at: string | null;
  followup_email_sent: boolean;
  followup_email_sent_at: string | null;
  tracking_token: string | null;
  dossier_email_sent_at: string | null;
};

const FORMATION_TABS = [
  { key: "all", label: "Todos" },
  { key: "detailing", label: "Detailing" },
  { key: "wrapping", label: "Wrapping" },
  { key: "ppf", label: "PPF" },
  { key: "restauracion", label: "Restauración" },
  { key: "carrera", label: "Carrera" },
];

const formatInversion = (raw: string): string => {
  if (inversionLabels[raw]) return inversionLabels[raw];
  return raw.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
};

const getInitials = (nombre: string, apellidos: string) =>
  `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();

const AdminContacts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkSending, setBulkSending] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ sent: 0, total: 0 });
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

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      setSelected(null);
      toast({ title: "Lead eliminado" });
    },
  });

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [resendingDossier, setResendingDossier] = useState(false);

  const handleResendDossier = async (contact: ContactSubmission) => {
    setResendingDossier(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nombre: contact.nombre,
          apellidos: contact.apellidos,
          email: contact.email,
          telefono: contact.telefono,
          experiencia: contact.experiencia,
          centro_propio: contact.centro_propio,
          inversion: contact.inversion,
          tipo_formacion: contact.tipo_formacion,
          mensaje: contact.mensaje,
          source: "contact_page",
        },
      });
      if (error) throw error;
      toast({ title: "Dossier reenviado", description: `Email enviado a ${contact.email}` });
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    } catch (err: any) {
      toast({ title: "Error al reenviar", description: err.message, variant: "destructive" });
    } finally {
      setResendingDossier(false);
    }
  };

  const handleBulkSendDossier = async () => {
    const targets = filtered.filter((c) => selectedIds.has(c.id) && !c.dossier_email_sent);
    if (targets.length === 0) {
      toast({ title: "Sin destinatarios", description: "Los seleccionados ya tienen el dossier enviado.", variant: "destructive" });
      return;
    }
    setBulkSending(true);
    setBulkProgress({ sent: 0, total: targets.length });
    let successCount = 0;
    let failCount = 0;
    for (const contact of targets) {
      try {
        const { error } = await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-confirmation",
            recipientEmail: contact.email,
            idempotencyKey: `bulk-dossier-${contact.id}`,
            templateData: {
              nombre: contact.nombre,
              formacion: formacionLabels[contact.tipo_formacion] || contact.tipo_formacion,
            },
          },
        });
        if (error) throw error;
        await supabase.from("contact_submissions").update({
          dossier_email_sent: true,
          dossier_email_sent_at: new Date().toISOString(),
        }).eq("id", contact.id);
        successCount++;
      } catch {
        failCount++;
      }
      setBulkProgress((p) => ({ ...p, sent: p.sent + 1 }));
    }
    setBulkSending(false);
    setSelectedIds(new Set());
    queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    toast({
      title: `Envío completado`,
      description: `${successCount} enviados correctamente${failCount > 0 ? `, ${failCount} fallidos` : ""}`,
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
      if (a.contact_status === "pendiente" && b.contact_status !== "pendiente") return -1;
      if (a.contact_status !== "pendiente" && b.contact_status === "pendiente") return 1;
      return 0;
    });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("es-ES", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "pendiente" ? "contactado" : "pendiente";
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const openDetail = (c: ContactSubmission) => {
    setSelected(c);
    setEditNotes(c.admin_notes || "");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Contactos / Leads</h1>
            <p className="text-muted-foreground text-sm">Gestión de solicitudes de formación</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            className={`cursor-pointer transition-all ${statusFilter === "all" ? "ring-2 ring-primary shadow-md" : "hover:shadow-md"}`}
            onClick={() => setStatusFilter("all")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{contacts.length}</p>
                <p className="text-sm text-muted-foreground">Total leads</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${statusFilter === "pendiente" ? "ring-2 ring-orange-400 shadow-md" : "hover:shadow-md"}`}
            onClick={() => setStatusFilter("pendiente")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${statusFilter === "contactado" ? "ring-2 ring-green-400 shadow-md" : "hover:shadow-md"}`}
            onClick={() => setStatusFilter("contactado")}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">{contactedCount}</p>
                <p className="text-sm text-muted-foreground">Contactados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {contacts.filter((c) => c.dossier_opened).length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Dossier abierto
                  {contacts.filter((c) => c.dossier_email_sent).length > 0 && (
                    <span className="text-xs ml-1">
                      ({Math.round((contacts.filter((c) => c.dossier_opened).length / contacts.filter((c) => c.dossier_email_sent).length) * 100)}%)
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Formation tabs */}
          <div className="flex gap-1.5 flex-wrap flex-1">
            {FORMATION_TABS.map((tab) => (
              <Button
                key={tab.key}
                size="sm"
                variant={activeTab === tab.key ? "default" : "outline"}
                onClick={() => setActiveTab(tab.key)}
                className="gap-1 text-xs h-8"
              >
                {tab.key !== "all" && formacionIcons[tab.key]}
                {tab.label}
                <span className="ml-0.5 opacity-70">({formationCounts[tab.key] ?? 0})</span>
              </Button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar nombre, email, teléfono..." className="pl-9 h-8 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
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
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-12 text-center">✓</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Contacto</TableHead>
                    <TableHead>Formación</TableHead>
                     <TableHead className="hidden lg:table-cell">Inversión</TableHead>
                    <TableHead className="hidden lg:table-cell">Tracking</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow
                      key={c.id}
                      className={`cursor-pointer transition-colors ${c.contact_status === "pendiente" ? "bg-orange-50/40 hover:bg-orange-50/70 dark:bg-orange-950/10" : "hover:bg-muted/50"}`}
                      onClick={() => openDetail(c)}
                    >
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={c.contact_status === "contactado"}
                          onCheckedChange={() => handleToggleStatus(c.id, c.contact_status)}
                          className="transition-all"
                          title={c.contact_status === "pendiente" ? "Marcar como contactado" : "Marcar como pendiente"}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${c.contact_status === "pendiente" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                            {getInitials(c.nombre, c.apellidos)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {c.nombre} {c.apellidos}
                              {c.admin_notes && <StickyNote className="inline h-3 w-3 ml-1 text-amber-500" />}
                            </p>
                            <p className="text-xs text-muted-foreground md:hidden truncate">{c.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm space-y-0.5">
                          <p className="truncate">{c.email}</p>
                          <p className="text-xs text-muted-foreground">{c.telefono}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${formacionColors[c.tipo_formacion] || "bg-muted text-foreground"}`}>
                          {formacionIcons[c.tipo_formacion]}
                          {formacionLabels[c.tipo_formacion] || c.tipo_formacion}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${inversionColors[c.inversion] || "bg-muted text-foreground"}`}>
                          <Euro className="h-3 w-3" />
                          {formatInversion(c.inversion)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1.5">
                          {c.dossier_email_sent && (
                            <span title={c.dossier_opened ? `Abierto: ${c.dossier_opened_at ? formatDate(c.dossier_opened_at) : ''}` : 'No abierto'}>
                              {c.dossier_opened ? (
                                <Eye className="h-4 w-4 text-blue-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                            </span>
                          )}
                          {c.followup_email_sent && (
                            <span title={`Follow-up enviado: ${c.followup_email_sent_at ? formatDate(c.followup_email_sent_at) : ''}`}>
                              <Send className="h-4 w-4 text-green-500" />
                            </span>
                          )}
                          {!c.dossier_email_sent && (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(c.created_at)}</TableCell>
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
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold ${selected.contact_status === "pendiente" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                      {getInitials(selected.nombre, selected.apellidos)}
                    </div>
                    <div>
                      <DialogTitle className="text-lg">{selected.nombre} {selected.apellidos}</DialogTitle>
                      <DialogDescription>Recibido el {formatDate(selected.created_at)}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-5 text-sm">
                  {/* Status toggle */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selected.contact_status === "contactado"}
                      onCheckedChange={() => {
                        const newStatus = selected.contact_status === "pendiente" ? "contactado" : "pendiente";
                        updateStatusMutation.mutate({ id: selected.id, status: newStatus });
                        setSelected({ ...selected, contact_status: newStatus, contacted_at: newStatus === "contactado" ? new Date().toISOString() : null });
                      }}
                    />
                    <span className="text-sm">
                      {selected.contact_status === "pendiente" ? (
                        <span className="text-orange-600 font-medium">Pendiente de contactar</span>
                      ) : (
                        <span className="text-green-600 font-medium">Contactado</span>
                      )}
                    </span>
                    {selected.contacted_at && (
                      <span className="text-xs text-muted-foreground ml-auto">{formatDate(selected.contacted_at)}</span>
                    )}
                  </div>

                  {/* Contact actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="h-12 flex-col gap-0.5" asChild>
                      <a href={`mailto:${selected.email}`}>
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="text-[10px] truncate max-w-full">{selected.email}</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-12 flex-col gap-0.5" asChild>
                      <a href={`tel:${selected.telefono}`}>
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-[10px]">{selected.telefono}</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-12 flex-col gap-0.5" asChild>
                      <a href={`https://wa.me/${selected.telefono.replace(/\s+/g, "").replace(/^\+/, "")}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                        <span className="text-[10px]">WhatsApp</span>
                      </a>
                    </Button>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 bg-muted/40 rounded-xl p-4">
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">Formación</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${formacionColors[selected.tipo_formacion] || "bg-muted"}`}>
                        {formacionIcons[selected.tipo_formacion]}
                        {formacionLabels[selected.tipo_formacion] || selected.tipo_formacion}
                      </span>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">Experiencia</p>
                      <p className="font-medium text-sm">{experienciaLabels[selected.experiencia] || selected.experiencia}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">Centro propio</p>
                      <p className="font-medium text-sm">{centroLabels[selected.centro_propio] || selected.centro_propio}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">Inversión</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${inversionColors[selected.inversion] || "bg-muted"}`}>
                        <Euro className="h-3 w-3" />
                        {formatInversion(selected.inversion)}
                      </span>
                    </div>
                  </div>

                  {/* Email tracking */}
                  {selected.dossier_email_sent && (
                    <div className="grid grid-cols-2 gap-3 bg-blue-50/50 dark:bg-blue-950/10 rounded-xl p-4">
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5 flex items-center gap-1">
                          <FileText className="h-3 w-3" /> Dossier
                        </p>
                        <div className="flex items-center gap-1.5">
                          {selected.dossier_opened ? (
                            <>
                              <Eye className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium text-blue-600">Abierto</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">No abierto</span>
                            </>
                          )}
                        </div>
                        {selected.dossier_opened_at && (
                          <p className="text-xs text-muted-foreground mt-0.5">{formatDate(selected.dossier_opened_at)}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5 flex items-center gap-1">
                          <Send className="h-3 w-3" /> Follow-up
                        </p>
                        {selected.followup_email_sent ? (
                          <>
                            <span className="text-sm font-medium text-green-600">Enviado ✓</span>
                            {selected.followup_email_sent_at && (
                              <p className="text-xs text-muted-foreground mt-0.5">{formatDate(selected.followup_email_sent_at)}</p>
                            )}
                          </>
                        ) : (
                          <span className="text-sm font-medium text-muted-foreground">Pendiente</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resend dossier button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 w-full"
                    disabled={resendingDossier}
                    onClick={() => handleResendDossier(selected)}
                  >
                    <FileText className="h-4 w-4" />
                    {resendingDossier ? "Enviando..." : "Reenviar dossier por email"}
                  </Button>

                  {/* Message */}
                  {selected.mensaje && (
                    <div>
                      <p className="text-muted-foreground text-xs mb-1 font-medium">Mensaje del lead</p>
                      <p className="bg-muted/40 rounded-lg p-3 whitespace-pre-wrap text-sm">{selected.mensaje}</p>
                    </div>
                  )}

                  {/* Admin notes */}
                  <div>
                    <p className="text-muted-foreground text-xs mb-1 font-medium">Notas internas</p>
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

                  {/* Delete */}
                  <div className="border-t pt-4">
                    {confirmDeleteId === selected.id ? (
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-destructive font-medium">¿Eliminar permanentemente?</p>
                        <Button size="sm" variant="destructive" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(selected.id)}>
                          Confirmar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setConfirmDeleteId(null)}>
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10 gap-1.5"
                        onClick={() => setConfirmDeleteId(selected.id)}
                      >
                        <Trash2 className="h-4 w-4" /> Eliminar lead
                      </Button>
                    )}
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
