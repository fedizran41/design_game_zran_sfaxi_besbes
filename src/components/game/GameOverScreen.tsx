import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

export const GameOverScreen = ({ score, onRestart }: GameOverScreenProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-lg">
      <div className="text-center space-y-6 p-8 bg-card rounded-xl shadow-2xl border-4 border-destructive max-w-md animate-scale-in">
        <h2 className="text-5xl font-bold text-destructive animate-shake">GAME OVER</h2>
        <p className="text-2xl text-foreground">Score final: <span className="font-bold text-secondary">{score}</span></p>
        <div className="space-y-3">
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full text-lg gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Recommencer
          </Button>
          <p className="text-sm text-muted-foreground">ou appuyez sur R</p>
        </div>
      </div>
    </div>
  );
};
