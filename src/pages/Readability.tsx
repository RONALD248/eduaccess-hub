import { useState } from "react";
import { BarChart3, ChevronLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Readability = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const sampleText = "Education plays a crucial role in sustainable development. It empowers individuals with knowledge and skills necessary to address global challenges. Quality education ensures that all learners acquire the knowledge needed to promote sustainable development.";

  const analyzeText = () => {
    const textToAnalyze = text || sampleText;
    const words = textToAnalyze.split(/\s+/).filter(Boolean);
    const sentences = textToAnalyze.split(/[.!?]+/).filter(Boolean);
    const characters = textToAnalyze.replace(/\s/g, '').length;
    const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
    
    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    
    // Flesch Reading Ease
    const fleschScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
    
    // Flesch-Kincaid Grade Level
    const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
    
    setAnalysis({
      words: words.length,
      sentences: sentences.length,
      characters,
      syllables,
      avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
      avgSyllablesPerWord: avgSyllablesPerWord.toFixed(2),
      fleschScore: Math.max(0, Math.min(100, fleschScore)).toFixed(1),
      gradeLevel: Math.max(0, gradeLevel).toFixed(1),
      readingTime: Math.ceil(words.length / 200),
    });

    toast({
      title: "Analysis complete",
      description: "Readability metrics calculated",
    });
  };

  const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const getReadabilityLevel = (score: number): { label: string; color: string } => {
    if (score >= 90) return { label: "Very Easy", color: "text-green-500" };
    if (score >= 80) return { label: "Easy", color: "text-green-400" };
    if (score >= 70) return { label: "Fairly Easy", color: "text-yellow-500" };
    if (score >= 60) return { label: "Standard", color: "text-yellow-400" };
    if (score >= 50) return { label: "Fairly Difficult", color: "text-orange-500" };
    if (score >= 30) return { label: "Difficult", color: "text-red-400" };
    return { label: "Very Difficult", color: "text-red-500" };
  };

  return (
    <div className="min-h-screen gradient-subtle py-12 px-4">
      <div className="container mx-auto max-w-6xl">
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
              <BarChart3 className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Readability Analysis</h1>
              <p className="text-muted-foreground">Analyze text complexity and reading level</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <label className="block text-sm font-medium mb-2">Text to Analyze</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={sampleText}
              className="min-h-[300px] text-base leading-relaxed mb-4"
            />
            <Button
              onClick={analyzeText}
              className="w-full bg-primary hover:bg-primary-hover"
            >
              <TrendingUp size={20} className="mr-2" />
              Analyze Readability
            </Button>
          </div>

          {/* Results */}
          {analysis && (
            <div className="space-y-4">
              {/* Flesch Score */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h3 className="text-lg font-semibold mb-4">Readability Score</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl font-bold text-primary">{analysis.fleschScore}</span>
                  <span className={`text-lg font-medium ${getReadabilityLevel(parseFloat(analysis.fleschScore)).color}`}>
                    {getReadabilityLevel(parseFloat(analysis.fleschScore)).label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Flesch Reading Ease (0-100)</p>
              </div>

              {/* Grade Level */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h3 className="text-lg font-semibold mb-4">Education Level</h3>
                <div className="text-4xl font-bold text-accent mb-2">
                  Grade {analysis.gradeLevel}
                </div>
                <p className="text-sm text-muted-foreground">Flesch-Kincaid Grade Level</p>
              </div>

              {/* Statistics */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h3 className="text-lg font-semibold mb-4">Text Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">{analysis.words}</div>
                    <div className="text-sm text-muted-foreground">Words</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{analysis.sentences}</div>
                    <div className="text-sm text-muted-foreground">Sentences</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{analysis.avgWordsPerSentence}</div>
                    <div className="text-sm text-muted-foreground">Avg Words/Sentence</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{analysis.readingTime} min</div>
                    <div className="text-sm text-muted-foreground">Reading Time</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Readability;
