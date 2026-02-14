import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function geocode(city: string, province: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const query = encodeURIComponent(`${city}, ${province}, España`);
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
      headers: { "User-Agent": "AcademiaDetail/1.0" },
    });
    const data = await res.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
  } catch (e) {
    console.error("Geocoding failed:", e);
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) throw new Error("Not authenticated");

    const admin = createClient(supabaseUrl, serviceKey);

    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) throw new Error("Not an admin");

    const { application_id } = await req.json();
    if (!application_id) throw new Error("Missing application_id");

    const { data: app, error: appError } = await admin.from("directory_applications").select("*").eq("id", application_id).single();
    if (appError || !app) throw new Error("Application not found");

    // Generate slug
    const slug = app.business_name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);

    // Geocode city/province
    const coords = await geocode(app.city, app.province);

    // Create detailer profile with ALL fields from application
    const { data: newProfile, error: profileError } = await admin.from("detailer_profiles").insert({
      business_name: app.business_name,
      slug,
      owner_name: app.owner_name,
      email: app.email,
      phone: app.phone,
      city: app.city,
      province: app.province,
      address: app.address || null,
      zip_code: app.zip_code || null,
      services: app.services || [],
      skills: app.skills || [],
      profile_type: app.profile_type || "detailer",
      level_badge: "certified_pro",
      is_published: true,
      is_verified: true,
      featured_image_url: app.logo_url,
      owner_photo_url: app.owner_photo_url || null,
      description: app.description || app.value_proposition,
      specialty: app.specialty || null,
      years_experience: app.years_experience || null,
      website_url: app.website_url || null,
      instagram_handle: app.instagram_handle || null,
      whatsapp_number: app.whatsapp_number || null,
      latitude: coords?.lat ?? null,
      longitude: coords?.lon ?? null,
    }).select("id").single();
    if (profileError) throw new Error("Failed to create profile: " + profileError.message);

    // Migrate gallery_urls to portfolio_images
    if (newProfile?.id && app.gallery_urls && app.gallery_urls.length > 0) {
      await admin.from("portfolio_images").insert(
        app.gallery_urls.map((url: string) => ({
          detailer_id: newProfile.id,
          after_image_url: url,
          title: null,
        }))
      );
    }

    // Update application status
    await admin.from("directory_applications").update({ status: "approved" }).eq("id", application_id);

    // Log
    await admin.from("directory_application_logs").insert({
      application_id,
      admin_id: user.id,
      action: "approved",
    });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
