# Bounce Quest

## Retour au jeu
Documentation Design Patterns  
Projet de Module - Développement d'un Jeu Vidéo  

Enseignant : Haythem Ghazouani | Année 2025-2026

## Description

**Bounce Quest** est un jeu de plateforme dynamique où le joueur contrôle un personnage capable de sauter, courir et collecter des objets tout en évitant des ennemis. Chaque niveau propose des plateformes variées, des power-ups temporaires (vitesse ou invincibilité) et des pièces à collecter pour augmenter le score.  

Le jeu utilise un système de **Design Patterns** pour gérer les états, les interactions et les objets : le **State Pattern** pour le joueur et le jeu, le **Decorator Pattern** pour les power-ups, le **Composite Pattern** pour la structure des niveaux, et les patterns **Factory** et **Observer** pour la création d’ennemis et la gestion des événements.  

L’objectif est de compléter tous les niveaux tout en maximisant le score et en évitant les pièges et ennemis. L’expérience est enrichie par un rendu **Canvas HTML5**, des effets sonores via la **Web Audio API** et une interface moderne avec **React 18** et **Tailwind CSS**.

## Membres du Groupe
- Fedi Zran  
- Fadwa Zran  
- Lamis Sfaxi  
- May Besbes  

## Technologies Utilisées
- **React 18** : Framework UI avec hooks  
- **TypeScript** : Typage statique et interfaces  
- **Canvas HTML5** : Rendu graphique 2D  
- **Web Audio API** : Effets sonores 8-bit  
- **Tailwind CSS** : Styles et design system  

## Installation

### Prérequis
- Node.js 18+  
- npm ou yarn  
- Navigateur moderne (Chrome, Firefox, Edge, Safari)  

### Étapes
1. Cloner le dépôt : `git clone [URL]`  
2. Installer les dépendances : `npm install` ou `yarn install`  
3. Lancer le serveur de développement : `npm run dev` ou `yarn dev`  
4. Ouvrir le jeu dans le navigateur à l'adresse indiquée (par défaut `http://localhost:5173`)  

## Utilisation
- Flèches directionnelles : Déplacement  
- Espace : Saut  
- Échap : Pause  

## Résumé des Design Patterns Implémentés

### Patterns Obligatoires (4/4)
- **State Pattern** ✓  
- **Decorator Pattern** ✓  
- **Composite Pattern** ✓  
- Un pattern obligatoire additionnel ✓  

### Patterns Additionnels (2/1 requis)
- **Factory Pattern** ✓  
- **Observer Pattern** ✓  

## Diagramme de Classes UML
### Principales Classes et Relations
- **GameState**
  - `player: Player`
  - `currentLevel: number`
  - `score: number`
  - `isGameOver: boolean`
  - `isLevelComplete: boolean`
  - `isPaused: boolean`
- **Player**
  - `x, y, width, height`
  - `velocityX, velocityY`
  - `isJumping, lives, isInvincible, speedBoost`
  - `move(), jump()`
- **Level**
  - `platforms: Platform[]`
  - `enemies: Enemy[]`
  - `coins: Coin[]`
  - `powerUps: PowerUp[]`
  - `finishLine: number`
  - `render(), update()`
- **Platform**
  - `x, y, width, height, type`
  - `movingDirection?, movingSpeed?`
  - `update()`
- **Enemy**
  - `x, y, width, height`
  - `velocityX, direction`
  - `type: 'goomba' | 'boss'`
  - `hp?, maxHp?`
  - `move(), defeat()`
- **Coin**
  - `x, y, width, height`
  - `collected: boolean`
  - `collect()`
- **PowerUp**
  - `x, y, width, height`
  - `type: 'speed' | 'invincibility'`
  - `collected: boolean`
  - `activate()`
- **GameCanvas**
  - `gameState: GameState`
  - `logs: LogEntry[]`
  - `gameLoop(), resetLevel(), render()`
- **GameLog**
  - `logs: LogEntry[]`
  - `id: number, message: string, timestamp: string, type: string`

### Relations entre Classes
- GameState contient 1 Player (1:1)  
- GameState référence 1 Level (1:1)  
- Level contient plusieurs Platform, Enemy, Coin, PowerUp (1:n)  
- GameCanvas gère 1 GameState (1:1)  
- Player interagit avec Enemy, Coin, PowerUp  

