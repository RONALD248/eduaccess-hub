import { GraduationCap, Globe, Volume2, FileText, Mic, Image, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-float">
          <GraduationCap size={80} className="text-secondary" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
          <BookOpen size={60} className="text-accent" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: "2s" }}>
          <Globe size={70} className="text-secondary" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/40 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-secondary/20 animate-fade-in-up">
            <GraduationCap className="text-secondary" size={20} />
            <span className="text-sm font-medium text-card-foreground">Supporting UN SDG 4 - Quality Education</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Making Education
            <span className="block text-secondary mt-2">Accessible for All</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Transform educational content into multiple accessible formats. Text-to-speech, translation, 
            simplification, and more - all in one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold shadow-elegant transition-smooth"
            >
              Explore Tools
              <FileText className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToTools}
              className="bg-card/40 backdrop-blur-sm border-2 border-secondary/50 hover:bg-card/60 text-card-foreground font-semibold transition-smooth"
            >
              Learn More
              <BookOpen className="ml-2" size={20} />
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Volume2, label: "Text-to-Speech" },
              { icon: Globe, label: "Translation" },
              { icon: FileText, label: "Simplification" },
              { icon: Mic, label: "Voice Recording" },
            ].map((feature, index) => (
              <div 
                key={feature.label}
                className="bg-card/40 backdrop-blur-sm rounded-xl p-4 border border-secondary/20 hover:border-secondary/40 transition-smooth hover:scale-105"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <feature.icon className="mx-auto mb-2 text-secondary" size={32} />
                <p className="text-sm font-medium text-card-foreground">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto text-background">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
