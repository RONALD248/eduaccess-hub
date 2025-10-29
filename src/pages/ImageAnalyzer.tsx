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

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsProcessing(true);

    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockOCR = `Chapter 5: Sustainable Education

The Role of Technology in Education

Educational technology has revolutionized the way we approach learning and teaching. Digital platforms provide unprecedented access to knowledge and resources.

Key Benefits:
1. Enhanced accessibility for remote learners
2. Personalized learning experiences
3. Real-time feedback and assessment
4. Collaborative learning opportunities

"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela

Implementation Strategies:
• Integrate technology gradually
• Provide adequate training for educators
• Ensure equitable access to resources
• Monitor and evaluate effectiveness

The future of education lies in our ability to leverage technology while maintaining the human elements that make learning meaningful and transformative.`;

    setExtractedText(mockOCR);
    setIsProcessing(false);
    
    toast({
      title: "Analysis complete",
      description: "Text extracted from image successfully",
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
