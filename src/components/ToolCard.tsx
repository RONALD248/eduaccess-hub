import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent";
  path: string;
}

export const ToolCard = ({ icon: Icon, title, description, color, path }: ToolCardProps) => {
  const navigate = useNavigate();

  const colorClasses = {
    primary: "hover:border-primary/50 group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-primary/30",
    secondary: "hover:border-secondary/50 group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-secondary/30",
    accent: "hover:border-accent/50 group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-accent/30",
  };

  const iconBgClasses = {
    primary: "bg-gradient-to-br from-primary to-primary/70",
    secondary: "bg-gradient-to-br from-secondary to-secondary/70",
    accent: "bg-gradient-to-br from-accent to-accent/70",
  };

  return (
    <div className={cn(
      "group relative bg-card rounded-3xl p-8 border-2 border-border transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden shadow-lg",
      colorClasses[color]
    )}
    onClick={() => navigate(path)}
    >
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500",
        color === "primary" && "gradient-primary",
        color === "secondary" && "gradient-secondary",
        color === "accent" && "gradient-accent"
      )} />

      {/* Icon with gradient background */}
      <div className={cn(
        "relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg",
        iconBgClasses[color]
      )}>
        <Icon size={40} className="text-white drop-shadow-lg" />
        
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500",
          iconBgClasses[color]
        )} />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3 text-card-foreground font-heading group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 leading-relaxed text-base">
        {description}
      </p>

      {/* CTA with animated arrow */}
      <div className="flex items-center gap-2 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
        <span className={cn(
          "transition-colors duration-300",
          color === "primary" && "text-primary",
          color === "secondary" && "text-secondary",
          color === "accent" && "text-accent"
        )}>
          Try Tool
        </span>
        <span className={cn(
          "transition-all duration-300 group-hover:translate-x-1",
          color === "primary" && "text-primary",
          color === "secondary" && "text-secondary",
          color === "accent" && "text-accent"
        )}>
          →
        </span>
      </div>
    </div>
  );
};
