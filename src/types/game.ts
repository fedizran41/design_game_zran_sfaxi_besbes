export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isJumping: boolean;
  isFacingRight: boolean;
  lives: number;
  isInvincible: boolean;
  invincibleTimer: number;
  speedBoost: boolean;
  speedBoostTimer: number;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'grass' | 'brick' | 'moving';
  movingDirection?: number;
  movingSpeed?: number;
  movingRange?: number;
  initialX?: number;
}

export interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  direction: number;
  type: 'goomba' | 'boss';
  hp?: number;
  maxHp?: number;
}

export interface Coin {
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
}

export interface PowerUp {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'speed' | 'invincibility';
  collected: boolean;
}

export interface Level {
  platforms: Platform[];
  enemies: Enemy[];
  coins: Coin[];
  powerUps: PowerUp[];
  finishLine: number;
}

export interface GameState {
  player: Player;
  currentLevel: number;
  score: number;
  isGameOver: boolean;
  isLevelComplete: boolean;
  isPaused: boolean;
}
