import { GraduationCap, Globe, Volume2, FileText, Mic, Image, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30 gradient-mesh" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 animate-float">
          <GraduationCap size={100} className="text-white drop-shadow-2xl" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1.5s" }}>
          <BookOpen size={80} className="text-white/90 drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: "3s" }}>
          <Globe size={90} className="text-white/80 drop-shadow-2xl" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-float" style={{ animationDelay: "4.5s" }}>
          <Volume2 size={70} className="text-white/70 drop-shadow-2xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with glass effect */}
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8 border border-white/30 animate-fade-in-up shadow-glow">
            <GraduationCap className="text-white" size={24} />
            <span className="text-sm font-semibold text-white">Supporting UN SDG 4 - Quality Education</span>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up font-heading" style={{ animationDelay: "0.1s" }}>
            <span className="text-white drop-shadow-2xl">Making Education</span>
            <span className="block bg-gradient-to-r from-white via-secondary to-accent bg-clip-text text-transparent mt-3 animate-shimmer" 
                  style={{ backgroundSize: "200% auto" }}>
              Accessible for All
            </span>
          </h1>

          {/* Description with glass effect */}
          <p className="text-lg md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-medium drop-shadow-lg" 
             style={{ animationDelay: "0.2s" }}>
            Transform educational content into multiple accessible formats with AI-powered tools. 
            Text-to-speech, translation, simplification, and more.
          </p>

          {/* CTA Buttons with modern styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-glow hover-lift border-2 border-white/50"
            >
              Explore Tools
              <FileText className="ml-2" size={24} />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToTools}
              className="glass border-2 border-white/50 hover:bg-white/20 text-white font-bold text-lg px-8 py-6 shadow-lg hover-lift"
            >
              Learn More
              <BookOpen className="ml-2" size={24} />
            </Button>
          </div>

          {/* Feature highlights with glass cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Volume2, label: "Text-to-Speech", delay: "0.5s" },
              { icon: Globe, label: "Translation", delay: "0.6s" },
              { icon: FileText, label: "Simplification", delay: "0.7s" },
              { icon: Mic, label: "Voice Recording", delay: "0.8s" },
            ].map((feature) => (
              <div 
                key={feature.label}
                className="glass rounded-2xl p-6 border border-white/30 hover:border-white/50 hover-lift shadow-lg animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <feature.icon className="mx-auto mb-3 text-white drop-shadow-lg" size={40} />
                <p className="text-sm font-semibold text-white drop-shadow">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1200 120" className="w-full h-auto text-background" preserveAspectRatio="none">
          <path
            d="M0,0 C300,100 600,100 900,50 C1050,25 1150,0 1200,0 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
