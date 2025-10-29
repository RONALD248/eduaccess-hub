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
    primary: "text-primary hover:bg-primary/5 border-primary/20",
    secondary: "text-secondary hover:bg-secondary/5 border-secondary/20",
    accent: "text-accent hover:bg-accent/5 border-accent/20",
  };

  const iconBgClasses = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    accent: "bg-accent/10",
  };

  return (
    <div className={cn(
      "group bg-card rounded-2xl p-6 border-2 transition-smooth hover:scale-105 shadow-md hover:shadow-elegant cursor-pointer",
      colorClasses[color]
    )}
    onClick={() => navigate(path)}
    >
      {/* Icon */}
      <div className={cn(
        "w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-smooth group-hover:scale-110",
        iconBgClasses[color]
      )}>
        <Icon size={32} className={cn("transition-smooth", color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-accent")} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>

      {/* CTA */}
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-center font-medium transition-smooth",
          color === "primary" && "hover:bg-primary/10 hover:text-primary",
          color === "secondary" && "hover:bg-secondary/10 hover:text-secondary",
          color === "accent" && "hover:bg-accent/10 hover:text-accent"
        )}
      >
        Try Tool →
      </Button>
    </div>
  );
};
