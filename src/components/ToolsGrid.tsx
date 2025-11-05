import { Volume2, Globe, FileText, Mic, File, Image, BarChart3, MessageCircle } from "lucide-react";
import { ToolCard } from "./ToolCard";

export const ToolsGrid = () => {
  const tools: Array<{
    icon: typeof Volume2;
    title: string;
    description: string;
    color: "primary" | "secondary" | "accent";
    path: string;
  }> = [
    {
      icon: Volume2,
      title: "Text-to-Speech",
      description: "Convert educational text into natural-sounding audio with voice selection and playback controls.",
      color: "primary",
      path: "/text-to-speech",
    },
    {
      icon: Globe,
      title: "Translation",
      description: "Translate educational content into 15+ languages while preserving context and meaning.",
      color: "accent",
      path: "/translation",
    },
    {
      icon: FileText,
      title: "Text Simplification",
      description: "Simplify complex educational text to improve readability for diverse learning needs.",
      color: "secondary",
      path: "/simplification",
    },
    {
      icon: Mic,
      title: "Voice Recording",
      description: "Record educational speech and get real-time transcription with live statistics.",
      color: "primary",
      path: "/voice-recorder",
    },
    {
      icon: File,
      title: "Document Processing",
      description: "Extract and process text from PDF files, Word documents, and other formats.",
      color: "accent",
      path: "/document-processor",
    },
    {
      icon: Image,
      title: "Image Analysis",
      description: "Extract text from educational images, textbook pages, and handwritten notes using OCR.",
      color: "secondary",
      path: "/image-analyzer",
    },
    {
      icon: BarChart3,
      title: "Readability Analysis",
      description: "Analyze text readability with detailed statistics and educational metrics.",
      color: "primary",
      path: "/readability",
    },
    {
      icon: MessageCircle,
      title: "AI Assistant",
      description: "Chat with an intelligent AI assistant for educational help and instant answers.",
      color: "accent",
      path: "/ai-chatbot",
    },
  ];

  return (
    <section id="tools" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Accessibility Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive suite of AI-powered tools to transform educational content into accessible formats
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ToolCard {...tool} />
            </div>
          ))}
        </div>

        {/* Additional info with gradient cards */}
        <div className="mt-24 grid md:grid-cols-3 gap-6 animate-fade-in-up">
          <div className="relative group overflow-hidden rounded-3xl p-8 text-center shadow-lg hover-lift border-2 border-border">
            <div className="absolute inset-0 gradient-primary opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-heading">8+</div>
              <p className="text-muted-foreground font-medium">Accessibility Tools</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-3xl p-8 text-center shadow-lg hover-lift border-2 border-border">
            <div className="absolute inset-0 gradient-secondary opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent font-heading">15+</div>
              <p className="text-muted-foreground font-medium">Supported Languages</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-3xl p-8 text-center shadow-lg hover-lift border-2 border-border">
            <div className="absolute inset-0 gradient-accent opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent font-heading">100%</div>
              <p className="text-muted-foreground font-medium">WCAG 2.1 Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
