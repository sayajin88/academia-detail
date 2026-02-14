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
import { CheckCircle, XCircle, Loader2, Save, Pencil, Upload, X, ImagePlus, User } from "lucide-react";

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

interface ApplicationDetailModalProps {
  application: Application | null;
  onClose: () => void;
  onAction: () => void;
}

const ApplicationDetailModal = ({ application, onClose, onAction }: ApplicationDetailModalProps) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Application | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (application) {
      setForm({ ...application });
      setEditing(false);
      setRejectReason("");
    }
  }, [application]);

  if (!application || !form) return null;

  const updateField = (field: keyof Application, value: any) => {
    setForm(prev => prev ? { ...prev, [field]: value } : null);
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${form!.id}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("directory-uploads").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Error subiendo archivo", description: error.message, variant: "destructive" });
      return null;
    }
    const { data: { publicUrl } } = supabase.storage.from("directory-uploads").getPublicUrl(path);
    return publicUrl;
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    const url = await uploadFile(file, "logos");
    if (url) {
      updateField("logo_url", url);
      // Auto-save to DB
      await supabase.from("directory_applications").update({ logo_url: url }).eq("id", form!.id);
      // Sync to profile if approved
      if (form!.status === "approved") {
        await supabase.from("detailer_profiles").update({ featured_image_url: url }).eq("email", form!.email);
      }
      toast({ title: "Foto de perfil actualizada" });
    }
    setUploadingLogo(false);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "gallery");
      if (url) newUrls.push(url);
    }
    if (newUrls.length > 0) {
      const updated = [...(form!.gallery_urls || []), ...newUrls];
      updateField("gallery_urls", updated);
      await supabase.from("directory_applications").update({ gallery_urls: updated }).eq("id", form!.id);
      toast({ title: `${newUrls.length} foto(s) añadida(s) a la galería` });
    }
    setUploadingGallery(false);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeGalleryImage = async (index: number) => {
    const updated = (form!.gallery_urls || []).filter((_, i) => i !== index);
    updateField("gallery_urls", updated);
    await supabase.from("directory_applications").update({ gallery_urls: updated }).eq("id", form!.id);
    toast({ title: "Foto eliminada de la galería" });
  };

  const handleSave = async () => {
    if (!form) return;
    setSaveLoading(true);

    const updateData = {
      business_name: form.business_name,
      owner_name: form.owner_name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      province: form.province,
      profile_type: form.profile_type,
      services: form.services,
      brands: form.brands,
      has_taken_course: form.has_taken_course,
      has_insurance: form.has_insurance,
      value_proposition: form.value_proposition,
      portfolio_url: form.portfolio_url,
      experience_level: form.experience_level,
      course_name: form.course_name,
      message: form.message,
    };

    const { error } = await supabase
      .from("directory_applications")
      .update(updateData)
      .eq("id", form.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setSaveLoading(false);
      return;
    }

    if (form.status === "approved") {
      const profileUpdate: Record<string, any> = {
        business_name: form.business_name,
        owner_name: form.owner_name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        province: form.province,
        profile_type: form.profile_type,
        services: form.services,
      };

      const cityChanged = form.city !== application.city || form.province !== application.province;
      if (cityChanged) {
        try {
          const query = encodeURIComponent(`${form.city}, ${form.province}, España`);
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
            headers: { "User-Agent": "AcademiaDetail/1.0" },
          });
          const geoData = await geoRes.json();
          if (geoData && geoData.length > 0) {
            profileUpdate.latitude = parseFloat(geoData[0].lat);
            profileUpdate.longitude = parseFloat(geoData[0].lon);
          }
        } catch (e) {
          console.error("Geocoding failed:", e);
        }
      }

      const { error: profileError } = await supabase
        .from("detailer_profiles")
        .update(profileUpdate)
        .eq("email", application.email);

      if (profileError) {
        toast({ title: "Aviso", description: "Solicitud actualizada, pero hubo un error actualizando el perfil publicado.", variant: "destructive" });
        setSaveLoading(false);
        return;
      }
    }

    toast({ title: "Guardado", description: "Solicitud actualizada correctamente." });
    setEditing(false);
    onAction();
    setSaveLoading(false);
  };

  const handleAction = async (action: "approve" | "reject") => {
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
          application_id: form.id,
          ...(action === "reject" ? { reason: rejectReason } : {}),
        }),
      }
    );

    const result = await res.json();
    if (!res.ok) {
      toast({ title: "Error", description: result.error || "Error procesando solicitud", variant: "destructive" });
    } else {
      toast({ title: action === "approve" ? "Aprobada" : "Rechazada", description: `Solicitud de ${form.business_name} ${action === "approve" ? "aprobada" : "rechazada"}.` });
      onClose();
      onAction();
    }
    setActionLoading(false);
  };

  const servicesStr = (form.services || []).join(", ");
  const brandsStr = (form.brands || []).join(", ");

  return (
    <Dialog open={!!application} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {editing ? "Editar solicitud" : form.business_name}
            <Badge variant={statusConfig[form.status]?.variant || "outline"}>
              {statusConfig[form.status]?.label}
            </Badge>
            {!editing && (
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)} className="ml-auto">
                <Pencil className="h-4 w-4 mr-1" /> Editar
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          {/* === PHOTO SECTION === */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <User className="h-4 w-4" /> Foto de perfil
            </Label>
            <div className="flex items-center gap-4">
              {form.logo_url ? (
                <div className="relative group">
                  <img src={form.logo_url} alt="Logo" className="h-20 w-20 rounded-xl object-cover border border-border" />
                  <button
                    onClick={() => { updateField("logo_url", null); supabase.from("directory_applications").update({ logo_url: null }).eq("id", form.id); }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="h-20 w-20 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground/40" />
                </div>
              )}
              <div>
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                <Button variant="outline" size="sm" onClick={() => logoInputRef.current?.click()} disabled={uploadingLogo}>
                  {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
                  {form.logo_url ? "Cambiar foto" : "Subir foto"}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG o WebP. Máx 5 MB.</p>
              </div>
            </div>
          </div>

          {/* === GALLERY SECTION === */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <ImagePlus className="h-4 w-4" /> Galería de fotos
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {(form.gallery_urls || []).map((url, i) => (
                <div key={i} className="relative group aspect-video">
                  <img src={url} alt={`Foto ${i + 1}`} className="rounded-lg w-full h-full object-cover border border-border" />
                  <button
                    onClick={() => removeGalleryImage(i)}
                    className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => galleryInputRef.current?.click()}
                disabled={uploadingGallery}
                className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
              >
                {uploadingGallery ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <ImagePlus className="h-5 w-5 text-muted-foreground/50" />
                    <span className="text-[10px] text-muted-foreground/50">Añadir</span>
                  </>
                )}
              </button>
            </div>
            <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
          </div>

          {/* === EXISTING DATA === */}
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Nombre del negocio</Label>
                <Input value={form.business_name} onChange={e => updateField("business_name", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Propietario</Label>
                <Input value={form.owner_name} onChange={e => updateField("owner_name", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => updateField("email", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Teléfono</Label>
                <Input value={form.phone} onChange={e => updateField("phone", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Ciudad</Label>
                <Input value={form.city} onChange={e => updateField("city", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Provincia</Label>
                <Input value={form.province} onChange={e => updateField("province", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Tipo de perfil</Label>
                <Select value={form.profile_type} onValueChange={v => updateField("profile_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detailer">Detailer</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Nivel de experiencia</Label>
                <Select value={form.experience_level || ""} onValueChange={v => updateField("experience_level", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                    <SelectItem value="experto">Experto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 flex items-center gap-3 pt-6">
                <Switch checked={form.has_taken_course ?? false} onCheckedChange={v => updateField("has_taken_course", v)} />
                <Label>Alumno de la Academia</Label>
              </div>
              {form.has_taken_course && (
                <div className="space-y-1.5">
                  <Label>Nombre del curso</Label>
                  <Input value={form.course_name || ""} onChange={e => updateField("course_name", e.target.value)} />
                </div>
              )}
              <div className="space-y-1.5 flex items-center gap-3 pt-6">
                <Switch checked={form.has_insurance ?? false} onCheckedChange={v => updateField("has_insurance", v)} />
                <Label>Seguro RC</Label>
              </div>
              <div className="space-y-1.5">
                <Label>URL Portfolio</Label>
                <Input value={form.portfolio_url || ""} onChange={e => updateField("portfolio_url", e.target.value)} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Servicios (separados por coma)</Label>
                <Input value={servicesStr} onChange={e => updateField("services", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Marcas (separadas por coma)</Label>
                <Input value={brandsStr} onChange={e => updateField("brands", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Propuesta de valor</Label>
                <Textarea value={form.value_proposition || ""} onChange={e => updateField("value_proposition", e.target.value)} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Mensaje</Label>
                <Textarea value={form.message || ""} onChange={e => updateField("message", e.target.value)} />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Propietario:</span> <p className="font-medium">{form.owner_name}</p></div>
                <div><span className="text-muted-foreground">Email:</span> <p className="font-medium">{form.email}</p></div>
                <div><span className="text-muted-foreground">Teléfono:</span> <p className="font-medium">{form.phone}</p></div>
                <div><span className="text-muted-foreground">Tipo:</span> <p className="font-medium capitalize">{form.profile_type}</p></div>
                <div><span className="text-muted-foreground">Ubicación:</span> <p className="font-medium">{form.city}, {form.province}</p></div>
                <div><span className="text-muted-foreground">Experiencia:</span> <p className="font-medium">{form.experience_level || "—"}</p></div>
                <div><span className="text-muted-foreground">Alumno Academia:</span> <p className="font-medium">{form.has_taken_course ? `Sí (${form.course_name || ""})` : "No"}</p></div>
                <div><span className="text-muted-foreground">Seguro RC:</span> <p className="font-medium">{form.has_insurance ? "Sí" : "No"}</p></div>
              </div>

              {form.services && form.services.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Servicios:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.services.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                </div>
              )}

              {form.brands && form.brands.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Marcas:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.brands.map(b => <Badge key={b} variant="outline">{b}</Badge>)}
                  </div>
                </div>
              )}

              {form.value_proposition && (
                <div><span className="text-muted-foreground">Propuesta de valor:</span><p className="mt-1">{form.value_proposition}</p></div>
              )}
            </>
          )}

          {!editing && form.status === "pending" && (
            <div className="space-y-3 pt-4 border-t">
              <Textarea
                placeholder="Motivo de rechazo (opcional para aprobar, requerido para rechazar)"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => { setForm({ ...application }); setEditing(false); }} disabled={saveLoading}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saveLoading}>
                {saveLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                Guardar cambios
              </Button>
            </>
          ) : form.status === "pending" ? (
            <>
              <Button variant="destructive" onClick={() => handleAction("reject")} disabled={actionLoading || !rejectReason}>
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-1" />}
                Rechazar
              </Button>
              <Button onClick={() => handleAction("approve")} disabled={actionLoading}>
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                Aprobar
              </Button>
            </>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailModal;
