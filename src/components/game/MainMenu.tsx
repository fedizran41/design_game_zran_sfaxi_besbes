import { Button } from '@/components/ui/button';
import { Play, Info, Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MainMenuProps {
  onStartGame: () => void;
  onShowInstructions?: () => void;
}

export const MainMenu = ({ onStartGame, onShowInstructions }: MainMenuProps) => {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-b from-background to-primary/10 rounded-lg">
      <Card className="p-8 max-w-md w-full space-y-8 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl animate-scale-in">
        <div className="text-center space-y-4">
          <Gamepad2 className="w-20 h-20 mx-auto text-accent animate-bounce-coin" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Super Platform Game
          </h1>
          <p className="text-muted-foreground text-lg">
            Prêt pour l'aventure ?
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onStartGame}
            size="lg"
            className="w-full text-xl gap-3 h-14"
          >
            <Play className="w-6 h-6" />
            Commencer
          </Button>

          {onShowInstructions && (
            <Button
              onClick={onShowInstructions}
              variant="outline"
              size="lg"
              className="w-full gap-2"
            >
              <Info className="w-5 h-5" />
              Instructions
            </Button>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
          <p>Collectez les pièces et terminez tous les niveaux !</p>
        </div>
      </Card>
    </div>
  );
};
