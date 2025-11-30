import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
  type: 'move' | 'jump' | 'collect' | 'enemy' | 'powerup' | 'damage' | 'boss';
}

interface GameLogProps {
  logs: LogEntry[];
}

export const GameLog = ({ logs }: GameLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'move':
        return 'text-muted-foreground';
      case 'jump':
        return 'text-primary';
      case 'collect':
        return 'text-secondary';
      case 'enemy':
        return 'text-destructive';
      case 'powerup':
        return 'text-accent';
      case 'damage':
        return 'text-red-500';
      case 'boss':
        return 'text-purple-500 font-bold';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="bg-card border-2 border-primary/20 rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="h-5 w-5 text-accent" />
        <h3 className="font-bold text-foreground">Journal d'actions</h3>
      </div>
      
      <ScrollArea className="h-48">
        <div ref={scrollRef} className="space-y-1 pr-4">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Aucune action pour le moment...</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="text-sm">
                <span className="text-muted-foreground text-xs mr-2">{log.timestamp}</span>
                <span className={getLogColor(log.type)}>{log.message}</span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};