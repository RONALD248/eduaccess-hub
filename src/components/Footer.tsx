import { GraduationCap, Heart, Globe, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="text-primary" size={24} />
              </div>
              <span className="font-bold text-xl">EduAccess Hub</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Making education accessible for everyone, supporting UN Sustainable Development Goal 4.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/install")}
              className="gap-2"
            >
              <Download size={16} />
              Install App
            </Button>
          </div>

          {/* Mission */}
          <div>
            <h4 className="font-semibold mb-4">Our Mission</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To break down barriers in education by providing tools that transform content into accessible formats for diverse learning needs.
            </p>
          </div>

          {/* Impact */}
          <div>
            <h4 className="font-semibold mb-4">Global Impact</h4>
            <div className="flex items-start gap-2 text-muted-foreground text-sm mb-2">
              <Globe size={16} className="mt-1 text-accent" />
              <span>Supporting students worldwide</span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground text-sm">
              <Heart size={16} className="mt-1 text-secondary" />
              <span>Free and accessible for all</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 EduAccess Hub. Built with passion for inclusive education.</p>
          <p className="mt-2">
            Powered by modern web technologies • WCAG 2.1 AA Compliant
          </p>
        </div>
      </div>
    </footer>
  );
};
