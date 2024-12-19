import { validateFix, getTranslate } from "../services/Strings.js";

export default class InfoImagen {
  constructor(scene) {
    this.relatedScene = scene; // La escena en la que estamos trabajando
    this.pauseOverlay = null;
    this.playButton = null;
    this.closeButton = null;

    //variables game
    this.cw = 960;
    this.ch = 540;

    // Lista de objetos interactivos
    this.interactiveObjects = [];
  }  

  show(number) {
    const keyImage = `recurso_${number}`;
    const keyAudiotranslate = `translate_number_${number}`;
    const word = validateFix(number);
    const translate = getTranslate(number); 
    
    // Crear el fondo oscuro con opacidad
    this.pauseOverlay = this.relatedScene.add.graphics();
    this.pauseOverlay.fillStyle(0x000000, 0.8).setDepth(12); // Fondo oscuro con 80% de opacidad
    this.pauseOverlay.fillRect(0, 0, this.relatedScene.cameras.main.width, this.relatedScene.cameras.main.height);

    this.image = this.relatedScene.add
      .image(300, this.ch/2, keyImage)
      .setScale(1.4)
      .setDepth(12)
    ;
    // Crear un gráfico para la máscara redondeada
    this.maskGraphics = this.relatedScene.add.graphics();

    // Configurar el gráfico para dibujar un rectángulo redondeado
    this.maskGraphics.fillStyle(0xffffff, 1); // Color blanco (la máscara no necesita ser visible)
    this.maskGraphics.fillRoundedRect(
      300 - (this.image.displayWidth / 2), // X (ajustado para centrar la imagen)
      this.ch / 2 - (this.image.displayHeight / 2), // Y (ajustado para centrar la imagen)
      this.image.displayWidth,  // Ancho de la imagen
      this.image.displayHeight, // Alto de la imagen
      20 // Radio de los bordes redondeados
    );
    // Establecer la máscara en la imagen
    this.image.setMask(this.maskGraphics.createGeometryMask());

    // Mostar Textos con nombre de imagen y traduccion
    this.textWord = this.relatedScene.add.text(600, 100, word+'.', { font: '60px Arial', fill: '#ffffff' }).setDepth(12);
    this.context = this.relatedScene.add.text(600, 180, 'En inglés se pronuncia', { font: '20px Arial', fill: '#ffffff' }).setDepth(12);
    this.translate = this.relatedScene.add.text(600, 230, translate+'.', { font: '60px Arial', fill: '#ffffff' }).setDepth(12);

    //reproducir audio
    this.audioTranslate = this.relatedScene.sound.add(keyAudiotranslate, { volume: 1, loop: false });
    this.audioTranslate.play();
    
    //botons
    this.buttonClose = this.relatedScene.add.sprite(50, 50, 'btn_todobien')
      .setDepth(12)
      .setScale(0.25)      
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.closeInfo())
    ;
    this.buttonReplay = this.relatedScene.add.sprite(250, 50, 'btn_listen')
      .setDepth(12)
      .setScale(0.25)      
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.replayAudio())
    ;

    // Crear un contenedor (no visible inicialmente)
    this.buttonContainer = this.relatedScene.add
      .container(600, 350, [this.buttonClose ,this.buttonReplay])
      .setVisible(false)
      .setDepth(12)
    ;

    setTimeout(() => {
      this.buttonContainer.setVisible(true);      
    }, 3000);
   
   // Agregar botones a la lista de objetos interactivos
   this.interactiveObjects.push(this.buttonClose, this.buttonReplay);     
  }

  showSearching(number) {
    const keyImage = `recurso_${number}`;

    // Crear el fondo oscuro con opacidad
    this.pauseOverlay = this.relatedScene.add.graphics();
    this.pauseOverlay.fillStyle(0x000000, 0.8).setDepth(12); // Fondo oscuro con 80% de opacidad
    this.pauseOverlay.fillRect(0, 0, this.relatedScene.cameras.main.width, this.relatedScene.cameras.main.height);

    this.image = this.relatedScene.add
      .image(this.cw/2, this.ch/2, keyImage)
      .setScale(1.4)
      .setDepth(12)
    ;
    // Crear un gráfico para la máscara redondeada
    this.maskGraphics = this.relatedScene.add.graphics();

    // Configurar el gráfico para dibujar un rectángulo redondeado
    this.maskGraphics.fillStyle(0xffffff, 1); // Color blanco (la máscara no necesita ser visible)
    this.maskGraphics.fillRoundedRect(
      this.cw / 2 - (this.image.displayWidth / 2), // X (ajustado para centrar la imagen)
      this.ch / 2 - (this.image.displayHeight / 2), // Y (ajustado para centrar la imagen)
      this.image.displayWidth,  // Ancho de la imagen
      this.image.displayHeight, // Alto de la imagen
      20 // Radio de los bordes redondeados
    );
    // Establecer la máscara en la imagen
    this.image.setMask(this.maskGraphics.createGeometryMask());

    const randomNumber = Phaser.Math.RND.integerInRange(1, 10);
    const keyAudioMoyivation = `motivation_${randomNumber}`;

    //reproducir audio
    this.audioTranslate = this.relatedScene.sound.add(keyAudioMoyivation, { volume: 1, loop: false });
    this.audioTranslate.play();    

    setTimeout(() => {
      this.closeInfo();     
    }, 7000);
  }

  replayAudio() {
    if (this.audioTranslate.isPlaying) {
      this.audioTranslate.stop(); // Detiene el audio actual
    }
    this.audioTranslate.play(); // Vuelve a reproducir el audio
  }
  

  closeInfo() {
    //this.relatedScene.scene.resume();

    // Destruir elementos creados
    if (this.pauseOverlay) this.pauseOverlay.destroy();
    if (this.buttonContainer) this.buttonContainer.destroy();
    if (this.image) this.image.destroy();
    if (this.maskGraphics) this.maskGraphics.destroy();
    if (this.textWord) this.textWord.destroy();
    if (this.context) this.context.destroy();
    if (this.translate) this.translate.destroy();

    this.relatedScene.isPaused = false;
    this.relatedScene.controlVisivilityNumbers();

    if(this.relatedScene.lastNumber >= this.relatedScene.config.maxNumber) {
      this.relatedScene.finished = 1;
    } else {
      this.relatedScene.soundTheme.resume();
    }
  }  
}
