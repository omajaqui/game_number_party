import Comun from "../services/Comun.js";

export default class NumbersClass extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
      super(physicsWorld, scene);
      this.relateScene = scene;
      this.comun = new Comun(this);

      //variables game
      this.cw = 960;
      this.ch = 540;

      this.config = this.comun.getDataLocalStorage('gameConfig');
    }    

    async showNumbers() {
      if (!this.config) {
        console.error('No se encontró la configuración en localStorage.');
        return;
      }      
      
      const { maxNumber, speed } = this.config;
      // Mapeo de velocidades
      const speedMap = {
        slow: 50,
        medium: 100,
        fast: 200
      };

      const velocity = speedMap[speed] || 50; // Valor por defecto: 'slow'
      const widthPosibles = [100, 200, 300, 400, 500, 600, 700, 800];

      // Crear números del 1 hasta maxNumber
      for (let i = 1; i <= maxNumber; i++) {
        const widthtAleatorio = Phaser.Math.RND.pick(widthPosibles);
        const setVelocity = Phaser.Math.RND.pick([-velocity, velocity]);
        const numberSprite = this.create(widthtAleatorio, 0, `number_${i}`)
          .setActive(true)
          .setVisible(true)
          .setGravityY(velocity)
          .setCollideWorldBounds(true)
          .setDepth(10)
          .setScale(0.5)
          .setBounce(1, 1)
          .setVelocityX(setVelocity)
        ;

        // Habilitar eventos de entrada y agregar manejador de clic
        numberSprite.setInteractive();
        numberSprite.on('pointerdown', () => this.relateScene.handleClick(numberSprite, i));
        await this.comun.delay(500);
      }
    }

    setVisibility(isVisible) {
      this.children.each((child) => {
        child.setVisible(isVisible);
        child.setActive(isVisible);
      });
    }
}