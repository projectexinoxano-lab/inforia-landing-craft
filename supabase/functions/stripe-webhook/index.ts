import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Stripe webhook received");
    
    // Get webhook secret and Stripe secret key
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!webhookSecret || !stripeSecretKey) {
      throw new Error("Missing required environment variables");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Get the signature from headers
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }

    // Get raw body
    const body = await req.text();
    console.log("Raw body received, length:", body.length);

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("Webhook signature verified successfully");
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log("Processing event:", event.type);

    // Only process checkout.session.completed events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Processing checkout session:", session.id);

      // Expand the session to get customer details
      const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['customer', 'line_items']
      });

      console.log("Session expanded, customer details:", {
        email: expandedSession.customer_details?.email,
        name: expandedSession.customer_details?.name,
        phone: expandedSession.customer_details?.phone
      });

      // Extract DNI/NIF from custom fields
      let nifDni = null;
      if (expandedSession.custom_fields) {
        const dniField = expandedSession.custom_fields.find(field => field.key === 'dni_nif');
        if (dniField && dniField.type === 'text') {
          nifDni = dniField.text?.value;
        }
      }

      // Determine plan type based on price ID
      let planType = 'professional'; // default
      if (expandedSession.line_items?.data[0]?.price?.id) {
        const priceId = expandedSession.line_items.data[0].price.id;
        console.log("Price ID:", priceId);
        
        // Map price IDs to plan types (adjust according to your actual price IDs)
        if (priceId === Deno.env.get("STRIPE_CLINIC_PRICE_ID")) {
          planType = 'clinic';
        } else if (priceId === Deno.env.get("STRIPE_PROFESSIONAL_PRICE_ID")) {
          planType = 'professional';
        }
      }

      // Prepare profile data
      const profileData = {
        id: crypto.randomUUID(),
        email: expandedSession.customer_details?.email,
        full_name: expandedSession.customer_details?.name,
        phone: expandedSession.customer_details?.phone,
        billing_name: expandedSession.customer_details?.name,
        billing_email: expandedSession.customer_details?.email,
        billing_address: expandedSession.customer_details?.address ? 
          [expandedSession.customer_details.address.line1, expandedSession.customer_details.address.line2]
            .filter(Boolean).join(', ') : null,
        billing_city: expandedSession.customer_details?.address?.city,
        billing_postal_code: expandedSession.customer_details?.address?.postal_code,
        billing_country: expandedSession.customer_details?.address?.country,
        nif_dni: nifDni,
        plan_type: planType,
        subscription_status: 'active',
        onboarding_completed: false,
        credits_limit: planType === 'clinic' ? 500 : 100,
        credits_used: 0
      };

      console.log("Profile data prepared:", profileData);

      // Initialize Supabase client
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Missing Supabase environment variables");
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Check if profile already exists with this email
      const { data: existingProfile, error: selectError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', profileData.email)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        console.error("Error checking existing profile:", selectError);
        throw new Error(`Database error: ${selectError.message}`);
      }

      if (existingProfile) {
        console.log("Profile already exists for email:", profileData.email);
        // Update existing profile instead of creating new one
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            plan_type: profileData.plan_type,
            subscription_status: profileData.subscription_status,
            credits_limit: profileData.credits_limit,
            billing_name: profileData.billing_name,
            billing_address: profileData.billing_address,
            billing_city: profileData.billing_city,
            billing_postal_code: profileData.billing_postal_code,
            billing_country: profileData.billing_country,
            nif_dni: profileData.nif_dni,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProfile.id);

        if (updateError) {
          console.error("Error updating profile:", updateError);
          throw new Error(`Failed to update profile: ${updateError.message}`);
        }

        console.log("Profile updated successfully for:", profileData.email);
      } else {
        // Insert new profile
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([profileData]);

        if (insertError) {
          console.error("Error inserting profile:", insertError);
          throw new Error(`Failed to create profile: ${insertError.message}`);
        }

        console.log("Profile created successfully for:", profileData.email);
      }
    } else {
      console.log("Ignoring event type:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});