import { useState } from "react";
import { File, ChevronLeft, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DocumentProcessor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [extractedText, setExtractedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockText = `Education and Sustainable Development

This document explores the critical relationship between quality education and sustainable development goals. Education serves as a fundamental catalyst for social progress and economic development.

Key Points:
• Universal access to education is essential for achieving SDG 4
• Quality education empowers individuals and communities
• Educational technology bridges gaps in access and opportunity
• Inclusive education addresses diverse learning needs

The implementation of comprehensive educational frameworks requires systematic integration of pedagogical methodologies with contemporary technological infrastructure. This approach facilitates enhanced knowledge acquisition and cognitive development among diverse student populations.

Conclusion:
Education remains the cornerstone of sustainable development, enabling societies to address complex challenges and build more equitable futures.`;

    setExtractedText(mockText);
    setIsProcessing(false);
    
    toast({
      title: "Processing complete",
      description: `Extracted text from ${file.name}`,
    });
  };

  return (
    <div className="min-h-screen gradient-subtle py-12 px-4">
      <div className="container mx-auto max-w-4xl">
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
              <File className="text-accent" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Document Processing</h1>
              <p className="text-muted-foreground">Extract text from PDF, Word, and text files</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border space-y-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-accent transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              disabled={isProcessing}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Upload className="text-accent" size={32} />
              </div>
              <p className="text-lg font-medium mb-2">Click to upload document</p>
              <p className="text-sm text-muted-foreground">
                Supports PDF, Word, and text files up to 20MB
              </p>
            </label>
          </div>

          {/* File Info */}
          {fileName && (
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <FileText className="text-accent" size={24} />
              <div className="flex-1">
                <p className="font-medium">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {isProcessing ? "Processing..." : "Ready"}
                </p>
              </div>
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && (
            <div>
              <label className="block text-sm font-medium mb-2">Extracted Text</label>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-[400px] text-base leading-relaxed"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {extractedText.split(/\s+/).filter(Boolean).length} words extracted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentProcessor;
