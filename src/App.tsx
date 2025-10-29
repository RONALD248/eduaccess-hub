import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TextToSpeech from "./pages/TextToSpeech";
import Translation from "./pages/Translation";
import Simplification from "./pages/Simplification";
import VoiceRecorder from "./pages/VoiceRecorder";
import DocumentProcessor from "./pages/DocumentProcessor";
import ImageAnalyzer from "./pages/ImageAnalyzer";
import Readability from "./pages/Readability";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/translation" element={<Translation />} />
          <Route path="/simplification" element={<Simplification />} />
          <Route path="/voice-recorder" element={<VoiceRecorder />} />
          <Route path="/document-processor" element={<DocumentProcessor />} />
          <Route path="/image-analyzer" element={<ImageAnalyzer />} />
          <Route path="/readability" element={<Readability />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
