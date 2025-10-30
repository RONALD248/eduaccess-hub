import { useState } from "react";
import { Globe, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Translation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "sw", name: "Swahili", flag: "🇹🇿" },
  ];

  const sampleText = "Education is the most powerful weapon which you can use to change the world. Quality education ensures inclusive and equitable learning opportunities for all.";

  const handleTranslate = async () => {
    const textToTranslate = sourceText || sampleText;
    setIsTranslating(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: textToTranslate,
            targetLang,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
      
      toast({
        title: "Translation complete",
        description: `Translated to ${languages.find(l => l.code === targetLang)?.name}`,
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: "Translation failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen gradient-subtle py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-primary/10"
          >
            <ChevronLeft size={20} />
            Back to Home
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Globe className="text-accent" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Translation</h1>
              <p className="text-muted-foreground">Translate educational content into multiple languages</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Source */}
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">Source Text (English)</label>
              <span className="text-xs text-muted-foreground">
                {(sourceText || sampleText).split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <Textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={sampleText}
              className="min-h-[300px] text-base leading-relaxed"
            />
          </div>

          {/* Target */}
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Target Language</label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="min-h-[300px] text-base leading-relaxed bg-muted/30"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleTranslate}
            disabled={isTranslating}
            size="lg"
            className="bg-accent hover:bg-accent-hover"
          >
            {isTranslating ? "Translating..." : "Translate"}
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Translation;
