import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TouchControlsProps {
  onMove: (direction: 'left' | 'right' | null) => void;
  onJump: () => void;
}

export const TouchControls = ({ onMove, onJump }: TouchControlsProps) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-between px-4 pointer-events-none">
      <div className="flex gap-2 pointer-events-auto">
        <Button
          size="lg"
          variant="secondary"
          className="h-16 w-16 rounded-full shadow-lg active:scale-95 transition-transform"
          onTouchStart={() => onMove('left')}
          onTouchEnd={() => onMove(null)}
          onMouseDown={() => onMove('left')}
          onMouseUp={() => onMove(null)}
          onMouseLeave={() => onMove(null)}
        >
          <ArrowLeft className="h-8 w-8" />
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="h-16 w-16 rounded-full shadow-lg active:scale-95 transition-transform"
          onTouchStart={() => onMove('right')}
          onTouchEnd={() => onMove(null)}
          onMouseDown={() => onMove('right')}
          onMouseUp={() => onMove(null)}
          onMouseLeave={() => onMove(null)}
        >
          <ArrowRight className="h-8 w-8" />
        </Button>
      </div>
      
      <Button
        size="lg"
        variant="default"
        className="h-16 w-16 rounded-full shadow-lg active:scale-95 transition-transform pointer-events-auto"
        onTouchStart={onJump}
        onMouseDown={onJump}
      >
        <ArrowUp className="h-8 w-8" />
      </Button>
    </div>
  );
};
