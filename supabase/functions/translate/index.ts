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
    const { text, targetLang } = await req.json();
    
    if (!text || !targetLang) {
      throw new Error("Missing required parameters: text and targetLang");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const languageNames: Record<string, string> = {
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      zh: "Chinese",
      ja: "Japanese",
      ko: "Korean",
      ar: "Arabic",
      hi: "Hindi",
      sw: "Swahili",
    };

    const targetLanguage = languageNames[targetLang] || targetLang;

    console.log(`Translating text to ${targetLanguage}`);

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
            content: `You are a professional translator. Translate the given text to ${targetLanguage}. Maintain the tone, context, and educational content. Only return the translated text, nothing else.`,
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
      throw new Error(`Translation failed: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.choices[0].message.content;

    console.log("Translation successful");

    return new Response(
      JSON.stringify({ translatedText }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in translate function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
