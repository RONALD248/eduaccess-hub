import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, level } = await req.json();
    
    if (!text || level === undefined) {
      throw new Error("Missing required parameters: text and level");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const levelDescriptions = {
      1: "elementary school level (ages 8-10). Use very simple words, short sentences, and basic concepts.",
      2: "middle school level (ages 11-14). Use clear language, moderate complexity, and well-explained concepts.",
      3: "high school level (ages 15-18). Maintain academic language but improve clarity and structure.",
    };

    const levelDescription = levelDescriptions[level as keyof typeof levelDescriptions] || levelDescriptions[2];

    console.log(`Simplifying text to level ${level}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an educational content simplification expert. Simplify the given text to ${levelDescription}. Maintain the core educational message and accuracy while making it more accessible. Only return the simplified text, nothing else.`,
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`Simplification failed: ${response.status}`);
    }

    const data = await response.json();
    const simplifiedText = data.choices[0].message.content;

    console.log("Simplification successful");

    return new Response(
      JSON.stringify({ simplifiedText }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in simplify-text function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
