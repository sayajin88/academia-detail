import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProfileEditModal, { type UnifiedEntry } from "@/components/admin/AdminProfileEditModal";
import { AdminProfileMap } from "@/components/admin/AdminProfileMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus, Loader2, Map, LayoutGrid, Layers, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; variant: "default" | "destructive" | "outline" | "secondary" }> = {
  pending: { label: "Pendiente", variant: "outline" },
  approved: { label: "Activo", variant: "default" },
  rejected: { label: "Rechazado", variant: "destructive" },
};

const levelLabels: Record<string, string> = {
  member: "Miembro",
  certified_pro: "Certificado Pro",
  master_detailer: "Master Detailer",
  elite_detailer: "Élite Detailer",
};

const emptyEntry: UnifiedEntry = {
  id: "", source: "profile", status: "approved",
  business_name: "", owner_name: "", email: "", phone: "", whatsapp_number: "",
  city: "", province: "", address: "", zip_code: "",
  profile_type: "detailer", services: [], brands: [], skills: [],
  specialty: "", years_experience: null, experience_level: "",
  owner_photo_url: null, logo_url: null, featured_image_url: null, gallery_urls: [],
  has_taken_course: false, course_name: "", has_insurance: false,
  website_url: "", instagram_handle: "", portfolio_url: "",
  description: "", value_proposition: "", message: "",
  level_badge: "certified_pro", is_published: true, is_verified: true,
  latitude: null, longitude: null, slug: null, created_at: new Date().toISOString(),
};

