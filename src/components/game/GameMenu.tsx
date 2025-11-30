import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Home } from 'lucide-react';

interface GameMenuProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onRestart: () => void;
  onMainMenu?: () => void;
}

export const GameMenu = ({ isPaused, onTogglePause, onRestart, onMainMenu }: GameMenuProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        onClick={onTogglePause}
        variant="secondary"
        size="sm"
        className="gap-2"
      >
        {isPaused ? (
          <>
            <Play className="h-4 w-4" />
            Reprendre
          </>
        ) : (
          <>
            <Pause className="h-4 w-4" />
            Pause
          </>
        )}
      </Button>
      
      <Button
        onClick={onRestart}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Recommencer
      </Button>

      {onMainMenu && (
        <Button
          onClick={onMainMenu}
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <Home className="h-4 w-4" />
          Menu
        </Button>
      )}
    </div>
  );
};