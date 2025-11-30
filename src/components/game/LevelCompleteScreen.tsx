import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';

interface LevelCompleteScreenProps {
  score: number;
  level: number;
  onNextLevel: () => void;
  isLastLevel: boolean;
}

export const LevelCompleteScreen = ({ score, level, onNextLevel, isLastLevel }: LevelCompleteScreenProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-lg">
      <div className="text-center space-y-6 p-8 bg-card rounded-xl shadow-2xl border-4 border-primary max-w-md animate-scale-in">
        <div className="flex justify-center">
          <Trophy className="w-20 h-20 text-secondary animate-bounce-coin" />
        </div>
        <h2 className="text-4xl font-bold text-primary">
          {isLastLevel ? 'FÉLICITATIONS !' : 'NIVEAU TERMINÉ !'}
        </h2>
        <p className="text-xl text-foreground">
          Niveau {level} complété
        </p>
        <p className="text-2xl text-foreground">
          Score: <span className="font-bold text-secondary">{score}</span>
        </p>
        {!isLastLevel && (
          <div className="space-y-3">
            <Button 
              onClick={onNextLevel}
              size="lg"
              className="w-full text-lg gap-2"
            >
              Niveau suivant
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">ou appuyez sur Entrée</p>
          </div>
        )}
        {isLastLevel && (
          <p className="text-lg font-semibold text-primary">
            Vous avez terminé tous les niveaux ! 🎉
          </p>
        )}
      </div>
    </div>
  );
};
