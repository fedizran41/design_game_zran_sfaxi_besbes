// Générateur d'effets sonores rétro 8-bit
class SoundEffects {
  private audioContext: AudioContext | null = null;
  private masterVolume = 0.3;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  // Son de saut - fréquence montante rapide
  jump() {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(this.masterVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }

  // Son de collecte de pièce - tintement brillant
  coin() {
    const ctx = this.getContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    
    osc1.frequency.setValueAtTime(988, ctx.currentTime); // B5
    osc2.frequency.setValueAtTime(1319, ctx.currentTime); // E6
    
    osc1.frequency.setValueAtTime(1319, ctx.currentTime + 0.05); // E6
    osc2.frequency.setValueAtTime(1568, ctx.currentTime + 0.05); // G6

    gain.gain.setValueAtTime(this.masterVolume * 0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.15);
  }

  // Son de collision - impact descendant
  hit() {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(this.masterVolume * 1.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }

  // Son de défaite d'ennemi - rapide et satisfaisant
  enemyDefeat() {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(this.masterVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }

  // Son de power-up vitesse - montée rapide énergique
  speedPowerUp() {
    const ctx = this.getContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'square';
    osc2.type = 'square';
    
    osc1.frequency.setValueAtTime(440, ctx.currentTime); // A4
    osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2); // A5
    
    osc2.frequency.setValueAtTime(554, ctx.currentTime); // C#5
    osc2.frequency.exponentialRampToValueAtTime(1108, ctx.currentTime + 0.2); // C#6

    gain.gain.setValueAtTime(this.masterVolume * 0.7, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.25);
  }

  // Son de power-up invincibilité - son magique/mystérieux
  invincibilityPowerUp() {
    const ctx = this.getContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'sine';
    
    // Arpège ascendant
    osc1.frequency.setValueAtTime(523, ctx.currentTime); // C5
    osc2.frequency.setValueAtTime(659, ctx.currentTime + 0.08); // E5
    osc3.frequency.setValueAtTime(784, ctx.currentTime + 0.16); // G5

    gain.gain.setValueAtTime(this.masterVolume * 0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime + 0.08);
    osc3.start(ctx.currentTime + 0.16);
    osc1.stop(ctx.currentTime + 0.35);
    osc2.stop(ctx.currentTime + 0.35);
    osc3.stop(ctx.currentTime + 0.35);
  }

  // Son de fin de niveau - fanfare de victoire
  levelComplete() {
    const ctx = this.getContext();
    const notes = [
      { freq: 523, time: 0 },      // C5
      { freq: 659, time: 0.1 },    // E5
      { freq: 784, time: 0.2 },    // G5
      { freq: 1047, time: 0.3 },   // C6
    ];

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);

      gain.gain.setValueAtTime(this.masterVolume * 0.8, ctx.currentTime + note.time);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.time + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + note.time);
      osc.stop(ctx.currentTime + note.time + 0.3);
    });
  }

  // Son de game over - descente dramatique
  gameOver() {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.5); // A2

    gain.gain.setValueAtTime(this.masterVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  }

  // Son de victoire contre un boss - fanfare triomphante
  bossDefeat() {
    const ctx = this.getContext();
    
    // Play a triumphant ascending sequence
    const notes = [262, 330, 392, 523, 659]; // C, E, G, C5, E5
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);
      
      gain.gain.setValueAtTime(this.masterVolume * 0.3, ctx.currentTime + index * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.15 + 0.2);
      
      osc.start(ctx.currentTime + index * 0.15);
      osc.stop(ctx.currentTime + index * 0.15 + 0.2);
    });
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Export singleton instance
export const soundEffects = new SoundEffects();
