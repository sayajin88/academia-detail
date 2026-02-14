import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminProfileMap } from "@/components/admin/AdminProfileMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Loader2, Save, Map, LayoutGrid, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type Profile = {
  id: string;
  business_name: string;
  slug: string;
  owner_name: string;
  email: string;
  phone: string | null;
  city: string;
  province: string;
  profile_type: string;
  services: string[] | null;
  level_badge: string;
  is_published: boolean | null;
  is_verified: boolean | null;
  description: string | null;
  featured_image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  specialty: string | null;
  years_experience: number | null;
  website_url: string | null;
  instagram_handle: string | null;
  whatsapp_number: string | null;
  created_at: string;
};

const emptyProfile: Omit<Profile, "id" | "created_at"> = {
  business_name: "",
  slug: "",
  owner_name: "",
  email: "",
  phone: "",
  city: "",
  province: "",
  profile_type: "detailer",
  services: [],
  level_badge: "certified_pro",
  is_published: true,
  is_verified: true,
  description: "",
  featured_image_url: "",
  latitude: null,
  longitude: null,
  specialty: "",
  years_experience: null,
  website_url: "",
  instagram_handle: "",
  whatsapp_number: "",
};

const levelLabels: Record<string, string> = {
  member: "Miembro",
  certified_pro: "Certificado Pro",
  master_detailer: "Master Detailer",
  elite_detailer: "Élite Detailer",
};

const AdminProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Profile> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"both" | "map" | "table">("both");
  const { toast } = useToast();

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("detailer_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setProfiles((data as unknown as Profile[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);

  const handleSave = async () => {
    if (!editing) return;
    setSaveLoading(true);

    const slug = editing.slug || generateSlug(editing.business_name || "perfil");

    // Geocode if no coords or if city/province changed
    let latitude = editing.latitude;
    let longitude = editing.longitude;
    const original = profiles.find(p => p.id === editing.id);
    const locationChanged = !isNew && original && (original.city !== editing.city || original.province !== editing.province);
    if (((!latitude || !longitude) || locationChanged) && editing.city && editing.province) {
      try {
        const query = encodeURIComponent(`${editing.city}, ${editing.province}, España`);
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
          headers: { "User-Agent": "AcademiaDetail/1.0" },
        });
        const geoData = await geoRes.json();
        if (geoData?.length > 0) {
          latitude = parseFloat(geoData[0].lat);
          longitude = parseFloat(geoData[0].lon);
        }
      } catch (e) { console.error("Geocoding failed:", e); }
    }

    const profileData = {
      business_name: editing.business_name || "",
      slug,
      owner_name: editing.owner_name || "",
      email: editing.email || "",
      phone: editing.phone || null,
      city: editing.city || "",
      province: editing.province || "",
      profile_type: editing.profile_type || "detailer",
      services: editing.services || [],
      level_badge: editing.level_badge || "certified_pro",
      is_published: editing.is_published ?? true,
      is_verified: editing.is_verified ?? true,
      description: editing.description || null,
      featured_image_url: editing.featured_image_url || null,
      latitude,
      longitude,
      specialty: editing.specialty || null,
      years_experience: editing.years_experience ?? null,
      website_url: editing.website_url || null,
      instagram_handle: editing.instagram_handle || null,
      whatsapp_number: editing.whatsapp_number || null,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("detailer_profiles").insert(profileData));
    } else {
      ({ error } = await supabase.from("detailer_profiles").update(profileData).eq("id", editing.id!));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isNew ? "Creado" : "Actualizado", description: `Perfil de ${profileData.business_name} guardado.` });
      setEditing(null);
      setIsNew(false);
      fetchProfiles();
    }
    setSaveLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    const { error } = await supabase.from("detailer_profiles").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Eliminado", description: "Perfil eliminado del directorio." });
      fetchProfiles();
    }
    setDeleteId(null);
    setDeleteLoading(false);
  };

  const filtered = profiles.filter(p => {
    const q = search.toLowerCase();
    return !q || p.business_name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.owner_name.toLowerCase().includes(q);
  });

  const updateField = (field: string, value: any) => {
    setEditing(prev => prev ? { ...prev, [field]: value } : null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Perfiles del Directorio</h1>
            <p className="text-muted-foreground">{profiles.length} perfiles en total</p>
          </div>
          <Button onClick={() => { setEditing({ ...emptyProfile }); setIsNew(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Añadir perfil
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <Input placeholder="Buscar por nombre, ciudad o propietario..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-md" />
          <div className="flex items-center rounded-lg border border-border bg-card p-1 gap-0.5">
            {([
              { mode: "both" as const, icon: Layers, label: "Ambos" },
              { mode: "map" as const, icon: Map, label: "Mapa" },
              { mode: "table" as const, icon: LayoutGrid, label: "Tabla" },
            ]).map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5",
                  viewMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <>
            {/* Admin Map */}
            {(viewMode === "map" || viewMode === "both") && (
              <AdminProfileMap
                profiles={filtered}
                onEdit={(id) => {
                  const p = profiles.find(pr => pr.id === id);
                  if (p) { setEditing({ ...p }); setIsNew(false); }
                }}
                onDelete={(id) => setDeleteId(id)}
              />
            )}

            {/* Table */}
            {(viewMode === "table" || viewMode === "both") && (
              filtered.length === 0 ? (
                <Card><CardContent className="py-12 text-center text-muted-foreground">No hay perfiles</CardContent></Card>
              ) : (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Negocio</TableHead>
                        <TableHead className="hidden md:table-cell">Tipo</TableHead>
                        <TableHead className="hidden md:table-cell">Ubicación</TableHead>
                        <TableHead className="hidden md:table-cell">Rango</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map(p => (
                        <TableRow key={p.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{p.business_name}</p>
                              <p className="text-xs text-muted-foreground">{p.owner_name}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell capitalize">{p.profile_type}</TableCell>
                          <TableCell className="hidden md:table-cell">{p.city}, {p.province}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="secondary">{levelLabels[p.level_badge] || p.level_badge}</Badge>
                          </TableCell>
                          <TableCell>
                            {p.is_published ? (
                              <Badge variant="default">Publicado</Badge>
                            ) : (
                              <Badge variant="outline">Borrador</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => { setEditing({ ...p }); setIsNew(false); }}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setDeleteId(p.id)} className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
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

        {/* Edit/Create Modal */}
        <Dialog open={!!editing} onOpenChange={open => { if (!open) { setEditing(null); setIsNew(false); } }}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto z-[9999]">
            {editing && (
              <>
                <DialogHeader>
                  <DialogTitle>{isNew ? "Añadir perfil manualmente" : `Editar: ${editing.business_name}`}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1.5">
                    <Label>Nombre del negocio *</Label>
                    <Input value={editing.business_name || ""} onChange={e => updateField("business_name", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Propietario *</Label>
                    <Input value={editing.owner_name || ""} onChange={e => updateField("owner_name", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email *</Label>
                    <Input type="email" value={editing.email || ""} onChange={e => updateField("email", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Teléfono</Label>
                    <Input value={editing.phone || ""} onChange={e => updateField("phone", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Ciudad *</Label>
                    <Input value={editing.city || ""} onChange={e => updateField("city", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Provincia *</Label>
                    <Input value={editing.province || ""} onChange={e => updateField("province", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tipo de perfil</Label>
                    <Select value={editing.profile_type || "detailer"} onValueChange={v => updateField("profile_type", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detailer">Detailer</SelectItem>
                        <SelectItem value="centro">Centro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Rango</Label>
                    <Select value={editing.level_badge || "certified_pro"} onValueChange={v => updateField("level_badge", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Miembro</SelectItem>
                        <SelectItem value="certified_pro">Certificado Pro</SelectItem>
                        <SelectItem value="master_detailer">Master Detailer</SelectItem>
                        <SelectItem value="elite_detailer">Élite Detailer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Especialidad</Label>
                    <Input value={editing.specialty || ""} onChange={e => updateField("specialty", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Años de experiencia</Label>
                    <Input type="number" value={editing.years_experience ?? ""} onChange={e => updateField("years_experience", e.target.value ? parseInt(e.target.value) : null)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Web</Label>
                    <Input value={editing.website_url || ""} onChange={e => updateField("website_url", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Instagram</Label>
                    <Input value={editing.instagram_handle || ""} onChange={e => updateField("instagram_handle", e.target.value)} placeholder="@usuario" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>WhatsApp</Label>
                    <Input value={editing.whatsapp_number || ""} onChange={e => updateField("whatsapp_number", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>URL imagen destacada</Label>
                    <Input value={editing.featured_image_url || ""} onChange={e => updateField("featured_image_url", e.target.value)} />
                  </div>
                  <div className="space-y-1.5 flex items-center gap-3 pt-6">
                    <Switch checked={editing.is_published ?? true} onCheckedChange={v => updateField("is_published", v)} />
                    <Label>{editing.is_published ? "Publicado" : "Borrador"}</Label>
                  </div>
                  <div className="space-y-1.5 flex items-center gap-3 pt-6">
                    <Switch checked={editing.is_verified ?? false} onCheckedChange={v => updateField("is_verified", v)} />
                    <Label>Verificado</Label>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label>Servicios (separados por coma)</Label>
                    <Input value={(editing.services || []).join(", ")} onChange={e => updateField("services", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label>Descripción</Label>
                    <Textarea value={editing.description || ""} onChange={e => updateField("description", e.target.value)} rows={3} />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancelar</Button>
                  <Button onClick={handleSave} disabled={saveLoading || !editing.business_name || !editing.email || !editing.city || !editing.province}>
                    {saveLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                    {isNew ? "Crear perfil" : "Guardar cambios"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={open => { if (!open) setDeleteId(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar este perfil?</AlertDialogTitle>
              <AlertDialogDescription>Esta acción no se puede deshacer. El perfil será eliminado del directorio permanentemente.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={deleteLoading} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminProfiles;
