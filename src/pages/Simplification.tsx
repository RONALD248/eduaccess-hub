import { useState } from "react";
import { FileText, ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

const Simplification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sourceText, setSourceText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [level, setLevel] = useState([2]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleText = "The implementation of comprehensive educational frameworks necessitates the systematic integration of pedagogical methodologies with contemporary technological infrastructure, thereby facilitating enhanced knowledge acquisition and cognitive development among diverse student populations.";

  const levelNames = ["Basic", "Intermediate", "Advanced"];

  const handleSimplify = async () => {
    const textToSimplify = sourceText || sampleText;
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const simplifications = [
      "Using complete education systems means combining teaching methods with modern technology. This helps different types of students learn better and develop their thinking skills.",
      "Implementing comprehensive educational frameworks requires integrating teaching methods with modern technology infrastructure. This enables better learning and cognitive development for diverse students.",
      "The implementation of comprehensive educational frameworks necessitates integrating pedagogical methodologies with contemporary technology, facilitating enhanced knowledge acquisition among diverse student populations.",
    ];
    
    setSimplifiedText(simplifications[level[0] - 1]);
    setIsProcessing(false);
    
    toast({
      title: "Simplification complete",
      description: `Simplified to ${levelNames[level[0] - 1]} level`,
    });
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
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <FileText className="text-secondary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Text Simplification</h1>
              <p className="text-muted-foreground">Simplify complex text for better readability</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <label className="block text-sm font-medium mb-2">Original Text</label>
            <Textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={sampleText}
              className="min-h-[300px] text-base leading-relaxed"
            />
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <label className="block text-sm font-medium mb-2">Simplified Text</label>
            <Textarea
              value={simplifiedText}
              readOnly
              placeholder="Simplified text will appear here..."
              className="min-h-[300px] text-base leading-relaxed bg-muted/30"
            />
          </div>
        </div>

        <div className="mt-6 bg-card rounded-2xl p-6 shadow-elegant border border-border">
          <label className="block text-sm font-medium mb-4">
            Simplification Level: {levelNames[level[0] - 1]}
          </label>
          <Slider
            value={level}
            onValueChange={setLevel}
            min={1}
            max={3}
            step={1}
            className="mb-6"
          />
          <div className="flex gap-4 text-xs text-muted-foreground justify-between">
            <span>Basic (Elementary)</span>
            <span>Intermediate (Middle School)</span>
            <span>Advanced (High School)</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSimplify}
            disabled={isProcessing}
            size="lg"
            className="bg-secondary hover:bg-secondary-hover"
          >
            {isProcessing ? "Simplifying..." : "Simplify Text"}
            <Sparkles size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Simplification;
