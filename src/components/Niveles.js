import Comun from "../services/Comun.js";
export default class Niveles {
  constructor(scene) {
    this.relatedScene = scene;
    this.comun = new Comun();
    
    this.nivelesDisponibles = [];
     
    //variables game
    this.cw = 960;
    this.ch = 540;
    this.sceneToLoad = '';
  }   
  
  preload() {
    this.relatedScene.load.path = './assets/';      
  }

  async create() {
      this.bgLevels = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgLevels').setAlpha(0).setDepth(2);
      
      // Crear un rectángulo semitransparente para oscurecer el fondo
      this.overlay = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgOverlay')
        .setDepth(5)
        .setVisible(false);  // Lo mantenemos invisible hasta que queramos oscurecer
      
      //Definicion de botones
      this.btnHome = this.relatedScene.add.sprite(40, 40, 'btn_home').setAlpha(0).setVisible(false);

      this.soundLevelEasy = this.relatedScene.sound.add('level_easy', { volume: 0.7, loop: false });
      this.soundLevelNormal = this.relatedScene.sound.add('level_normal', { volume: 0.7, loop: false });
      this.soundLevelHard = this.relatedScene.sound.add('level_hard', { volume: 0.7, loop: false });
      

      this.nivel_Easy = this.relatedScene.add.sprite(200, 250, 'easy').setScale(0.8).setDepth(10).setInteractive({cursor:'pointer'});         
      this.nivel_Normal = this.relatedScene.add.sprite(450, 250, 'normal').setScale(0.8).setDepth(10).setInteractive({cursor:'pointer'});
      this.nivel_Hard = this.relatedScene.add.sprite(700, 250, 'hard').setScale(0.8).setDepth(10).setInteractive({cursor:'pointer'});
      
      this.containerNiveles = this.relatedScene.add.container(20, -500, 
        [this.btnHome, this.nivel_Easy, this.nivel_Normal, this.nivel_Hard]
      ).setDepth(10);           
  }

  cargarNivelesDisponibles(){
      return new Promise(async resolve =>{
          //let clave = `AVANCE_JUEGOS_USUARIO_${window.parent.$.IdentificaUsuario}`;
          //this.nivelesDisponibles = await window.parent.cargar_storage(clave);           
          resolve(true);
      });
  }

  styleNiveles(){
      return new Promise(async resolve =>{
          this.nivelesDisponibles.avanceJuego.forEach(item =>{
              switch(item.nivel){
                  //el nivel 1 siempre estará disponible por eso no se valida
                  case "2": //nivel spacio
                      //validar si el nivel esta como disponible 'N'
                      if(item.disponible == "N"){
                          this.nivel_space.setTint(0x1abc9c);
                      }else{
                          this.nivel_space.setInteractive({cursor:'pointer'});
                      }
                  break;
              }
          });
          resolve(true);
      });
  }

  mostrarNiveles(){
    this.overlay.setVisible(true);
    let self = this;

    //mostrar bgDark
    this.relatedScene.tweens.add({
      targets: this.bgLevels,
      alphaTopLeft: { value: 1, duration: 1500, ease: 'Power1' },
      alphaTopRight: { value: 1, duration: 1500, ease: 'Power1' },
      alphaBottomRight: { value: 1, duration: 3000, ease: 'Power1' },
      alphaBottomLeft: { value: 1, duration: 1500, ease: 'Power1', delay: 500 },
    });

    //console.log("mostrar niveles desde componente");
    this.relatedScene.tweens.add({
      targets: [this.containerNiveles],
      y: 0,
      ease: 'Power1',
      duration: 2000,
      onComplete: function () {
        self.interaccionNiveles();
        self.btnHome.setScale(0.25).setDepth(10).setInteractive({cursor:'pointer'}).setVisible(true);
        self.relatedScene.tweens.add({
          targets: self.btnHome,
          alpha: 1,          // Cambia alpha de 0 a 1 (opacidad completa)
          duration: 500,     // Duración de la animación en milisegundos
          ease: 'Power2',    // Efecto de suavizado
        });                                           
      },
    });
  }

