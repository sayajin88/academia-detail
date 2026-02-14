import { useState, useEffect } from "react";
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
import { CheckCircle, XCircle, Loader2, Save, Pencil } from "lucide-react";

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

    // If approved, also sync changes to the published detailer_profiles
    if (form.status === "approved") {
      const { error: profileError } = await supabase
        .from("detailer_profiles")
        .update({
          business_name: form.business_name,
          owner_name: form.owner_name,
          email: form.email,
          phone: form.phone,
          city: form.city,
          province: form.province,
          profile_type: form.profile_type,
          services: form.services,
        })
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
          {form.logo_url && (
            <img src={form.logo_url} alt="Logo" className="h-16 w-16 rounded-lg object-cover" />
          )}

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

          {form.gallery_urls && form.gallery_urls.length > 0 && (
            <div>
              <span className="text-muted-foreground">Galería:</span>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {form.gallery_urls.map((url, i) => (
                  <img key={i} src={url} alt={`Foto ${i + 1}`} className="rounded-lg aspect-video object-cover" />
                ))}
              </div>
            </div>
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