const AdminProfiles = () => {
  const [entries, setEntries] = useState<UnifiedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<UnifiedEntry | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [viewMode, setViewMode] = useState<"both" | "map" | "table">("both");
  const { toast } = useToast();

  const fetchAll = async () => {
    setLoading(true);

    // Fetch both tables in parallel
    const [appsRes, profilesRes] = await Promise.all([
      supabase.from("directory_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("detailer_profiles").select("*").order("created_at", { ascending: false }),
    ]);

    if (appsRes.error) toast({ title: "Error", description: appsRes.error.message, variant: "destructive" });
    if (profilesRes.error) toast({ title: "Error", description: profilesRes.error.message, variant: "destructive" });

    const apps: UnifiedEntry[] = (appsRes.data || [])
      .filter((a: any) => a.status !== "approved") // approved ones live in profiles
      .map((a: any) => ({
        id: a.id, source: "application" as const, status: a.status as any,
        business_name: a.business_name, owner_name: a.owner_name, email: a.email,
        phone: a.phone, whatsapp_number: a.whatsapp_number,
        city: a.city, province: a.province, address: a.address, zip_code: a.zip_code,
        profile_type: a.profile_type, services: a.services, brands: a.brands, skills: a.skills,
        specialty: a.specialty, years_experience: a.years_experience, experience_level: a.experience_level,
        owner_photo_url: a.owner_photo_url, logo_url: a.logo_url, featured_image_url: null,
        gallery_urls: a.gallery_urls,
        has_taken_course: a.has_taken_course, course_name: a.course_name, has_insurance: a.has_insurance,
        website_url: a.website_url, instagram_handle: a.instagram_handle, portfolio_url: a.portfolio_url,
        description: a.description, value_proposition: a.value_proposition, message: a.message,
        level_badge: "certified_pro", is_published: null, is_verified: null,
        latitude: null, longitude: null, slug: null, created_at: a.created_at,
      }));

    const profiles: UnifiedEntry[] = (profilesRes.data || []).map((p: any) => ({
      id: p.id, source: "profile" as const, status: "approved" as const,
      business_name: p.business_name, owner_name: p.owner_name, email: p.email,
      phone: p.phone, whatsapp_number: p.whatsapp_number,
      city: p.city, province: p.province, address: p.address, zip_code: p.zip_code,
      profile_type: p.profile_type, services: p.services, brands: null, skills: p.skills,
      specialty: p.specialty, years_experience: p.years_experience, experience_level: null,
      owner_photo_url: p.owner_photo_url, logo_url: null, featured_image_url: p.featured_image_url,
      gallery_urls: null,
      has_taken_course: null, course_name: null, has_insurance: null,
      website_url: p.website_url, instagram_handle: p.instagram_handle, portfolio_url: null,
      description: p.description, value_proposition: null, message: null,
      level_badge: p.level_badge, is_published: p.is_published, is_verified: p.is_verified,
      latitude: p.latitude, longitude: p.longitude, slug: p.slug, created_at: p.created_at,
    }));

    setEntries([...apps, ...profiles]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const counts = {
    all: entries.length,
    pending: entries.filter(e => e.status === "pending").length,
    approved: entries.filter(e => e.status === "approved").length,
    rejected: entries.filter(e => e.status === "rejected").length,
  };

  const filtered = entries.filter(e => {
    if (filter !== "all" && e.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return e.business_name.toLowerCase().includes(q) || e.city.toLowerCase().includes(q) || e.owner_name.toLowerCase().includes(q);
    }
    return true;
  });

  // For the map, only show profiles with coordinates
  const mapProfiles = filtered.filter(e => e.latitude && e.longitude).map(e => ({
    id: e.id, business_name: e.business_name, owner_name: e.owner_name, city: e.city,
    province: e.province, profile_type: e.profile_type, latitude: e.latitude, longitude: e.longitude,
    is_published: e.is_published, level_badge: e.level_badge,
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Directorio</h1>
            <p className="text-muted-foreground">Gestiona solicitudes y perfiles activos</p>
          </div>
          <Button onClick={() => { setSelected({ ...emptyEntry }); setIsNew(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Añadir perfil
          </Button>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["all", "pending", "approved", "rejected"] as const).map(key => (
            <Card key={key} className={`cursor-pointer transition-colors ${filter === key ? "border-primary" : ""}`} onClick={() => setFilter(key)}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{counts[key]}</p>
                <p className="text-xs text-muted-foreground">{key === "all" ? "Total" : statusConfig[key]?.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search + view toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <Input placeholder="Buscar por nombre, ciudad o propietario..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-md" />
          <div className="flex items-center rounded-lg border border-border bg-card p-1 gap-0.5">
            {([
              { mode: "both" as const, icon: Layers, label: "Ambos" },
              { mode: "map" as const, icon: Map, label: "Mapa" },
              { mode: "table" as const, icon: LayoutGrid, label: "Tabla" },
            ]).map(({ mode, icon: Icon, label }) => (
              <button key={mode} onClick={() => setViewMode(mode)} className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5",
                viewMode === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}>
                <Icon className="h-3.5 w-3.5" /><span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div>
        ) : (
          <>
            {(viewMode === "map" || viewMode === "both") && mapProfiles.length > 0 && (
              <AdminProfileMap
                profiles={mapProfiles as any}
                onEdit={(id) => { const e = entries.find(x => x.id === id); if (e) { setSelected(e); setIsNew(false); } }}
                onDelete={() => {}}
              />
            )}

            {(viewMode === "table" || viewMode === "both") && (
              filtered.length === 0 ? (
                <Card><CardContent className="py-12 text-center text-muted-foreground">No hay resultados</CardContent></Card>
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
                      {filtered.map(e => (
                        <TableRow key={`${e.source}-${e.id}`}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {e.owner_photo_url ? (
                                <img src={e.owner_photo_url} alt="" className="w-8 h-8 rounded-full object-cover border" />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold">
                                  {e.business_name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{e.business_name}</p>
                                <p className="text-xs text-muted-foreground">{e.owner_name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell capitalize">{e.profile_type}</TableCell>
                          <TableCell className="hidden md:table-cell">{e.city}, {e.province}</TableCell>
                          <TableCell className="hidden md:table-cell">{new Date(e.created_at).toLocaleDateString("es-ES")}</TableCell>
                          <TableCell>
                            <Badge variant={statusConfig[e.status]?.variant || "outline"}>
                              {statusConfig[e.status]?.label || e.status}
                            </Badge>
                            {e.source === "profile" && e.level_badge && e.level_badge !== "member" && (
                              <Badge variant="secondary" className="ml-1 text-[10px]">{levelLabels[e.level_badge] || e.level_badge}</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => { setSelected(e); setIsNew(false); }}>
                              {e.status === "pending" ? <Eye className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )
            )}
          </>
        )}

        <AdminProfileEditModal
          entry={selected}
          isNew={isNew}
          onClose={() => { setSelected(null); setIsNew(false); }}
          onAction={fetchAll}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProfiles;