  interaccionNiveles(){
    //console.log("establecet interaccion con los btn de los niveles")

    //INTERACION CON EL NIVEL EASY
    this.nivel_Easy.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_Easy,
            scaleX: 1,      // Nuevo valor de escala en X
            scaleY: 1,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
    });  
    this.nivel_Easy.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_Easy,
            scaleX: 0.8,      // Restaurar el valor original de escala en X
            scaleY: 0.8,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_Easy.on('pointerdown', () => {
      this.startLevel('easy');
    });

    //INTERACCION CON EL NIVEL NORMAL
    this.nivel_Normal.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_Normal,
            scaleX: 1,      // Nuevo valor de escala en X
            scaleY: 1,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
    });  
    this.nivel_Normal.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_Normal,
            scaleX: 0.8,      // Restaurar el valor original de escala en X
            scaleY: 0.8,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_Normal.on('pointerdown', () => {
      this.startLevel('normal');
    });

    //INTERACCION CON EL NIVEL HARD
    this.nivel_Hard.on('pointerover', () => {
      this.relatedScene.tweens.add({
          targets: this.nivel_Hard,
          scaleX: 1,      // Nuevo valor de escala en X
          scaleY: 1,      // Nuevo valor de escala en Y
          duration: 200,    // Duración de la animación en milisegundos
          ease: 'Power1',   // Tipo de easing
      });
    });  
    this.nivel_Hard.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_Hard,
            scaleX: 0.8,      // Restaurar el valor original de escala en X
            scaleY: 0.8,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_Hard.on('pointerdown', () => {
      this.startLevel('hard');
    });

    //INTERACION CON EL BOTON HOME        
    this.btnHome.on('pointerover', () => { this.btnHome.setScale(0.35); });
    this.btnHome.on('pointerout', () => {  this.btnHome.setScale(0.3); });
    this.btnHome.on('pointerdown', () => {
      if (this.relatedScene.backgroundMusic && this.relatedScene.backgroundMusic.isPlaying) {
        this.relatedScene.backgroundMusic.stop();
      }
      this.relatedScene.scene.start('Intro'); 
    }); 
  } 

  async startLevel(currentLevel) {
    this.sceneToLoad = 'ScenePpal';

    // Ocultar todos los niveles, estrellas y el boton de home
    this.nivel_Easy.setAlpha(0);
    this.nivel_Normal.setAlpha(0);
    this.nivel_Hard.setAlpha(0);
    this.btnHome.setAlpha(0);

    // Eliminar los eventos previos de interacción => a todos los niveles
    this.nivel_Easy.removeAllListeners('pointerover');
    this.nivel_Easy.removeAllListeners('pointerout');
    this.nivel_Easy.removeAllListeners('pointerdown');
    this.nivel_Normal.removeAllListeners('pointerover');
    this.nivel_Normal.removeAllListeners('pointerout');
    this.nivel_Normal.removeAllListeners('pointerdown');
    this.nivel_Hard.removeAllListeners('pointerover');
    this.nivel_Hard.removeAllListeners('pointerout');
    this.nivel_Hard.removeAllListeners('pointerdown');

    // Objeto de configuración para guardar en localStorage
    let config = {
      difficulty: '',
      maxNumber: '',
      speed: ''
    };

    // Dejar visible solo el nivel seleccionado
    switch (currentLevel) {
      case 'easy':        
        this.nivel_Easy.setAlpha(1);
        // Configuración para el nivel fácil
        config = {
          difficulty: 'easy',
          maxNumber: 5, // Número máximo para este nivel
          speed: 'slow'  // Velocidad para este nivel
        };

        //Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_Easy,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue(config);
          }
        });
        break; 

      case 'normal':        
        this.nivel_Normal.setAlpha(1);

        // Configuración para el nivel normal
        config = {
          difficulty: 'normal',
          maxNumber: 10, // Número máximo para este nivel
          speed: 'medium' // Velocidad para este nivel
        };

        // Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_Normal,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue(config);  
          }
        });
        break; 

      case 'hard':        
        this.nivel_Hard.setAlpha(1);

        // Configuración para el nivel difícil
        config = {
          difficulty: 'hard',
          maxNumber: 10, // Número máximo para este nivel
          speed: 'fast'  // Velocidad para este nivel
        };

        // Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_Hard,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue(config);
          }
        });
        break;

      default:
        sceneToLoad = 'DefaultScene';
        break;
    }    
  }

  async controlContinue(config) {
    localStorage.setItem('gameConfig', JSON.stringify(config));
    if (this.relatedScene.backgroundMusic && this.relatedScene.backgroundMusic.isPlaying) {
      this.relatedScene.backgroundMusic.stop();
    }
    await this.comun.delay(1000);

    switch (config.difficulty) {
      case 'easy':    this.soundLevelEasy.play(); break;
      case 'normal':  this.soundLevelNormal.play();  break;
      case 'hard':    this.soundLevelHard.play(); break;
        break;
    }

    await this.comun.delay(3000);
    this.showIndications();
    setTimeout(() => {
      this.relatedScene.scene.start('Loading', { sceneToLoad: this.sceneToLoad });      
    }, 7000);    
  }

  showIndications() {
    //reproducir audio
    this.audioIndications = this.relatedScene.sound.add('indications', { volume: 1, loop: false });
    this.audioIndications.play();  

    const keyBgIndications = `bg_${this.sceneToLoad}_indications`;
    this.bgLevels.setAlpha(0);
    this.overlay.setAlpha(0);
    this.bgIndications = this.relatedScene.add.image(this.cw/2, this.ch/2, keyBgIndications).setDepth(10);

    // Agregar un texto para el contador regresivo en la esquina inferior derecha
    const countdownText = this.relatedScene.add.text(
      this.cw - 50, // Ajusta la posición horizontal (50px desde el borde derecho)
      this.ch - 50, // Ajusta la posición vertical (50px desde el borde inferior)
      '5', // Texto inicial
      {
          font: '32px Arial',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'center'
      }
    ).setDepth(11).setOrigin(0.5); // Centra el texto

    // Crear el contador regresivo
    let countdownValue = 7;
    const countdownTimer = this.relatedScene.time.addEvent({
        delay: 1000, // 1 segundo
        callback: () => {
            countdownValue--;
            countdownText.setText(countdownValue); // Actualiza el texto
            if (countdownValue <= 0) {
                countdownTimer.remove(); // Detiene el temporizador
                countdownText.destroy(); // Elimina el texto
            }
        },
        repeat: 6 // Se repite 4 veces para llegar a 0
    });
  }
}