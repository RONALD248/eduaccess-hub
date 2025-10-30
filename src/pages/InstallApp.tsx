import { useState, useEffect } from "react";
import { Download, ChevronLeft, Smartphone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const InstallApp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      toast({
        title: "App installed!",
        description: "EduAccess Hub has been added to your home screen",
      });
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Installation not available",
        description: "Please use your browser's menu to install this app",
        variant: "destructive",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast({
        title: "Installing...",
        description: "EduAccess Hub is being installed",
      });
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
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
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Smartphone className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Install EduAccess Hub</h1>
              <p className="text-muted-foreground">Use our app like a native mobile app</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Installation Card */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
            {isInstalled ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Check className="text-green-600 dark:text-green-400" size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">App Already Installed!</h2>
                <p className="text-muted-foreground mb-6">
                  EduAccess Hub is already installed on your device
                </p>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-primary hover:bg-primary-hover"
                >
                  Go to App
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img src="/icon-192.png" alt="EduAccess Hub" className="w-full h-full rounded-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Install EduAccess Hub</h2>
                  <p className="text-muted-foreground">
                    Get the full app experience on your phone or tablet
                  </p>
                </div>

                {isInstallable ? (
                  <Button
                    onClick={handleInstallClick}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-hover mb-6"
                  >
                    <Download size={20} className="mr-2" />
                    Install App
                  </Button>
                ) : (
                  <div className="bg-muted/30 rounded-lg p-6 mb-6">
                    <p className="font-medium mb-2">Manual Installation:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>iPhone/iPad:</strong> Tap the Share button, then "Add to Home Screen"</li>
                      <li><strong>Android (Chrome):</strong> Tap the menu (⋮), then "Install app" or "Add to Home screen"</li>
                      <li><strong>Android (Samsung):</strong> Tap the menu, then "Add page to" → "Home screen"</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Benefits */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
            <h3 className="text-xl font-bold mb-6">Benefits of Installing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium">Works Offline</p>
                  <p className="text-sm text-muted-foreground">Access tools without internet</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="text-accent" size={20} />
                </div>
                <div>
                  <p className="font-medium">Fast Loading</p>
                  <p className="text-sm text-muted-foreground">Instant startup time</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="text-secondary" size={20} />
                </div>
                <div>
                  <p className="font-medium">Home Screen Access</p>
                  <p className="text-sm text-muted-foreground">Launch like any other app</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium">Auto Updates</p>
                  <p className="text-sm text-muted-foreground">Always get latest features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallApp;
