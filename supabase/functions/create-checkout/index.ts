import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { priceId } = await req.json();
    
    if (!priceId) {
      throw new Error("Price ID is required");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create checkout session for guest users
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
      // Collect customer information
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
        },
        {
          key: "factura",
          label: {
            type: "custom", 
            custom: "¿Necesita factura?"
          },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: "Sí, necesito factura",
                value: "si"
              },
              {
                label: "No necesito factura",
                value: "no"
              }
            ]
          },
        }
      ],
      locale: "es",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});