import { Level } from '@/types/game';

export const levels: Level[] = [
  // Level 1 - Easy
  {
    platforms: [
      { x: 0, y: 550, width: 800, height: 50, type: 'grass' },
      { x: 200, y: 450, width: 150, height: 20, type: 'brick' },
      { x: 400, y: 350, width: 150, height: 20, type: 'brick' },
      { x: 600, y: 450, width: 150, height: 20, type: 'brick' },
      { x: 850, y: 550, width: 400, height: 50, type: 'grass' },
      { x: 1000, y: 400, width: 150, height: 20, type: 'brick' },
      { x: 1300, y: 550, width: 500, height: 50, type: 'grass' },
    ],
    enemies: [
      { x: 300, y: 520, width: 30, height: 30, velocityX: 1, direction: 1, type: 'goomba' },
      { x: 900, y: 520, width: 30, height: 30, velocityX: 1, direction: 1, type: 'goomba' },
    ],
    coins: [
      { x: 250, y: 400, width: 20, height: 20, collected: false },
      { x: 280, y: 400, width: 20, height: 20, collected: false },
      { x: 310, y: 400, width: 20, height: 20, collected: false },
      { x: 450, y: 300, width: 20, height: 20, collected: false },
      { x: 650, y: 400, width: 20, height: 20, collected: false },
      { x: 1050, y: 350, width: 20, height: 20, collected: false },
    ],
    powerUps: [
      { x: 450, y: 300, width: 25, height: 25, type: 'speed', collected: false },
    ],
    finishLine: 1700,
  },
  // Level 2 - Medium
  {
    platforms: [
      { x: 0, y: 550, width: 600, height: 50, type: 'grass' },
      { x: 200, y: 450, width: 100, height: 20, type: 'brick' },
      { x: 400, y: 350, width: 100, height: 20, type: 'brick' },
      { x: 700, y: 500, width: 150, height: 20, type: 'moving', movingDirection: 1, movingSpeed: 2, movingRange: 150, initialX: 700 },
      { x: 950, y: 550, width: 300, height: 50, type: 'grass' },
      { x: 1100, y: 400, width: 100, height: 20, type: 'brick' },
      { x: 1300, y: 300, width: 100, height: 20, type: 'brick' },
      { x: 1500, y: 550, width: 700, height: 50, type: 'grass' },
      { x: 1700, y: 450, width: 100, height: 20, type: 'brick' },
    ],
    enemies: [
      { x: 300, y: 520, width: 30, height: 30, velocityX: 1.5, direction: 1, type: 'goomba' },
      { x: 1000, y: 520, width: 30, height: 30, velocityX: 1.5, direction: 1, type: 'goomba' },
      { x: 1600, y: 520, width: 30, height: 30, velocityX: 1.5, direction: 1, type: 'goomba' },
    ],
    coins: [
      { x: 250, y: 400, width: 20, height: 20, collected: false },
      { x: 450, y: 300, width: 20, height: 20, collected: false },
      { x: 750, y: 450, width: 20, height: 20, collected: false },
      { x: 780, y: 450, width: 20, height: 20, collected: false },
      { x: 1150, y: 350, width: 20, height: 20, collected: false },
      { x: 1350, y: 250, width: 20, height: 20, collected: false },
      { x: 1750, y: 400, width: 20, height: 20, collected: false },
    ],
    powerUps: [
      { x: 1150, y: 350, width: 25, height: 25, type: 'invincibility', collected: false },
    ],
    finishLine: 2100,
  },
  // Level 3 - Hard
  {
    platforms: [
      { x: 0, y: 550, width: 400, height: 50, type: 'grass' },
      { x: 150, y: 450, width: 80, height: 20, type: 'brick' },
      { x: 300, y: 350, width: 80, height: 20, type: 'brick' },
      { x: 500, y: 500, width: 120, height: 20, type: 'moving', movingDirection: 1, movingSpeed: 3, movingRange: 200, initialX: 500 },
      { x: 800, y: 450, width: 80, height: 20, type: 'brick' },
      { x: 950, y: 550, width: 200, height: 50, type: 'grass' },
      { x: 1200, y: 400, width: 120, height: 20, type: 'moving', movingDirection: 1, movingSpeed: 2.5, movingRange: 180, initialX: 1200 },
      { x: 1450, y: 350, width: 80, height: 20, type: 'brick' },
      { x: 1600, y: 250, width: 80, height: 20, type: 'brick' },
      { x: 1800, y: 550, width: 600, height: 50, type: 'grass' },
      { x: 2000, y: 400, width: 100, height: 20, type: 'brick' },
    ],
    enemies: [
      { x: 200, y: 520, width: 30, height: 30, velocityX: 2, direction: 1, type: 'goomba' },
      { x: 350, y: 320, width: 30, height: 30, velocityX: 2, direction: 1, type: 'goomba' },
      { x: 1000, y: 520, width: 30, height: 30, velocityX: 2, direction: 1, type: 'goomba' },
      { x: 1900, y: 520, width: 30, height: 30, velocityX: 2, direction: 1, type: 'goomba' },
      { x: 2100, y: 520, width: 30, height: 30, velocityX: 2, direction: 1, type: 'goomba' },
    ],
    coins: [
      { x: 200, y: 400, width: 20, height: 20, collected: false },
      { x: 350, y: 300, width: 20, height: 20, collected: false },
      { x: 550, y: 450, width: 20, height: 20, collected: false },
      { x: 850, y: 400, width: 20, height: 20, collected: false },
      { x: 1250, y: 350, width: 20, height: 20, collected: false },
      { x: 1500, y: 300, width: 20, height: 20, collected: false },
      { x: 1650, y: 200, width: 20, height: 20, collected: false },
      { x: 2050, y: 350, width: 20, height: 20, collected: false },
    ],
    powerUps: [
      { x: 850, y: 400, width: 25, height: 25, type: 'speed', collected: false },
      { x: 1500, y: 300, width: 25, height: 25, type: 'invincibility', collected: false },
    ],
    finishLine: 2300,
  },
  // Level 4 - Boss Level 1
  {
    platforms: [
      { x: 0, y: 550, width: 800, height: 50, type: 'grass' },
      { x: 200, y: 450, width: 100, height: 20, type: 'brick' },
      { x: 400, y: 350, width: 100, height: 20, type: 'brick' },
      { x: 600, y: 450, width: 100, height: 20, type: 'brick' },
      { x: 900, y: 550, width: 400, height: 50, type: 'grass' },
      { x: 950, y: 400, width: 120, height: 20, type: 'moving', movingDirection: 1, movingSpeed: 2, movingRange: 150, initialX: 950 },
      { x: 1400, y: 550, width: 800, height: 50, type: 'grass' },
    ],
    enemies: [
      { x: 300, y: 520, width: 30, height: 30, velocityX: 2, direction: 1, type: 'goomba' },
      { x: 1000, y: 520, width: 30, height: 30, velocityX: 2, direction: 1, type: 'goomba' },
      { x: 1700, y: 480, width: 60, height: 70, velocityX: 1.5, direction: 1, type: 'boss', hp: 5, maxHp: 5 },
    ],
    coins: [
      { x: 250, y: 400, width: 20, height: 20, collected: false },
      { x: 450, y: 300, width: 20, height: 20, collected: false },
      { x: 650, y: 400, width: 20, height: 20, collected: false },
      { x: 1000, y: 350, width: 20, height: 20, collected: false },
      { x: 1550, y: 500, width: 20, height: 20, collected: false },
    ],
    powerUps: [
      { x: 1000, y: 350, width: 25, height: 25, type: 'invincibility', collected: false },
    ],
    finishLine: 2100,
  },
  // Level 5 - Boss Level 2 (Final Boss)
  {
    platforms: [
      { x: 0, y: 550, width: 600, height: 50, type: 'grass' },
      { x: 150, y: 450, width: 80, height: 20, type: 'brick' },
      { x: 350, y: 350, width: 80, height: 20, type: 'brick' },
      { x: 700, y: 500, width: 120, height: 20, type: 'moving', movingDirection: 1, movingSpeed: 3, movingRange: 200, initialX: 700 },
      { x: 950, y: 400, width: 80, height: 20, type: 'brick' },
      { x: 1150, y: 550, width: 400, height: 50, type: 'grass' },
      { x: 1200, y: 450, width: 120, height: 20, type: 'moving', movingDirection: 1, movingSpeed: 2.5, movingRange: 150, initialX: 1200 },
      { x: 1600, y: 550, width: 900, height: 50, type: 'grass' },
    ],
    enemies: [
      { x: 250, y: 520, width: 30, height: 30, velocityX: 2.5, direction: 1, type: 'goomba' },
      { x: 500, y: 320, width: 30, height: 30, velocityX: 2.5, direction: 1, type: 'goomba' },
      { x: 1250, y: 520, width: 30, height: 30, velocityX: 2.5, direction: 1, type: 'goomba' },
      { x: 2000, y: 460, width: 80, height: 90, velocityX: 2, direction: 1, type: 'boss', hp: 8, maxHp: 8 },
    ],
    coins: [
      { x: 200, y: 400, width: 20, height: 20, collected: false },
      { x: 400, y: 300, width: 20, height: 20, collected: false },
      { x: 750, y: 450, width: 20, height: 20, collected: false },
      { x: 1000, y: 350, width: 20, height: 20, collected: false },
      { x: 1250, y: 400, width: 20, height: 20, collected: false },
      { x: 1900, y: 500, width: 20, height: 20, collected: false },
    ],
    powerUps: [
      { x: 400, y: 300, width: 25, height: 25, type: 'speed', collected: false },
      { x: 1250, y: 400, width: 25, height: 25, type: 'invincibility', collected: false },
    ],
    finishLine: 2400,
  },
];
