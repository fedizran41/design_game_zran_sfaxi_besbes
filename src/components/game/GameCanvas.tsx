import { useEffect, useRef, useState } from 'react';
import { Player, Enemy, Coin, PowerUp, Platform, GameState } from '@/types/game';
import { levels } from '@/game/levels';
import { GameUI } from './GameUI';
import { GameOverScreen } from './GameOverScreen';
import { LevelCompleteScreen } from './LevelCompleteScreen';
import { GameMenu } from './GameMenu';
import { GameLog, LogEntry } from './GameLog';
import { TouchControls } from './TouchControls';
import { soundEffects } from '@/utils/soundEffects';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.6;
const JUMP_FORCE = -13;
const MOVE_SPEED = 5;
const SPEED_BOOST_MULTIPLIER = 1.5;

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: 50,
      y: 400,
      width: 32,
      height: 32,
      velocityX: 0,
      velocityY: 0,
      isJumping: false,
      isFacingRight: true,
      lives: 3,
      isInvincible: false,
      invincibleTimer: 0,
      speedBoost: false,
      speedBoostTimer: 0,
    },
    currentLevel: 0,
    score: 0,
    isGameOver: false,
    isLevelComplete: false,
    isPaused: false,
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showControls, setShowControls] = useState(false);
  const logIdCounter = useRef(0);

  const keysPressed = useRef<Set<string>>(new Set());
  const cameraX = useRef(0);
  const animationFrameId = useRef<number>();
  const lastDirection = useRef<'left' | 'right' | null>(null);

  const addLog = (message: string, type: LogEntry['type']) => {
    const timestamp = new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    setLogs((prev) => [
      ...prev.slice(-19), // Keep last 20 logs
      { id: logIdCounter.current++, message, timestamp, type }
    ]);
  };

  const togglePause = () => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
    addLog(gameState.isPaused ? 'Jeu repris' : 'Jeu mis en pause', 'move');
  };

  // Reset level
  const resetLevel = () => {
    setGameState((prev) => ({
      ...prev,
      player: {
        x: 50,
        y: 400,
        width: 32,
        height: 32,
        velocityX: 0,
        velocityY: 0,
        isJumping: false,
        isFacingRight: true,
        lives: prev.player.lives - 1,
        isInvincible: false,
        invincibleTimer: 0,
        speedBoost: false,
        speedBoostTimer: 0,
      },
      isGameOver: prev.player.lives <= 1,
      isLevelComplete: false,
    }));
    cameraX.current = 0;
    
    if (gameState.player.lives <= 1) {
      soundEffects.gameOver();
      toast.error('Game Over!');
    } else {
      soundEffects.hit();
    }
  };

  const nextLevel = () => {
    if (gameState.currentLevel < levels.length - 1) {
      setGameState((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        player: {
          x: 50,
          y: 400,
          width: 32,
          height: 32,
          velocityX: 0,
          velocityY: 0,
          isJumping: false,
          isFacingRight: true,
          lives: prev.player.lives,
          isInvincible: false,
          invincibleTimer: 0,
          speedBoost: false,
          speedBoostTimer: 0,
        },
        isLevelComplete: false,
      }));
      cameraX.current = 0;
      soundEffects.levelComplete();
      toast.success(`Niveau ${gameState.currentLevel + 2} !`);
    } else {
      soundEffects.levelComplete();
      toast.success('Félicitations ! Vous avez terminé tous les niveaux !');
    }
  };

  const restartGame = () => {
    setGameState({
      player: {
        x: 50,
        y: 400,
        width: 32,
        height: 32,
        velocityX: 0,
        velocityY: 0,
        isJumping: false,
        isFacingRight: true,
        lives: 3,
        isInvincible: false,
        invincibleTimer: 0,
        speedBoost: false,
        speedBoostTimer: 0,
      },
      currentLevel: 0,
      score: 0,
      isGameOver: false,
      isLevelComplete: false,
      isPaused: false,
    });
    cameraX.current = 0;
    setLogs([]);
    addLog('🎮 Nouvelle partie commencée !', 'move');
    toast.success('Nouvelle partie !');
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
      
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        if (!gameState.player.isJumping && !gameState.isGameOver && !gameState.isLevelComplete && !gameState.isPaused) {
          soundEffects.jump();
          addLog('🦘 Saut effectué', 'jump');
          setGameState((prev) => ({
            ...prev,
            player: {
              ...prev.player,
              velocityY: JUMP_FORCE,
              isJumping: true,
            },
          }));
        }
      }
      
      if (e.key === 'p' || e.key === 'Escape') {
        togglePause();
      }
      
      if (e.key === 'r' && gameState.isGameOver) {
        restartGame();
      }
      
      if (e.key === 'Enter' && gameState.isLevelComplete) {
        nextLevel();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.player.isJumping, gameState.isGameOver, gameState.isLevelComplete]);

  // Game loop
  useEffect(() => {
    if (gameState.isGameOver || gameState.isLevelComplete || gameState.isPaused) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentLevel = levels[gameState.currentLevel];

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Update player position
      let newPlayer = { ...gameState.player };
      
      // Horizontal movement
      const speed = newPlayer.speedBoost ? MOVE_SPEED * SPEED_BOOST_MULTIPLIER : MOVE_SPEED;
      if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a')) {
        newPlayer.velocityX = -speed;
        newPlayer.isFacingRight = false;
        if (lastDirection.current !== 'left') {
          addLog('◀️ Déplacement vers la gauche', 'move');
          lastDirection.current = 'left';
        }
      } else if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d')) {
        newPlayer.velocityX = speed;
        newPlayer.isFacingRight = true;
        if (lastDirection.current !== 'right') {
          addLog('▶️ Déplacement vers la droite', 'move');
          lastDirection.current = 'right';
        }
      } else {
        newPlayer.velocityX = 0;
        lastDirection.current = null;
      }

      newPlayer.x += newPlayer.velocityX;
      
      // Apply gravity
      newPlayer.velocityY += GRAVITY;
      newPlayer.y += newPlayer.velocityY;

      // Platform collisions
      let onGround = false;
      currentLevel.platforms.forEach((platform) => {
        // Update moving platforms
        if (platform.type === 'moving' && platform.movingDirection && platform.movingSpeed && platform.movingRange && platform.initialX !== undefined) {
          platform.x += platform.movingDirection * platform.movingSpeed;
          if (Math.abs(platform.x - platform.initialX) >= platform.movingRange) {
            platform.movingDirection *= -1;
          }
        }

        if (
          newPlayer.x < platform.x + platform.width &&
          newPlayer.x + newPlayer.width > platform.x &&
          newPlayer.y + newPlayer.height > platform.y &&
          newPlayer.y + newPlayer.height < platform.y + platform.height &&
          newPlayer.velocityY > 0
        ) {
          newPlayer.y = platform.y - newPlayer.height;
          newPlayer.velocityY = 0;
          newPlayer.isJumping = false;
          onGround = true;
        }
      });

      // Fall detection
      if (newPlayer.y > CANVAS_HEIGHT) {
        resetLevel();
        return;
      }

      // Update camera
      if (newPlayer.x > CANVAS_WIDTH / 2) {
        cameraX.current = newPlayer.x - CANVAS_WIDTH / 2;
      }

      // Enemy collisions and updates
      let hitEnemy = false;
      currentLevel.enemies.forEach((enemy) => {
        enemy.x += enemy.velocityX * enemy.direction;
        
        // Enemy platform collision
        let enemyOnPlatform = false;
        currentLevel.platforms.forEach((platform) => {
          if (
            enemy.x < platform.x + platform.width &&
            enemy.x + enemy.width > platform.x &&
            enemy.y + enemy.height >= platform.y &&
            enemy.y + enemy.height <= platform.y + 20
          ) {
            enemyOnPlatform = true;
          }
        });

        if (!enemyOnPlatform || enemy.x <= 0) {
          enemy.direction *= -1;
        }

        // Player collision with enemy
        if (
          newPlayer.x < enemy.x + enemy.width &&
          newPlayer.x + newPlayer.width > enemy.x &&
          newPlayer.y < enemy.y + enemy.height &&
          newPlayer.y + newPlayer.height > enemy.y
        ) {
          if (newPlayer.velocityY > 0 && newPlayer.y < enemy.y) {
            // Jump on enemy
            if (enemy.type === 'boss') {
              // Boss takes damage
              if (!enemy.hp) enemy.hp = 1;
              enemy.hp -= 1;
              
              if (enemy.hp <= 0) {
                enemy.x = -1000; // Remove boss
                soundEffects.bossDefeat();
                addLog('👑 BOSS VAINCU ! +500 points', 'boss');
                setGameState((prev) => ({ ...prev, score: prev.score + 500 }));
                toast.success('Boss vaincu ! +500 points !');
              } else {
                soundEffects.enemyDefeat();
                addLog(`⚔️ Dégâts au Boss (${enemy.hp} HP restant)`, 'boss');
                setGameState((prev) => ({ ...prev, score: prev.score + 50 }));
                toast.info(`Boss: ${enemy.hp} HP restant`);
              }
            } else {
              enemy.x = -1000; // Remove enemy
              addLog('💥 Ennemi vaincu ! +100 points', 'enemy');
              soundEffects.enemyDefeat();
              setGameState((prev) => ({ ...prev, score: prev.score + 100 }));
              toast.success('+100 points !');
            }
            newPlayer.velocityY = -8;
          } else if (!newPlayer.isInvincible) {
            hitEnemy = true;
          }
        }
      });

      if (hitEnemy) {
        addLog('💔 Touché par un ennemi !', 'damage');
        resetLevel();
        return;
      }

      // Coin collection
      currentLevel.coins.forEach((coin) => {
        if (
          !coin.collected &&
          newPlayer.x < coin.x + coin.width &&
          newPlayer.x + newPlayer.width > coin.x &&
          newPlayer.y < coin.y + coin.height &&
          newPlayer.y + newPlayer.height > coin.y
        ) {
          coin.collected = true;
          soundEffects.coin();
          addLog('🪙 Pièce collectée ! +10 points', 'collect');
          setGameState((prev) => ({ ...prev, score: prev.score + 10 }));
        }
      });

      // PowerUp collection
      currentLevel.powerUps.forEach((powerUp) => {
        if (
          !powerUp.collected &&
          newPlayer.x < powerUp.x + powerUp.width &&
          newPlayer.x + newPlayer.width > powerUp.x &&
          newPlayer.y < powerUp.y + powerUp.height &&
          newPlayer.y + newPlayer.height > powerUp.y
        ) {
          powerUp.collected = true;
          if (powerUp.type === 'speed') {
            newPlayer.speedBoost = true;
            newPlayer.speedBoostTimer = 300; // 5 seconds
            soundEffects.speedPowerUp();
            addLog('⚡ Power-up Vitesse activé !', 'powerup');
            toast.success('Vitesse augmentée !');
          } else if (powerUp.type === 'invincibility') {
            newPlayer.isInvincible = true;
            newPlayer.invincibleTimer = 300;
            soundEffects.invincibilityPowerUp();
            addLog('🛡️ Power-up Invincibilité activé !', 'powerup');
            toast.success('Invincibilité activée !');
          }
        }
      });

      // Update timers
      if (newPlayer.speedBoostTimer > 0) {
        newPlayer.speedBoostTimer--;
        if (newPlayer.speedBoostTimer === 0) {
          newPlayer.speedBoost = false;
        }
      }
      if (newPlayer.invincibleTimer > 0) {
        newPlayer.invincibleTimer--;
        if (newPlayer.invincibleTimer === 0) {
          newPlayer.isInvincible = false;
        }
      }

      // Check level completion
      if (newPlayer.x >= currentLevel.finishLine) {
        soundEffects.levelComplete();
        addLog(`🏁 Niveau ${gameState.currentLevel + 1} terminé !`, 'collect');
        setGameState((prev) => ({ ...prev, isLevelComplete: true }));
        return;
      }

      // Draw platforms
      currentLevel.platforms.forEach((platform) => {
        ctx.fillStyle = platform.type === 'grass' ? '#4CAF50' : '#8B4513';
        ctx.fillRect(
          platform.x - cameraX.current,
          platform.y,
          platform.width,
          platform.height
        );
        
        // Platform border
        ctx.strokeStyle = '#2E7D32';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          platform.x - cameraX.current,
          platform.y,
          platform.width,
          platform.height
        );
      });

      // Draw enemies
      currentLevel.enemies.forEach((enemy) => {
        if (enemy.x > -100) {
          if (enemy.type === 'boss') {
            // Draw boss with special appearance
            ctx.fillStyle = '#8B0000';
            ctx.fillRect(
              enemy.x - cameraX.current,
              enemy.y,
              enemy.width,
              enemy.height
            );
            // Boss crown
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(enemy.x - cameraX.current + 10, enemy.y - 10, enemy.width - 20, 10);
            // Eyes
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(enemy.x - cameraX.current + 15, enemy.y + 15, 10, 10);
            ctx.fillRect(enemy.x - cameraX.current + 35, enemy.y + 15, 10, 10);
            // HP bar
            if (enemy.hp && enemy.maxHp) {
              const hpBarWidth = enemy.width;
              const hpBarHeight = 5;
              const hpBarX = enemy.x - cameraX.current;
              const hpBarY = enemy.y - 20;
              
              // Background
              ctx.fillStyle = '#333333';
              ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
              
              // HP
              ctx.fillStyle = '#FF0000';
              ctx.fillRect(hpBarX, hpBarY, (enemy.hp / enemy.maxHp) * hpBarWidth, hpBarHeight);
              
              // Border
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = 1;
              ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
            }
          } else {
            // Regular enemy
            ctx.fillStyle = '#A0522D';
            ctx.fillRect(
              enemy.x - cameraX.current,
              enemy.y,
              enemy.width,
              enemy.height
            );
            // Eyes
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(enemy.x - cameraX.current + 8, enemy.y + 8, 6, 6);
            ctx.fillRect(enemy.x - cameraX.current + 18, enemy.y + 8, 6, 6);
          }
        }
      });

      // Draw coins
      currentLevel.coins.forEach((coin) => {
        if (!coin.collected) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(
            coin.x - cameraX.current + coin.width / 2,
            coin.y + coin.height / 2,
            coin.width / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.strokeStyle = '#FFA500';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw powerups
      currentLevel.powerUps.forEach((powerUp) => {
        if (!powerUp.collected) {
          ctx.fillStyle = powerUp.type === 'speed' ? '#00FF00' : '#9C27B0';
          ctx.fillRect(
            powerUp.x - cameraX.current,
            powerUp.y,
            powerUp.width,
            powerUp.height
          );
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.strokeRect(
            powerUp.x - cameraX.current,
            powerUp.y,
            powerUp.width,
            powerUp.height
          );
        }
      });

      // Draw player
      if (newPlayer.isInvincible && Math.floor(Date.now() / 100) % 2 === 0) {
        ctx.globalAlpha = 0.5;
      }
      ctx.fillStyle = '#E74C3C';
      ctx.fillRect(
        newPlayer.x - cameraX.current,
        newPlayer.y,
        newPlayer.width,
        newPlayer.height
      );
      // Player details (hat)
      ctx.fillStyle = '#C0392B';
      ctx.fillRect(
        newPlayer.x - cameraX.current,
        newPlayer.y,
        newPlayer.width,
        8
      );
      // Eyes
      ctx.fillStyle = '#000000';
      const eyeOffset = newPlayer.isFacingRight ? 0 : 8;
      ctx.fillRect(newPlayer.x - cameraX.current + 8 + eyeOffset, newPlayer.y + 12, 4, 4);
      ctx.fillRect(newPlayer.x - cameraX.current + 20 + eyeOffset, newPlayer.y + 12, 4, 4);
      ctx.globalAlpha = 1;

      // Update state
      setGameState((prev) => ({
        ...prev,
        player: newPlayer,
      }));

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, keysPressed]);

  const handleTouchMove = (direction: 'left' | 'right' | null) => {
    if (direction === 'left') {
      keysPressed.current.add('ArrowLeft');
      keysPressed.current.delete('ArrowRight');
    } else if (direction === 'right') {
      keysPressed.current.add('ArrowRight');
      keysPressed.current.delete('ArrowLeft');
    } else {
      keysPressed.current.delete('ArrowLeft');
      keysPressed.current.delete('ArrowRight');
    }
  };

  const handleTouchJump = () => {
    if (!gameState.player.isJumping && !gameState.isGameOver && !gameState.isLevelComplete && !gameState.isPaused) {
      soundEffects.jump();
      addLog('🦘 Saut effectué', 'jump');
      setGameState((prev) => ({
        ...prev,
        player: {
          ...prev.player,
          velocityY: JUMP_FORCE,
          isJumping: true,
        },
      }));
    }
  };

  return (
    <div className="relative space-y-4">
      <GameMenu 
        isPaused={gameState.isPaused}
        onTogglePause={togglePause}
        onRestart={restartGame}
      />
      
      <GameUI
        score={gameState.score}
        lives={gameState.player.lives}
        level={gameState.currentLevel + 1}
        speedBoost={gameState.player.speedBoost}
        invincible={gameState.player.isInvincible}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="relative mx-auto w-fit">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border-4 border-primary rounded-lg shadow-xl bg-game-sky"
            />
            {gameState.isPaused && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="bg-card p-8 rounded-lg border-4 border-primary shadow-xl">
                  <h2 className="text-3xl font-bold text-center text-primary mb-4">⏸️ PAUSE</h2>
                  <p className="text-muted-foreground text-center">Appuyez sur P ou ESC pour reprendre</p>
                </div>
              </div>
            )}
            {gameState.isGameOver && (
              <GameOverScreen score={gameState.score} onRestart={restartGame} />
            )}
            {gameState.isLevelComplete && (
              <LevelCompleteScreen
                score={gameState.score}
                level={gameState.currentLevel + 1}
                onNextLevel={nextLevel}
                isLastLevel={gameState.currentLevel === levels.length - 1}
              />
            )}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground">
              ← → ou A D pour bouger | Espace, ↑ ou W pour sauter | P ou ESC pour pause
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowControls(!showControls)}
              className="gap-2"
            >
              <Gamepad2 className="h-4 w-4" />
              {showControls ? 'Masquer' : 'Afficher'} commandes
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <GameLog logs={logs} />
        </div>
      </div>
      
      {showControls && (
        <TouchControls onMove={handleTouchMove} onJump={handleTouchJump} />
      )}
    </div>
  );
};
