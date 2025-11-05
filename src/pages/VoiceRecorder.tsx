import { useState, useRef } from "react";
import { Mic, Square, ChevronLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VoiceRecorder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const startRecording = async () => {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        variant: "destructive",
        title: "Not supported",
        description: "Speech recognition is not supported in your browser. Try Chrome or Safari.",
      });
      return;
    }

    // Request microphone permission first (especially important for mobile)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice recording",
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    // Mobile-specific settings
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        }
      }
      
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      let errorMessage = "An error occurred during recording";
      if (event.error === 'no-speech') {
        errorMessage = "No speech detected. Please try again.";
      } else if (event.error === 'audio-capture') {
        errorMessage = "Microphone not found or accessible";
      } else if (event.error === 'not-allowed') {
        errorMessage = "Microphone permission denied";
      }
      
      toast({
        variant: "destructive",
        title: "Recording error",
        description: errorMessage,
      });
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      toast({
        variant: "destructive",
        title: "Failed to start recording",
        description: "Please try again",
      });
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Transcription complete",
      });
    }
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    words: transcript.split(/\s+/).filter(Boolean).length,
    characters: transcript.length,
    sentences: transcript.split(/[.!?]+/).filter(Boolean).length,
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
              <Mic className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Voice Recording</h1>
              <p className="text-muted-foreground">Record speech and get real-time transcription</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border space-y-6">
          {/* Recording Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={startRecording}
              disabled={isRecording}
              size="lg"
              className="bg-primary hover:bg-primary-hover"
            >
              <Mic size={20} className="mr-2" />
              Start Recording
            </Button>
            <Button
              onClick={stopRecording}
              disabled={!isRecording}
              variant="outline"
              size="lg"
            >
              <Square size={20} className="mr-2" />
              Stop
            </Button>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="bg-primary/10 text-primary px-4 py-3 rounded-lg text-center font-medium flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              Recording in progress...
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.words}</div>
              <div className="text-sm text-muted-foreground">Words</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">{stats.characters}</div>
              <div className="text-sm text-muted-foreground">Characters</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{stats.sentences}</div>
              <div className="text-sm text-muted-foreground">Sentences</div>
            </div>
          </div>

          {/* Transcript */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Transcription</label>
              {transcript && (
                <Button
                  onClick={downloadTranscript}
                  variant="ghost"
                  size="sm"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
              )}
            </div>
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your transcription will appear here as you speak..."
              className="min-h-[300px] text-base leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;