## Principes de Conception
- Séparation des responsabilités : Chaque classe a un rôle unique  
- Composition : Level compose plusieurs types d'entités de jeu  
- Encapsulation : Propriétés et comportements regroupés logiquement  

## Structure du Projet

📦 platformer-game/  
├── 📁 public/  
│   ├── favicon.png  
│   └── robots.txt  
│  
├── 📁 src/  
│   ├── 📁 components/  
│   │   ├── 📁 game/  
│   │   │   ├── BackgroundMusic.tsx      # Gestion audio  
│   │   │   ├── GameCanvas.tsx           # Canvas principal (State Pattern)  
│   │   │   ├── GameLog.tsx              # Système de logging (Observer)  
│   │   │   ├── GameMenu.tsx             # Menu pause  
│   │   │   ├── GameOverScreen.tsx       # Écran game over  
│   │   │   ├── GameUI.tsx               # HUD (Score, Vies)  
│   │   │   ├── LevelCompleteScreen.tsx  # Écran victoire  
│   │   │   ├── MainMenu.tsx             # Menu principal  
│   │   │   └── TouchControls.tsx        # Contrôles tactiles  
│   │   │  
│   │   ├── 📁 ui/                       # Composants shadcn/ui  
│   │   │   ├── button.tsx  
│   │   │   ├── card.tsx  
│   │   │   ├── badge.tsx  
│   │   │   └── ... (autres composants UI)  
│   │   │  
│   │   └── NavLink.tsx                  # Navigation  
│   │  
│   ├── 📁 game/  
│   │   └── levels.ts                    # Définition des niveaux (Factory, Composite)  
│   │  
│   ├── 📁 hooks/  
│   │   ├── use-mobile.tsx  
│   │   └── use-toast.ts  
│   │  
│   ├── 📁 lib/  
│   │   └── utils.ts                     # Utilitaires  
│   │  
│   ├── 📁 pages/  
│   │   ├── Index.tsx                    # Page principale du jeu  
│   │   ├── DesignPatterns.tsx           # Documentation patterns  
│   │   └── NotFound.tsx                 # Page 404  
│   │  
│   ├── 📁 types/  
│   │   └── game.ts                      # Interfaces TypeScript  
│   │  
│   ├── 📁 utils/  
│   │   └── soundEffects.ts              # Effets sonores (Observer)  
│   │  
│   ├── App.tsx                          # Composant racine  
│   ├── main.tsx                         # Point d'entrée  
│   └── index.css                        # Styles globaux  
│  
├── 📄 tailwind.config.ts                # Configuration Tailwind  
├── 📄 vite.config.ts                     # Configuration Vite  
├── 📄 tsconfig.json                      # Configuration TypeScript  
└── 📄 package.json                       # Dépendances  

## Systèmes et Patterns Implémentés

### State Pattern
- Gestion des états du jeu et du joueur : `playing`, `gameOver`, `levelComplete`, `paused`  
- États du joueur : `grounded`, `jumping`, `moving`, `invincible`, `speedBoost`  
- Transitions gérées avec événements clavier et logging  

### Decorator Pattern
- Power-ups collectables : `SpeedBoost` et `Invincibility`  
- Durée temporaire avec timers  
- Effets visuels et audio associés  

### Composite Pattern
- Structure hiérarchique : Jeu → Levels → Platforms, Enemies, Coins, PowerUps  
- Uniformité de rendu via `gameLoop()`  

### Factory Pattern
- Création standardisée d’ennemis et power-ups avec propriétés uniformes  

### Observer Pattern
- Système de score et notifications  
- Effets sonores déclenchés automatiquement via observateurs  

## Interface Graphique
- Menu principal et pause  
- Canvas HTML5 pour la zone de jeu  
- HUD : Score, Vies, Niveau actuel  
- Écrans GameOver et LevelComplete  
- Contrôles clavier : Flèches/WASD + Espace  

## Système de Logging
- `console.log` pour tous les événements majeurs  
- Traçabilité des changements d’états, collisions et interactions  
- Logs des power-ups et notifications  

## Conclusion
Ce projet démontre une implémentation complète et fonctionnelle de multiples Design Patterns dans le contexte d’un jeu de plateforme. Tous les patterns obligatoires ont été implémentés (State, Decorator, Composite) ainsi que deux patterns additionnels (Factory, Observer). Le jeu inclut une interface graphique complète avec Canvas HTML5, un système de logging pour la traçabilité, et respecte les principes SOLID de la programmation orientée objet.
