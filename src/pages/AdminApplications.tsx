import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Eye, Clock, Loader2 } from "lucide-react";

type Application = {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  profile_type: string;
  services: string[] | null;
  status: string;
  created_at: string;
  logo_url: string | null;
  gallery_urls: string[] | null;
  brands: string[] | null;
  has_taken_course: boolean | null;
  has_insurance: boolean | null;
  value_proposition: string | null;
  portfolio_url: string | null;
  experience_level: string | null;
  course_name: string | null;
  message: string | null;
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendiente", variant: "outline" },
  approved: { label: "Aprobado", variant: "default" },
  rejected: { label: "Rechazado", variant: "destructive" },
};

const AdminApplications = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  const fetchApps = async () => {
    setLoading(true);
    let query = supabase.from("directory_applications").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data, error } = await query;
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setApps(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchApps(); }, [filter]);

  const handleAction = async (action: "approve" | "reject") => {
    if (!selected) return;
    setActionLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${action === "approve" ? "approve-application" : "reject-application"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          application_id: selected.id,
          ...(action === "reject" ? { reason: rejectReason } : {}),
        }),
      }
    );

    const result = await res.json();
    if (!res.ok) {
      toast({ title: "Error", description: result.error || "Error procesando solicitud", variant: "destructive" });
    } else {
      toast({ title: action === "approve" ? "Aprobada" : "Rechazada", description: `Solicitud de ${selected.business_name} ${action === "approve" ? "aprobada" : "rechazada"}.` });
      setSelected(null);
      setRejectReason("");
      fetchApps();
    }
    setActionLoading(false);
  };

  const filtered = apps;
  const counts = {
    all: apps.length,
    pending: apps.filter(a => a.status === "pending").length,
    approved: apps.filter(a => a.status === "approved").length,
    rejected: apps.filter(a => a.status === "rejected").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Solicitudes del Directorio</h1>
          <p className="text-muted-foreground">Gestiona las solicitudes de alta en el directorio</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["all", "pending", "approved", "rejected"] as const).map(key => (
            <Card key={key} className={`cursor-pointer transition-colors ${filter === key ? "border-primary" : ""}`} onClick={() => setFilter(key)}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{key === "all" ? apps.length : counts[key]}</p>
                <p className="text-xs text-muted-foreground capitalize">{key === "all" ? "Total" : statusConfig[key]?.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No hay solicitudes</CardContent></Card>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Negocio</TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">Ubicación</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(app => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{app.business_name}</p>
                        <p className="text-xs text-muted-foreground">{app.owner_name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell capitalize">{app.profile_type}</TableCell>
                    <TableCell className="hidden md:table-cell">{app.city}, {app.province}</TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(app.created_at).toLocaleDateString("es-ES")}</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[app.status]?.variant || "outline"}>
                        {statusConfig[app.status]?.label || app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelected(app)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Detail Modal */}
        <Dialog open={!!selected} onOpenChange={open => { if (!open) { setSelected(null); setRejectReason(""); } }}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            {selected && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {selected.business_name}
                    <Badge variant={statusConfig[selected.status]?.variant || "outline"}>
                      {statusConfig[selected.status]?.label}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 text-sm">
                  {selected.logo_url && (
                    <img src={selected.logo_url} alt="Logo" className="h-16 w-16 rounded-lg object-cover" />
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div><span className="text-muted-foreground">Propietario:</span> <p className="font-medium">{selected.owner_name}</p></div>
                    <div><span className="text-muted-foreground">Email:</span> <p className="font-medium">{selected.email}</p></div>
                    <div><span className="text-muted-foreground">Teléfono:</span> <p className="font-medium">{selected.phone}</p></div>
                    <div><span className="text-muted-foreground">Tipo:</span> <p className="font-medium capitalize">{selected.profile_type}</p></div>
                    <div><span className="text-muted-foreground">Ubicación:</span> <p className="font-medium">{selected.city}, {selected.province}</p></div>
                    <div><span className="text-muted-foreground">Experiencia:</span> <p className="font-medium">{selected.experience_level || "—"}</p></div>
                    <div><span className="text-muted-foreground">Alumno Academia:</span> <p className="font-medium">{selected.has_taken_course ? `Sí (${selected.course_name || ""})` : "No"}</p></div>
                    <div><span className="text-muted-foreground">Seguro RC:</span> <p className="font-medium">{selected.has_insurance ? "Sí" : "No"}</p></div>
                  </div>

                  {selected.services && selected.services.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Servicios:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selected.services.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                      </div>
                    </div>
                  )}

                  {selected.brands && selected.brands.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Marcas:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selected.brands.map(b => <Badge key={b} variant="outline">{b}</Badge>)}
                      </div>
                    </div>
                  )}

                  {selected.value_proposition && (
                    <div><span className="text-muted-foreground">Propuesta de valor:</span><p className="mt-1">{selected.value_proposition}</p></div>
                  )}

                  {selected.gallery_urls && selected.gallery_urls.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Galería:</span>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {selected.gallery_urls.map((url, i) => (
                          <img key={i} src={url} alt={`Foto ${i + 1}`} className="rounded-lg aspect-video object-cover" />
                        ))}
                      </div>
                    </div>
                  )}

                  {selected.status === "pending" && (
                    <div className="space-y-3 pt-4 border-t">
                      <Textarea
                        placeholder="Motivo de rechazo (opcional para aprobar, requerido para rechazar)"
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {selected.status === "pending" && (
                  <DialogFooter className="gap-2">
                    <Button variant="destructive" onClick={() => handleAction("reject")} disabled={actionLoading || !rejectReason}>
                      {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-1" />}
                      Rechazar
                    </Button>
                    <Button onClick={() => handleAction("approve")} disabled={actionLoading}>
                      {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                      Aprobar
                    </Button>
                  </DialogFooter>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminApplications;
