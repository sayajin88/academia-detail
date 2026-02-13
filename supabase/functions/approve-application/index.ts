import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify user
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) throw new Error("Not authenticated");

    // Admin client
    const admin = createClient(supabaseUrl, serviceKey);

    // Check admin role
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) throw new Error("Not an admin");

    const { application_id } = await req.json();
    if (!application_id) throw new Error("Missing application_id");

    // Get application
    const { data: app, error: appError } = await admin.from("directory_applications").select("*").eq("id", application_id).single();
    if (appError || !app) throw new Error("Application not found");

    // Generate slug
    const slug = app.business_name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);

    // Create detailer profile
    const { error: profileError } = await admin.from("detailer_profiles").insert({
      business_name: app.business_name,
      slug,
      owner_name: app.owner_name,
      email: app.email,
      phone: app.phone,
      city: app.city,
      province: app.province,
      services: app.services || [],
      profile_type: app.profile_type || "detailer",
      level_badge: "certified_pro",
      is_published: true,
      is_verified: true,
      featured_image_url: app.logo_url,
      description: app.value_proposition,
    });
    if (profileError) throw new Error("Failed to create profile: " + profileError.message);

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
