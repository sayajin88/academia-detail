import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import ApplicationDetailModal from "@/components/admin/ApplicationDetailModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Eye, Loader2 } from "lucide-react";

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

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : apps.length === 0 ? (
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
                {apps.map(app => (
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

        <ApplicationDetailModal
          application={selected}
          onClose={() => setSelected(null)}
          onAction={fetchApps}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminApplications;
