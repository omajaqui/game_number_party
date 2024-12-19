import GeneralInfo from "../components/GeneralInfo.js";
import NumbersClass from "../clases/numbers.js";
import Comun from "../services/Comun.js";
import InfoImagen from "../components/InfoImagen.js";

class ScenePpal extends Phaser.Scene {
  constructor(){
    super('ScenePpal');
    this.generalInfo = new GeneralInfo(this);
    this.infoImagen = new InfoImagen(this);
    this.comun = new Comun(this);
  }

  init(){
    this.lastNumber = 0;
    this.scoreError = 0;
    this.scoreErroLimit = 3;    
    this.isPaused = false;    
    this.finished = 0;
    this.config = this.comun.getDataLocalStorage('gameConfig');
  }

  preload(){
    this.load.path = './assets/';    
  }

  create(){    
    this.background = this.add.tileSprite(480, 270, 960, 540, 'bgScenePpal')
      .setScale(1)       // Ajusta el factor de escala según el tamaño que deseas en la escena
      .setScrollFactor(0)
    ;

    this.btnHome = this.add.sprite(40, 40, 'btn_home')
      .setAlpha(1)
      .setScale(0.3)
      .setInteractive({cursor:'pointer'})
      .setVisible(true)
    ;

    //INTERACION CON EL BOTON INCIO        
    this.btnHome.on('pointerover', () => { this.btnHome.setScale(0.35); });
    this.btnHome.on('pointerout', () => {  this.btnHome.setScale(0.3); });
    this.btnHome.on('pointerdown', () => {
      if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
        this.backgroundMusic.stop();
      }      
      if (this.soundTheme && this.soundTheme.isPlaying) {
        this.soundTheme.stop();
      }
      if (this.playerSonund && this.playerSonund.isPlaying) {
        this.playerSonund.stop();
      }
      this.scene.start('Intro'); 
    }); 

    //Sonido de fondo
    this.soundTheme = this.sound.add('soundTheme', { volume: 0.5, loop: true });
    this.soundTheme.play();      
      
    // CREATE KEYBOARD CURSOS
    this.cursors = this.input.keyboard.createCursorKeys();
    //this.generalInfo.create();
    
    this.numbers = new NumbersClass(this.physics.world, this);
    this.numbers.showNumbers();    
  }

  handleClick(sprite, number) {
    if (number === this.lastNumber + 1) {
      this.lastNumber = number;
      this.scoreError = 0;
      // Aquí puedes ejecutar cualquier lógica que desees
      sprite.setTint(0xff0000); // Cambiar el color como ejemplo
      this.tweens.add({
          targets: sprite,
          scale: 0,
          duration: 500,
          ease: 'Power2',
          onComplete: () => sprite.destroy(), // Eliminar el sprite después de la animación
      });
      this.isPaused = true;
      this.soundTheme.pause();
      this.infoImagen.show(number);
      this.controlVisivilityNumbers();
    } else {
      this.scoreError += 1;
      if (this.scoreError === this.scoreErroLimit) {
        this.scoreError = 0;
        this.isPaused = true;
        this.soundTheme.pause();
        this.controlVisivilityNumbers();
        this.infoImagen.showSearching(this.lastNumber + 1);
      }
    }
  }

  controlVisivilityNumbers() {
    this.numbers.setVisibility(!this.isPaused);
  }
   
  update(time, delta){
    if(this.finished > 0){
      this.scene.start('Winner');
      this.finished = 0;
    }   
  }
}

export default ScenePpal;