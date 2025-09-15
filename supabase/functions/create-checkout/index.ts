import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

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
    console.log("Function started");
    
    // Parse request body
    const body = await req.json();
    console.log("Request body:", body);
    
    const { priceId, plan } = body || {};
    console.log("Parsed params:", { priceId, plan });

    // Check for Stripe secret key
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    console.log("Initializing Stripe...");
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    console.log("Resolving price...");
    let effectivePriceId = priceId;
    if (!effectivePriceId && plan === "test") {
      const testPriceId = Deno.env.get("STRIPE_TEST_PRICE_ID");
      if (!testPriceId) {
        throw new Error("STRIPE_TEST_PRICE_ID not configured");
      }
      effectivePriceId = testPriceId;
      console.log("Using STRIPE_TEST_PRICE_ID:", effectivePriceId);
    }
    if (!effectivePriceId) {
      throw new Error("Price ID is required");
    }

    console.log("Creating checkout session...");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: effectivePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: "dni_nif",
          label: {
            type: "custom",
            custom: "DNI/NIF"
          },
          type: "text",
          text: {
            minimum_length: 8,
            maximum_length: 12,
          },
        }
      ],
      locale: "es",
    });

    console.log("Session created successfully:", session.id);
    
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("Error in create-checkout:", error);
    
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