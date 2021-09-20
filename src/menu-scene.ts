import 'phaser';
import particleUrl from '../assets/particle.png';
import gaspUrl from '../assets/gasp.mp3';
import { gameHeight, gameWidth } from './config';

export class MenuScene extends Phaser.Scene {
  private startKey!: Phaser.Input.Keyboard.Key;
  private sprites: { s: Phaser.GameObjects.Image, r: number }[] = [];

  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  preload(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S,
    );
    this.startKey.isDown = false;
    this.load.image('particle', particleUrl);
    this.load.audio('gasp', gaspUrl);
  }

  create(): void {
    this.add.text(0, 0, 'Press S to restart scene', {
      fontSize: '60px',
      fontFamily: "Helvetica",
    });

    this.add.image(100, 100, 'particle');

    for (let i = 0; i < 300; i++) {
      const x = Phaser.Math.Between(-64, gameWidth);
      const y = Phaser.Math.Between(-64, gameHeight);

      const image = this.add.image(x, y, 'particle');
      image.setBlendMode(Phaser.BlendModes.ADD);
      this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
    }
  }

  update(): void {
    if (this.startKey.isDown) {
      this.sound.play('gasp');
      this.scene.start(this);
    }

    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i].s;

      sprite.y -= this.sprites[i].r;

      if (sprite.y < -256) {
        sprite.y = gameHeight;
      }
    }

  }
}