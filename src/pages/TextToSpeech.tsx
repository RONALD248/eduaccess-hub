import { useState, useRef } from "react";
import { Volume2, Play, Pause, Square, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TextToSpeech = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voice, setVoice] = useState("0");
  const [rate, setRate] = useState([1]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const sampleText = `Education is the foundation of sustainable development. By making educational content accessible to all learners, regardless of their abilities or circumstances, we create opportunities for everyone to reach their full potential. This text-to-speech tool helps break down barriers by converting written educational materials into audio format.`;

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text || sampleText);
      const voices = window.speechSynthesis.getVoices();
      
      if (voices[parseInt(voice)]) {
        utterance.voice = voices[parseInt(voice)];
      }
      
      utterance.rate = rate[0];
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Playing audio",
        description: "Text-to-speech conversion started",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Not supported",
        description: "Text-to-speech is not supported in your browser",
      });
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen gradient-subtle py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
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
              <Volume2 className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Text-to-Speech</h1>
              <p className="text-muted-foreground">Convert educational text to natural audio</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border space-y-6">
          {/* Text input */}
          <div>
            <label className="block text-sm font-medium mb-2">Educational Text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={sampleText}
              className="min-h-[200px] text-base leading-relaxed"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {text.length > 0 ? `${text.split(/\s+/).filter(Boolean).length} words` : "Enter text or use sample"}
            </p>
          </div>

          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Voice Selection</label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {window.speechSynthesis.getVoices().map((v, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {v.name} ({v.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Speed: {rate[0]}x
              </label>
              <Slider
                value={rate}
                onValueChange={setRate}
                min={0.5}
                max={2}
                step={0.1}
                className="mt-4"
              />
            </div>
          </div>

          {/* Playback controls */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSpeak}
              disabled={isPlaying && !isPaused}
              className="flex-1 bg-primary hover:bg-primary-hover"
            >
              <Play size={20} className="mr-2" />
              {isPaused ? "Resume" : "Play"}
            </Button>
            <Button
              onClick={handlePause}
              disabled={!isPlaying}
              variant="outline"
              className="flex-1"
            >
              <Pause size={20} className="mr-2" />
              Pause
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              variant="outline"
              className="flex-1"
            >
              <Square size={20} className="mr-2" />
              Stop
            </Button>
          </div>

          {/* Status */}
          {isPlaying && (
            <div className="bg-primary/10 text-primary px-4 py-3 rounded-lg text-center font-medium">
              🔊 Playing audio...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
