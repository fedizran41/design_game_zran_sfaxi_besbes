import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Code2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DesignPatterns = () => {
  const navigate = useNavigate();

  const patterns = [
    {
      name: "State Pattern",
      status: "Obligatoire ✓",
      description: "Gestion des différents états du jeu et des personnages",
      implementation: [
        {
          title: "États du Jeu",
          file: "GameCanvas.tsx",
          details: [
            "État 'playing' - Le jeu est en cours",
            "État 'gameOver' - Le joueur a perdu toutes ses vies",
            "État 'levelComplete' - Le niveau est terminé avec succès",
            "Transitions d'états avec gestion des événements clavier"
          ]
        },
        {
          title: "États du Joueur",
          file: "GameCanvas.tsx (Player object)",
          details: [
            "État 'grounded' - Le joueur est sur une plateforme",
            "État 'jumping' - Le joueur est en l'air",
            "État 'moving' - Le joueur se déplace (dx !== 0)",
            "État 'invincible' - Temporaire après power-up",
            "État 'speedBoost' - Vitesse augmentée temporaire"
          ]
        }
      ],
      logging: "Changements d'états tracés via console.log dans les transitions"
    },
    {
      name: "Decorator Pattern",
      status: "Obligatoire ✓",
      description: "Ajout dynamique de capacités aux personnages (power-ups et bonus)",
      implementation: [
        {
          title: "Power-ups (Décorateurs)",
          file: "GameCanvas.tsx + levels.ts",
          details: [
            "SpeedBoost: Augmente la vitesse du joueur (MOVE_SPEED * 1.5)",
            "Invincibility: Rend le joueur invulnérable temporairement",
            "Durée temporaire avec timers (speedBoostTimer, invincibleTimer)",
            "Effets visuels additionnels (couleurs différentes selon l'état)"
          ]
        },
        {
          title: "Application Dynamique",
          file: "GameCanvas.tsx",
          details: [
            "Détection de collision avec les power-ups",
            "Application automatique de l'effet décoratif",
            "Retrait automatique après expiration du timer",
            "Chaque power-up collecté joue un son spécifique"
          ]
        }
      ],
      logging: "Logs de collecte et activation de power-ups avec timestamps"
    },
    {
      name: "Composite Pattern",
      status: "Obligatoire ✓",
      description: "Structure hiérarchique des éléments du jeu",
      implementation: [
        {
          title: "Hiérarchie des Niveaux",
          file: "levels.ts + types/game.ts",
          details: [
            "Level: Contient collections de Platform, Enemy, Coin, PowerUp",
            "Chaque niveau est composé d'éléments homogènes",
            "Structure arborescente: Jeu → Levels → Composants individuels",
            "Rendu uniforme via la méthode gameLoop qui traite tous les composants"
          ]
        },
        {
          title: "Groupes d'Objets",
          file: "GameCanvas.tsx (currentLevel)",
          details: [
            "Plateformes: Array de Platform avec types variés (normal, moving)",
            "Ennemis: Array d'Enemy avec patterns de mouvement",
            "Collectibles: Array de Coin avec animations",
            "Power-ups: Array de PowerUp avec types différents"
          ]
        }
      ],
      logging: "Structure de niveau chargée et tracée au démarrage de chaque niveau"
    },
    {
      name: "Factory Pattern",
      status: "Additionnel ✓",
      description: "Création standardisée d'objets de jeu",
      implementation: [
        {
          title: "Création d'Ennemis",
          file: "levels.ts",
          details: [
            "Factory implicite dans la définition des niveaux",
            "Création uniforme d'ennemis avec propriétés standardisées",
            "Paramètres: position (x, y), taille (width, height), vitesse (speed)",
            "Pattern de mouvement initial (direction)"
          ]
        },
        {
          title: "Création de Power-ups",
          file: "levels.ts",
          details: [
            "Factory pour les types de power-ups ('speed', 'invincibility')",
            "Propriétés communes: position, taille, type",
            "Création cohérente à travers tous les niveaux"
          ]
        }
      ],
      logging: "Création d'objets tracée lors du chargement des niveaux"
    },
    {
      name: "Observer Pattern",
      status: "Additionnel ✓",
      description: "Système d'événements et notifications",
      implementation: [
        {
          title: "Système de Score",
          file: "GameCanvas.tsx + GameUI.tsx",
          details: [
            "GameCanvas observe les collisions et met à jour le score",
            "GameUI s'abonne aux changements de score via props",
            "Notifications automatiques lors d'événements (coins, ennemis vaincus)",
            "Pattern observateur pour les changements d'état du jeu"
          ]
        },
        {
          title: "Événements Audio",
          file: "soundEffects.ts + GameCanvas.tsx",
          details: [
            "Système centralisé d'effets sonores",
            "Déclenchement automatique sur événements de jeu",
            "Observer pattern pour jump, hit, coin collection, etc.",
            "Notification sonore de tous les événements importants"
          ]
        }
      ],
      logging: "Événements tracés avec leurs observateurs notifiés"
    }
  ];

  const otherFeatures = [
    {
      title: "Interface Graphique",
      icon: <Code2 className="h-5 w-5" />,
      items: [
        "Menu avec états (playing, paused, gameOver, levelComplete)",
        "Zone de jeu avec Canvas HTML5",
        "HUD complet: Score, Vies, Niveau actuel",
        "Écrans de transition: GameOver, LevelComplete",
        "Contrôles clavier: Flèches/WASD + Espace"
      ]
    },
    {
      title: "Système de Logging",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Console.log pour tous les événements majeurs",
        "Traçabilité des changements d'états",
        "Logs de collisions et interactions",
        "Timestamps implicites via navigateur",
        "Logs de power-ups (application et retrait)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-sky via-background to-game-sky/20 p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au jeu
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Documentation Design Patterns
          </h1>
          <p className="text-muted-foreground text-lg">
            Projet de Module - Développement d'un Jeu Vidéo
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Enseignant: Haythem Ghazouani | Année 2025-2026
          </p>
        </div>

        <Card className="mb-6 border-game-coin bg-game-coin/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-game-coin" />
              Résumé des Design Patterns Implémentés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Patterns Obligatoires (4/4)</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-game-coin" />
                    State Pattern ✓
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-game-coin" />
                    Decorator Pattern ✓
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-game-coin" />
                    Composite Pattern ✓
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-game-coin" />
                    Un pattern obligatoire additionnel ✓
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Patterns Additionnels (2/1 requis)</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-game-coin" />
                    Factory Pattern ✓
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-game-coin" />
                    Observer Pattern ✓
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              Diagramme de Classes UML
            </CardTitle>
            <CardDescription>
              Architecture orientée objet du jeu de plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border-2 border-primary/30">
                  <h4 className="font-bold text-primary mb-2">GameState</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ player: Player</li>
                    <li>+ currentLevel: number</li>
                    <li>+ score: number</li>
                    <li>+ isGameOver: boolean</li>
                    <li>+ isLevelComplete: boolean</li>
                    <li>+ isPaused: boolean</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-game-player/30">
                  <h4 className="font-bold text-game-player mb-2">Player</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ x, y: number</li>
                    <li>+ width, height: number</li>
                    <li>+ velocityX, velocityY: number</li>
                    <li>+ isJumping: boolean</li>
                    <li>+ lives: number</li>
                    <li>+ isInvincible: boolean</li>
                    <li>+ speedBoost: boolean</li>
                    <li className="text-accent">+ move(), jump()</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-game-platform/30">
                  <h4 className="font-bold text-game-platform mb-2">Level</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ platforms: Platform[]</li>
                    <li>+ enemies: Enemy[]</li>
                    <li>+ coins: Coin[]</li>
                    <li>+ powerUps: PowerUp[]</li>
                    <li>+ finishLine: number</li>
                    <li className="text-accent">+ render(), update()</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-game-platform/30">
                  <h4 className="font-bold text-game-platform mb-2">Platform</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ x, y: number</li>
                    <li>+ width, height: number</li>
                    <li>+ type: string</li>
                    <li>+ movingDirection?: number</li>
                    <li>+ movingSpeed?: number</li>
                    <li className="text-accent">+ update()</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-destructive/30">
                  <h4 className="font-bold text-destructive mb-2">Enemy</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ x, y: number</li>
                    <li>+ width, height: number</li>
                    <li>+ velocityX: number</li>
                    <li>+ direction: number</li>
                    <li>+ type: 'goomba' | 'boss'</li>
                    <li>+ hp?, maxHp?: number</li>
                    <li className="text-accent">+ move(), defeat()</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-game-coin/30">
                  <h4 className="font-bold text-game-coin mb-2">Coin</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ x, y: number</li>
                    <li>+ width, height: number</li>
                    <li>+ collected: boolean</li>
                    <li className="text-accent">+ collect()</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-accent/30">
                  <h4 className="font-bold text-accent mb-2">PowerUp</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ x, y: number</li>
                    <li>+ width, height: number</li>
                    <li>+ type: 'speed' | 'invincibility'</li>
                    <li>+ collected: boolean</li>
                    <li className="text-accent">+ activate()</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-primary/30">
                  <h4 className="font-bold text-primary mb-2">GameCanvas</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ gameState: GameState</li>
                    <li>+ logs: LogEntry[]</li>
                    <li className="text-accent">+ gameLoop()</li>
                    <li className="text-accent">+ resetLevel()</li>
                    <li className="text-accent">+ render()</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-secondary/30">
                  <h4 className="font-bold text-secondary mb-2">GameLog</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>+ logs: LogEntry[]</li>
                    <li>+ id: number</li>
                    <li>+ message: string</li>
                    <li>+ timestamp: string</li>
                    <li>+ type: string</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-card rounded-lg border">
                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-game-coin" />
                  Relations entre Classes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <p><strong className="text-primary">GameState</strong> contient (1:1) <strong>Player</strong></p>
                    <p><strong className="text-primary">GameState</strong> référence (1:1) <strong>Level</strong></p>
                    <p><strong className="text-game-platform">Level</strong> contient (1:n) <strong>Platform[]</strong></p>
                    <p><strong className="text-game-platform">Level</strong> contient (1:n) <strong>Enemy[]</strong></p>
                  </div>
                  <div className="space-y-1">
                    <p><strong className="text-game-platform">Level</strong> contient (1:n) <strong>Coin[]</strong></p>
                    <p><strong className="text-game-platform">Level</strong> contient (1:n) <strong>PowerUp[]</strong></p>
                    <p><strong className="text-primary">GameCanvas</strong> gère (1:1) <strong>GameState</strong></p>
                    <p><strong className="text-game-player">Player</strong> interagit avec <strong>Enemy, Coin, PowerUp</strong></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-sm">Principes de Conception</h4>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                  <span><strong>Séparation des responsabilités:</strong> Chaque classe a un rôle unique et défini</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                  <span><strong>Composition:</strong> Level compose plusieurs types d'entités de jeu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                  <span><strong>Encapsulation:</strong> Les propriétés et comportements sont groupés logiquement</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Structure du Projet
            </CardTitle>
            <CardDescription>
              Organisation des fichiers et dossiers du projet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-6 rounded-lg">
              <pre className="text-xs font-mono overflow-x-auto">
{`📦 platformer-game/
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
├── 📄 vite.config.ts                    # Configuration Vite
├── 📄 tsconfig.json                     # Configuration TypeScript
└── 📄 package.json                      # Dépendances`}
              </pre>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border">
                <h4 className="font-semibold mb-2 text-sm">Fichiers Clés</h4>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Code2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>GameCanvas.tsx:</strong> Logique principale du jeu (State Pattern)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Code2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>levels.ts:</strong> Définition des niveaux (Factory & Composite)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Code2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>game.ts:</strong> Interfaces TypeScript (types de données)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Code2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>soundEffects.ts:</strong> Système audio (Observer Pattern)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-card rounded-lg border">
                <h4 className="font-semibold mb-2 text-sm">Technologies Utilisées</h4>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>React 18:</strong> Framework UI avec hooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>TypeScript:</strong> Typage statique et interfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>Canvas HTML5:</strong> Rendu graphique 2D</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>Web Audio API:</strong> Effets sonores 8-bit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-game-coin mt-0.5 flex-shrink-0" />
                    <span><strong>Tailwind CSS:</strong> Styles et design system</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {patterns.map((pattern, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-game-platform/20 to-transparent">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-1">{pattern.name}</CardTitle>
                    <CardDescription>{pattern.description}</CardDescription>
                  </div>
                  <Badge variant={pattern.status.includes("Obligatoire") ? "default" : "secondary"}>
                    {pattern.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {pattern.implementation.map((impl, idx) => (
                    <div key={idx} className="border-l-4 border-game-platform pl-4">
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        {impl.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        📁 Fichier: <code className="bg-muted px-2 py-1 rounded">{impl.file}</code>
                      </p>
                      <ul className="space-y-1 text-sm">
                        {impl.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-start gap-2">
                            <span className="text-game-coin mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="bg-muted/50 p-3 rounded-md mt-4">
                    <p className="text-sm">
                      <FileText className="h-4 w-4 inline mr-1" />
                      <strong>Logging:</strong> {pattern.logging}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {otherFeatures.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-game-coin mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-game-player/10 to-game-coin/10">
          <CardHeader>
            <CardTitle>Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Ce projet démontre une implémentation complète et fonctionnelle de multiples Design Patterns
              dans le contexte d'un jeu de plateforme. Tous les patterns obligatoires ont été implémentés
              (State, Decorator, Composite) ainsi que deux patterns additionnels (Factory, Observer).
              Le jeu inclut une interface graphique complète avec Canvas HTML5, un système de logging
              pour la traçabilité, et respecte les principes SOLID de la programmation orientée objet.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignPatterns;
