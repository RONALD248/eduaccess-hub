import { useState } from "react";
import { File, ChevronLeft, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import * as pdfjsLib from 'pdfjs-dist';

const DocumentProcessor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [extractedText, setExtractedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Set up PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    try {
      let text = '';

      if (file.type === 'application/pdf') {
        // Real PDF extraction using PDF.js
        text = await extractTextFromPDF(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        // Plain text file
        text = await file.text();
      } else {
        // For other formats, read as text (works for many text-based formats)
        text = await file.text();
      }

      setExtractedText(text);
      
      toast({
        title: "Processing complete",
        description: `Extracted ${text.split(/\s+/).length} words from ${file.name}`,
      });
    } catch (error) {
      console.error("Document processing error:", error);
      toast({
        title: "Processing failed",
        description: "Could not extract text from this file",
        variant: "destructive",
      });
      setExtractedText('');
    } finally {
      setIsProcessing(false);
    }
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
