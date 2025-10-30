import { useState } from "react";
import { Image as ImageIcon, ChevronLeft, Upload, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ImageAnalyzer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [extractedText, setExtractedText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      // Create preview and base64 data
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setImagePreview(imageData);

        // Call edge function for real AI OCR
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-image`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageData }),
          }
        );

        if (!response.ok) {
          throw new Error("Image analysis failed");
        }

        const data = await response.json();
        setExtractedText(data.extractedText);
        
        toast({
          title: "Analysis complete",
          description: "Text extracted from image successfully",
        });
      };
      
      reader.onerror = () => {
        throw new Error("Failed to read image file");
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
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
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <ImageIcon className="text-secondary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Image Analysis</h1>
              <p className="text-muted-foreground">Extract text from images using OCR technology</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <label className="block text-sm font-medium mb-4">Upload Image</label>
            
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary transition-colors mb-4">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isProcessing}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Upload className="text-secondary" size={32} />
                </div>
                <p className="text-lg font-medium mb-2">Click to upload image</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG, or WEBP up to 10MB
                </p>
              </label>
            </div>

            {imagePreview && (
              <div className="rounded-lg overflow-hidden border border-border">
                <img 
                  src={imagePreview} 
                  alt="Uploaded" 
                  className="w-full h-auto"
                />
              </div>
            )}

            {isProcessing && (
              <div className="mt-4 bg-secondary/10 text-secondary px-4 py-3 rounded-lg text-center font-medium flex items-center justify-center gap-2">
                <Scan className="animate-pulse" size={20} />
                Analyzing image...
              </div>
            )}
          </div>

          {/* Extracted Text */}
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <label className="block text-sm font-medium mb-4">Extracted Text</label>
            <Textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              placeholder="Extracted text will appear here..."
              className="min-h-[500px] text-base leading-relaxed"
            />
            {extractedText && (
              <p className="text-sm text-muted-foreground mt-2">
                {extractedText.split(/\s+/).filter(Boolean).length} words extracted
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
