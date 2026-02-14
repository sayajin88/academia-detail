import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2, Save, Upload, X, ImagePlus, User, Trash2 } from "lucide-react";

export type UnifiedEntry = {
  id: string;
  source: "application" | "profile";
  status: "pending" | "approved" | "rejected";
  business_name: string;
  owner_name: string;
  email: string;
  phone: string | null;
  whatsapp_number: string | null;
  city: string;
  province: string;
  address: string | null;
  zip_code: string | null;
  profile_type: string;
  services: string[] | null;
  brands: string[] | null;
  skills: string[] | null;
  specialty: string | null;
  years_experience: number | null;
  experience_level: string | null;
  owner_photo_url: string | null;
  logo_url: string | null;
  featured_image_url: string | null;
  gallery_urls: string[] | null;
  has_taken_course: boolean | null;
  course_name: string | null;
  has_insurance: boolean | null;
  website_url: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
  description: string | null;
  value_proposition: string | null;
  message: string | null;
  level_badge: string;
  is_published: boolean | null;
  is_verified: boolean | null;
  latitude: number | null;
  longitude: number | null;
  slug: string | null;
  created_at: string;
};

interface Props {
  entry: UnifiedEntry | null;
  isNew?: boolean;
  onClose: () => void;
  onAction: () => void;
}

const statusLabels: Record<string, { label: string; variant: "default" | "destructive" | "outline" }> = {
  pending: { label: "Pendiente", variant: "outline" },
  approved: { label: "Activo", variant: "default" },
  rejected: { label: "Rechazado", variant: "destructive" },
};

