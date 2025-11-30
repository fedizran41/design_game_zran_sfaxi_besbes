import { Heart, Star, Zap, Shield } from 'lucide-react';

interface GameUIProps {
  score: number;
  lives: number;
  level: number;
  speedBoost: boolean;
  invincible: boolean;
}

export const GameUI = ({ score, lives, level, speedBoost, invincible }: GameUIProps) => {
  return (
    <div className="flex items-center justify-between mb-4 bg-card px-6 py-3 rounded-lg shadow-lg border-2 border-primary">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-secondary fill-secondary" />
          <span className="font-bold text-lg text-foreground">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: lives }).map((_, i) => (
            <Heart key={i} className="w-5 h-5 text-destructive fill-destructive" />
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {speedBoost && (
          <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full animate-pulse-powerup">
            <Zap className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs font-semibold text-primary">SPEED</span>
          </div>
        )}
        {invincible && (
          <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full animate-pulse-powerup">
            <Shield className="w-4 h-4 text-accent fill-accent" />
            <span className="text-xs font-semibold text-accent">INVINCIBLE</span>
          </div>
        )}
      </div>
      
      <div className="font-bold text-lg text-foreground">
        Niveau {level}
      </div>
    </div>
  );
};
