import { useState } from 'react';
import { GameCanvas } from '@/components/game/GameCanvas';
import { MainMenu } from '@/components/game/MainMenu';
import { BackgroundMusic } from '@/components/game/BackgroundMusic';
import { Button } from '@/components/ui/button';
import { Gamepad2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 py-8 px-4">
      <BackgroundMusic />
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Gamepad2 className="w-12 h-12 text-accent animate-bounce-coin" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Super Platform Game
            </h1>
            <Button
              onClick={() => navigate('/design-patterns')}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Design Patterns
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Collectez les pièces, évitez les ennemis et terminez tous les niveaux !
          </p>
        </header>
        
        <main>
          {!gameStarted ? (
            <MainMenu 
              onStartGame={() => setGameStarted(true)}
              onShowInstructions={() => setShowInstructions(!showInstructions)}
            />
          ) : (
            <GameCanvas />
          )}
        </main>
        
        {(showInstructions || gameStarted) && (
          <footer className="mt-12 text-center space-y-4">
            <div className="bg-card p-6 rounded-lg shadow-lg border-2 border-primary/20">
              <h2 className="text-2xl font-bold text-primary mb-4">Instructions</h2>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <h3 className="font-semibold text-accent">Contrôles:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Flèches ← → ou A/D : Se déplacer</li>
                    <li>• Espace, ↑ ou W : Sauter</li>
                    <li>• R : Recommencer (Game Over)</li>
                    <li>• Entrée : Niveau suivant</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-accent">Objectifs:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Collectez les pièces dorées (+10 points)</li>
                    <li>• Sautez sur les ennemis (+100 points)</li>
                    <li>• Atteignez la fin du niveau</li>
                    <li>• Power-ups: Vitesse et Invincibilité</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Créé avec React.js, Canvas et beaucoup de plaisir ! 🎮
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Index;