const AdminProfileEditModal = ({ entry, isNew = false, onClose, onAction }: Props) => {
  const [form, setForm] = useState<UnifiedEntry | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (entry) {
      setForm({ ...entry });
      setRejectReason("");
      setDeleteConfirm(false);
    }
  }, [entry]);

  if (!entry || !form) return null;

  const updateField = (field: keyof UnifiedEntry, value: any) => {
    setForm(prev => prev ? { ...prev, [field]: value } : null);
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${form!.id}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("directory-uploads").upload(path, file, { upsert: true });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return null; }
    return supabase.storage.from("directory-uploads").getPublicUrl(path).data.publicUrl;
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast({ title: "Máximo 5MB", variant: "destructive" }); return; }
    setUploadingPhoto(true);
    const url = await uploadFile(file, "photos");
    if (url) updateField("owner_photo_url", url);
    setUploadingPhoto(false);
    if (photoRef.current) photoRef.current.value = "";
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    const url = await uploadFile(file, "logos");
    if (url) updateField("logo_url", url);
    setUploadingLogo(false);
    if (logoRef.current) logoRef.current.value = "";
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploadingGallery(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "gallery");
      if (url) urls.push(url);
    }
    if (urls.length) updateField("gallery_urls", [...(form!.gallery_urls || []), ...urls]);
    setUploadingGallery(false);
    if (galleryRef.current) galleryRef.current.value = "";
  };

  const removeGalleryImage = (index: number) => {
    updateField("gallery_urls", (form!.gallery_urls || []).filter((_, i) => i !== index));
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);

  const geocode = async (city: string, province: string) => {
    try {
      const q = encodeURIComponent(`${city}, ${province}, España`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`, { headers: { "User-Agent": "AcademiaDetail/1.0" } });
      const data = await res.json();
      if (data?.length > 0) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } catch {}
    return null;
  };

  const handleSave = async () => {
    if (!form) return;
    setSaveLoading(true);

    if (form.source === "application" || (form.source === "profile" && !isNew)) {
      // Save to the correct table
      if (form.source === "application") {
        const { error } = await supabase.from("directory_applications").update({
          business_name: form.business_name, owner_name: form.owner_name, email: form.email, phone: form.phone || "",
          city: form.city, province: form.province, address: form.address, zip_code: form.zip_code,
          profile_type: form.profile_type, services: form.services, brands: form.brands, skills: form.skills,
          specialty: form.specialty, years_experience: form.years_experience, experience_level: form.experience_level,
          owner_photo_url: form.owner_photo_url, logo_url: form.logo_url, gallery_urls: form.gallery_urls,
          has_taken_course: form.has_taken_course, course_name: form.course_name, has_insurance: form.has_insurance,
          website_url: form.website_url, instagram_handle: form.instagram_handle, portfolio_url: form.portfolio_url,
          description: form.description, value_proposition: form.value_proposition, message: form.message,
          whatsapp_number: form.whatsapp_number,
        }).eq("id", form.id);
        if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); setSaveLoading(false); return; }
      } else {
        // profile source
        let lat = form.latitude, lon = form.longitude;
        const orig = entry;
        if (orig && (orig.city !== form.city || orig.province !== form.province) && form.city && form.province) {
          const coords = await geocode(form.city, form.province);
          if (coords) { lat = coords.lat; lon = coords.lon; }
        }
        const { error } = await supabase.from("detailer_profiles").update({
          business_name: form.business_name, owner_name: form.owner_name, email: form.email, phone: form.phone,
          city: form.city, province: form.province, address: form.address, zip_code: form.zip_code,
          profile_type: form.profile_type, services: form.services, skills: form.skills,
          specialty: form.specialty, years_experience: form.years_experience,
          owner_photo_url: form.owner_photo_url, featured_image_url: form.logo_url || form.featured_image_url,
          website_url: form.website_url, instagram_handle: form.instagram_handle, whatsapp_number: form.whatsapp_number,
          description: form.description, level_badge: form.level_badge, is_published: form.is_published, is_verified: form.is_verified,
          latitude: lat, longitude: lon,
        }).eq("id", form.id);
        if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); setSaveLoading(false); return; }
      }
    } else if (isNew) {
      // Create new profile directly
      const slug = generateSlug(form.business_name || "perfil");
      const coords = form.city && form.province ? await geocode(form.city, form.province) : null;
      const { error } = await supabase.from("detailer_profiles").insert({
        business_name: form.business_name, slug, owner_name: form.owner_name, email: form.email, phone: form.phone,
        city: form.city, province: form.province, address: form.address, zip_code: form.zip_code,
        profile_type: form.profile_type, services: form.services, skills: form.skills,
        specialty: form.specialty, years_experience: form.years_experience,
        owner_photo_url: form.owner_photo_url, featured_image_url: form.logo_url,
        website_url: form.website_url, instagram_handle: form.instagram_handle, whatsapp_number: form.whatsapp_number,
        description: form.description, level_badge: form.level_badge || "certified_pro",
        is_published: form.is_published ?? true, is_verified: form.is_verified ?? true,
        latitude: coords?.lat ?? null, longitude: coords?.lon ?? null,
      });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); setSaveLoading(false); return; }
    }

    toast({ title: "Guardado", description: `${form.business_name} actualizado correctamente.` });
    setSaveLoading(false);
    onClose();
    onAction();
  };

  const handleApproveReject = async (action: "approve" | "reject") => {
    setActionLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${action === "approve" ? "approve-application" : "reject-application"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ application_id: form.id, ...(action === "reject" ? { reason: rejectReason } : {}) }),
      }
    );
    const result = await res.json();
    if (!res.ok) {
      toast({ title: "Error", description: result.error || "Error", variant: "destructive" });
    } else {
      toast({ title: action === "approve" ? "Aprobada" : "Rechazada", description: `Solicitud de ${form.business_name} procesada.` });
      onClose();
      onAction();
    }
    setActionLoading(false);
  };

  const handleDelete = async () => {
    if (form.source !== "profile") return;
    const { error } = await supabase.from("detailer_profiles").delete().eq("id", form.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Eliminado" });
    onClose();
    onAction();
  };

  return (
    <Dialog open={!!entry} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto z-[9999]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isNew ? "Añadir perfil" : form.business_name}
            {!isNew && (
              <Badge variant={statusLabels[form.status]?.variant || "outline"}>
                {statusLabels[form.status]?.label || form.status}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          {/* FOTO DE PERFIL + LOGO */}
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <Label className="font-semibold flex items-center gap-1"><User className="h-4 w-4" /> Foto de perfil</Label>
              <div className="flex items-center gap-3">
                {form.owner_photo_url ? (
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
                      <img src={form.owner_photo_url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <button onClick={() => updateField("owner_photo_url", null)} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center"><User className="h-8 w-8 text-muted-foreground/40" /></div>
                )}
                <div>
                  <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  <Button variant="outline" size="sm" onClick={() => photoRef.current?.click()} disabled={uploadingPhoto}>
                    {uploadingPhoto ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
                    {form.owner_photo_url ? "Cambiar" : "Subir"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Logo / Imagen destacada</Label>
              <div className="flex items-center gap-3">
                {(form.logo_url || form.featured_image_url) ? (
                  <div className="relative group">
                    <img src={form.logo_url || form.featured_image_url || ""} alt="" className="h-20 w-20 rounded-xl object-cover border border-border" />
                    <button onClick={() => { updateField("logo_url", null); updateField("featured_image_url", null); }} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                  </div>
                ) : (
                  <div className="h-20 w-20 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center"><ImagePlus className="h-8 w-8 text-muted-foreground/40" /></div>
                )}
                <div>
                  <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <Button variant="outline" size="sm" onClick={() => logoRef.current?.click()} disabled={uploadingLogo}>
                    {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
                    Subir
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* GALERÍA */}
          <div className="space-y-2">
            <Label className="font-semibold flex items-center gap-1"><ImagePlus className="h-4 w-4" /> Galería</Label>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {(form.gallery_urls || []).map((url, i) => (
                <div key={i} className="relative group aspect-video">
                  <img src={url} alt="" className="rounded-lg w-full h-full object-cover border border-border" />
                  <button onClick={() => removeGalleryImage(i)} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                </div>
              ))}
              <button onClick={() => galleryRef.current?.click()} disabled={uploadingGallery} className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors cursor-pointer">
                {uploadingGallery ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> : <><ImagePlus className="h-5 w-5 text-muted-foreground/50" /><span className="text-[10px] text-muted-foreground/50">Añadir</span></>}
              </button>
            </div>
            <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
          </div>

          {/* IDENTIDAD Y CONTACTO */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 border-b pb-1">Identidad y contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Nombre del negocio *</Label><Input value={form.business_name} onChange={e => updateField("business_name", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Propietario *</Label><Input value={form.owner_name} onChange={e => updateField("owner_name", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Email *</Label><Input type="email" value={form.email} onChange={e => updateField("email", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Teléfono</Label><Input value={form.phone || ""} onChange={e => updateField("phone", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>WhatsApp</Label><Input value={form.whatsapp_number || ""} onChange={e => updateField("whatsapp_number", e.target.value)} /></div>
              <div className="space-y-1.5">
                <Label>Tipo de perfil</Label>
                <Select value={form.profile_type} onValueChange={v => updateField("profile_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="detailer">Detailer</SelectItem><SelectItem value="centro">Centro</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* UBICACIÓN */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 border-b pb-1">Ubicación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Ciudad *</Label><Input value={form.city} onChange={e => updateField("city", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Provincia *</Label><Input value={form.province} onChange={e => updateField("province", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Dirección</Label><Input value={form.address || ""} onChange={e => updateField("address", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Código postal</Label><Input value={form.zip_code || ""} onChange={e => updateField("zip_code", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Latitud</Label><Input type="number" step="any" value={form.latitude ?? ""} onChange={e => updateField("latitude", e.target.value ? parseFloat(e.target.value) : null)} /></div>
              <div className="space-y-1.5"><Label>Longitud</Label><Input type="number" step="any" value={form.longitude ?? ""} onChange={e => updateField("longitude", e.target.value ? parseFloat(e.target.value) : null)} /></div>
            </div>
          </div>

          {/* ESPECIALIZACIÓN */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 border-b pb-1">Especialización</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Especialidad</Label><Input value={form.specialty || ""} onChange={e => updateField("specialty", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Años de experiencia</Label><Input type="number" value={form.years_experience ?? ""} onChange={e => updateField("years_experience", e.target.value ? parseInt(e.target.value) : null)} /></div>
              <div className="space-y-1.5">
                <Label>Nivel de experiencia</Label>
                <Select value={form.experience_level || ""} onValueChange={v => updateField("experience_level", v)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                    <SelectItem value="experto">Experto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>URL Portfolio</Label><Input value={form.portfolio_url || ""} onChange={e => updateField("portfolio_url", e.target.value)} /></div>
              <div className="space-y-1.5 md:col-span-2"><Label>Servicios (separados por coma)</Label><Input value={(form.services || []).join(", ")} onChange={e => updateField("services", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} /></div>
              <div className="space-y-1.5 md:col-span-2"><Label>Marcas (separadas por coma)</Label><Input value={(form.brands || []).join(", ")} onChange={e => updateField("brands", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} /></div>
              <div className="space-y-1.5 md:col-span-2"><Label>Habilidades técnicas (separadas por coma)</Label><Input value={(form.skills || []).join(", ")} onChange={e => updateField("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} /></div>
            </div>
          </div>

          {/* CONFIANZA */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 border-b pb-1">Confianza y web</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3"><Switch checked={form.has_taken_course ?? false} onCheckedChange={v => updateField("has_taken_course", v)} /><Label>Alumno de la Academia</Label></div>
              {form.has_taken_course && <div className="space-y-1.5"><Label>Nombre del curso</Label><Input value={form.course_name || ""} onChange={e => updateField("course_name", e.target.value)} /></div>}
              <div className="flex items-center gap-3"><Switch checked={form.has_insurance ?? false} onCheckedChange={v => updateField("has_insurance", v)} /><Label>Seguro RC</Label></div>
              <div className="space-y-1.5"><Label>Web</Label><Input value={form.website_url || ""} onChange={e => updateField("website_url", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Instagram</Label><Input value={form.instagram_handle || ""} onChange={e => updateField("instagram_handle", e.target.value)} placeholder="@usuario" /></div>
            </div>
          </div>

          {/* TEXTOS */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 border-b pb-1">Textos</h3>
            <div className="space-y-4">
              <div className="space-y-1.5"><Label>Descripción / Bio</Label><Textarea value={form.description || ""} onChange={e => updateField("description", e.target.value)} rows={3} /></div>
              <div className="space-y-1.5"><Label>Propuesta de valor</Label><Textarea value={form.value_proposition || ""} onChange={e => updateField("value_proposition", e.target.value)} rows={2} /></div>
              <div className="space-y-1.5"><Label>Mensaje</Label><Textarea value={form.message || ""} onChange={e => updateField("message", e.target.value)} rows={2} /></div>
            </div>
          </div>

          {/* ADMIN (solo para perfiles activos o nuevos) */}
          {(form.source === "profile" || isNew) && (
            <div>
              <h3 className="font-semibold text-foreground mb-3 border-b pb-1">Configuración admin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Rango</Label>
                  <Select value={form.level_badge || "certified_pro"} onValueChange={v => updateField("level_badge", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Miembro</SelectItem>
                      <SelectItem value="certified_pro">Certificado Pro</SelectItem>
                      <SelectItem value="master_detailer">Master Detailer</SelectItem>
                      <SelectItem value="elite_detailer">Élite Detailer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2"><Switch checked={form.is_published ?? true} onCheckedChange={v => updateField("is_published", v)} /><Label>{form.is_published ? "Publicado" : "Borrador"}</Label></div>
                  <div className="flex items-center gap-2"><Switch checked={form.is_verified ?? false} onCheckedChange={v => updateField("is_verified", v)} /><Label>Verificado</Label></div>
                </div>
              </div>
            </div>
          )}

          {/* APPROVE / REJECT for pending */}
          {!isNew && form.source === "application" && form.status === "pending" && (
            <div className="space-y-3 pt-2 border-t">
              <Textarea placeholder="Motivo de rechazo (requerido para rechazar)" value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 flex-wrap">
          {/* Delete for active profiles */}
          {!isNew && form.source === "profile" && (
            deleteConfirm ? (
              <div className="flex items-center gap-2 mr-auto">
                <span className="text-xs text-destructive">¿Seguro?</span>
                <Button variant="destructive" size="sm" onClick={handleDelete}><Trash2 className="h-4 w-4 mr-1" /> Sí, eliminar</Button>
                <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(false)}>No</Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(true)} className="mr-auto text-destructive hover:text-destructive"><Trash2 className="h-4 w-4 mr-1" /> Eliminar</Button>
            )
          )}

          {/* Approve/Reject buttons for pending */}
          {!isNew && form.source === "application" && form.status === "pending" && (
            <>
              <Button variant="destructive" onClick={() => handleApproveReject("reject")} disabled={actionLoading || !rejectReason}>
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-1" />} Rechazar
              </Button>
              <Button onClick={() => handleApproveReject("approve")} disabled={actionLoading}>
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-1" />} Aprobar
              </Button>
            </>
          )}

          {/* Re-approve for rejected */}
          {!isNew && form.source === "application" && form.status === "rejected" && (
            <Button onClick={() => handleApproveReject("approve")} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-1" />} Re-aprobar
            </Button>
          )}

          {/* Save button always visible */}
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saveLoading || !form.business_name || !form.email || !form.city || !form.province}>
            {saveLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
            {isNew ? "Crear perfil" : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProfileEditModal;
