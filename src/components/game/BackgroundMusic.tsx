import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const createRetroMusic = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.15; // Volume réduit pour être en arrière-plan
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Mélodie principale (notes en Hz)
    const melody = [
      { freq: 523.25, duration: 0.3 }, // C5
      { freq: 587.33, duration: 0.3 }, // D5
      { freq: 659.25, duration: 0.3 }, // E5
      { freq: 698.46, duration: 0.3 }, // F5
      { freq: 783.99, duration: 0.6 }, // G5
      { freq: 659.25, duration: 0.3 }, // E5
      { freq: 698.46, duration: 0.3 }, // F5
      { freq: 783.99, duration: 0.6 }, // G5
      { freq: 698.46, duration: 0.3 }, // F5
      { freq: 659.25, duration: 0.3 }, // E5
      { freq: 587.33, duration: 0.3 }, // D5
      { freq: 523.25, duration: 0.6 }, // C5
    ];

    // Basse (octave inférieure)
    const bass = [
      { freq: 261.63, duration: 0.6 }, // C4
      { freq: 293.66, duration: 0.6 }, // D4
      { freq: 329.63, duration: 0.6 }, // E4
      { freq: 349.23, duration: 0.6 }, // F4
      { freq: 392.00, duration: 0.6 }, // G4
      { freq: 329.63, duration: 0.6 }, // E4
    ];

    let currentTime = ctx.currentTime;

    const playLoop = () => {
      // Jouer la mélodie
      melody.forEach((note) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = 'square'; // Son rétro 8-bit
        osc.frequency.value = note.freq;
        
        noteGain.gain.setValueAtTime(0, currentTime);
        noteGain.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
        noteGain.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
        
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        
        osc.start(currentTime);
        osc.stop(currentTime + note.duration);
        
        oscillatorsRef.current.push(osc);
        currentTime += note.duration;
      });

      // Jouer la basse
      let bassTime = ctx.currentTime;
      bass.forEach((note) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = 'triangle'; // Son plus doux pour la basse
        osc.frequency.value = note.freq;
        
        noteGain.gain.setValueAtTime(0, bassTime);
        noteGain.gain.linearRampToValueAtTime(0.2, bassTime + 0.01);
        noteGain.gain.exponentialRampToValueAtTime(0.01, bassTime + note.duration);
        
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        
        osc.start(bassTime);
        osc.stop(bassTime + note.duration);
        
        oscillatorsRef.current.push(osc);
        bassTime += note.duration;
      });

      // Répéter la boucle
      const totalDuration = currentTime - ctx.currentTime;
      setTimeout(() => {
        if (isPlaying) {
          playLoop();
        }
      }, totalDuration * 1000);
    };

    playLoop();
  };

  const toggleMusic = () => {
    if (isPlaying) {
      // Arrêter la musique
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillateur déjà arrêté
        }
      });
      oscillatorsRef.current = [];
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Démarrer la musique
      createRetroMusic();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      // Nettoyage lors du démontage
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillateur déjà arrêté
        }
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMusic}
      className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg bg-card/90 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all"
      title={isPlaying ? 'Désactiver la musique' : 'Activer la musique'}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-primary animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </Button>
  );
};
