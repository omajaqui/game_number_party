import Niveles from "./../components/Niveles.js?v1.0";

class Loading extends Phaser.Scene {
  constructor() {
    super('Loading');
    this.targetScene = null; // Escena objetivo
    this.niveles = new Niveles(this);
  }

  init(data) {
    // Recibe el nombre de la escena a cargar desde los datos pasados al iniciar la escena
    this.targetScene = data.sceneToLoad || 'Intro'; // Valor predeterminado si no se proporciona una escena
  }

  preload() {
    // Fondo de gradiente
    this.bgGradient = this.add.graphics();
    this.bgGradient.fillGradientStyle(0x123456, 0x654321, 0x321654, 0xabcdef, 1);
    this.bgGradient.fillRect(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height);

    this.controlBackGroundGradient();        

    this.loadingText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Loading...', {
        font: '32px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // Crear el tween de escala para el efecto de rebote
    this.tweens.add({
        targets: this.loadingText,         // Objetivo de la animación
        scale: { from: 1, to: 1.2 },       // Escala (crecimiento y reducción)
        duration: 500,                     // Duración de cada pulso (en milisegundos)
        ease: 'Sine.easeInOut',            // Suavizado para un rebote natural
        yoyo: true,                        // Hace que la animación regrese a su escala original
        repeat: -1                         // Repite indefinidamente
    });

    // Configuración de colores y dimensiones
    const boxColor = 0x222222; // Color de fondo del cuadro
    const boxAlpha = 0.8;       // Transparencia del cuadro
    const borderRadius = 15;    // Radio de las esquinas redondeadas

    // Posición y tamaño del cuadro
    const boxX = 30, boxY = 300, boxWidth = 900, boxHeight = 30;

    // Dibujar el cuadro con bordes redondeados
    const progressBox = this.add.graphics();
    progressBox.fillStyle(boxColor, boxAlpha);
    progressBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, borderRadius); // Usa fillRoundedRect en lugar de fillRect

    // Barra de progreso
    const progressBar = this.add.graphics().setVisible(false);        

    // Actualizar la barra de progreso mientras se cargan los recursos
    this.load.on('progress', (value) => {
      progressBar.clear().setVisible(true);
      progressBar.fillGradientStyle(0x4ba3f7, 0x2196F3, 0x4ba3f7, 0x2196F3, 1);
      progressBar.fillRoundedRect(boxX + 5, boxY + 5, (boxWidth - 10) * value, boxHeight - 10, borderRadius - 5); // Resta un poco para el borde redondeado
      const percentage = (Math.floor(value * 100) == 100) ? '' : Math.floor(value * 100) + '%'; 
      this.loadingText.setText('Loading... ' + percentage);
    });       

    // Limpiar los gráficos al terminar la carga
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      this.loadingText.destroy();
    });

    // Partículas en movimiento
    this.createParticles();

    // Crear engranajes
    this.createGears();

    // Aquí carga los recursos en función de la escena objetivo
    this.load.path = './assets/';

    //Recursos para todas las scenas
    this.load
      .image('btn_listen',`img/icons/listen.png?${_autoVersionPhaser}`)
      .image('btn_todobien', `img/icons/todoBien.png?${_autoVersionPhaser}`)
      .image('btn_home', `img/icons/home.png?${_autoVersionPhaser}`)        

      .audio('winner', 'sonidos/winner.mp3')
    ;

    switch (this.targetScene ) {
      case 'Intro':
        
        //recursos del componente niveles
        this.load
          .image('bgLevels', `img/backgrounds/bg_levels.png?${_autoVersionPhaser}`)

          //Niveles
          .image('easy', `img/niveles/easy.png?${_autoVersionPhaser}`)
          .image('normal', `img/niveles/normal.png?${_autoVersionPhaser}`)
          .image('hard', `img/niveles/hard.png?${_autoVersionPhaser}`)

          //bg par alas indicaciones de cada nivel
          .image('bg_ScenePpal_indications', `img/backgrounds/bg_ScenePpal_indications.png?${_autoVersionPhaser}`)
          .audio('indications', 'sonidos/indicaciones.mp3')      
        ;

        this.load
          .image('backgroundIntro',`img/backgrounds/backgroundIntro.png?${_autoVersionPhaser}`)
          .image('bgOverlay',`img/backgrounds/overlay_black.png?${_autoVersionPhaser}`)
          .image('btn_music',`img/icons/music_on.png?${_autoVersionPhaser}`)
          .image('recurso_star', `img/niveles/star.png?${_autoVersionPhaser}`)
        ;                
        this.load.audio('backgroundMusic', 'sonidos/bg_Intro.mp3');
      break;

      case 'ScenePpal':
        this.load.image('bgScenePpal',`img/backgrounds/bgScenePpal.png?${_autoVersionPhaser}`)
        // Números
        this.load
          .image('number_1', 'img/niveles/1.png')
          .image('number_2', 'img/niveles/2.png')
          .image('number_3', 'img/niveles/3.png')
          .image('number_4', 'img/niveles/4.png')
          .image('number_5', 'img/niveles/5.png')
          .image('number_6', 'img/niveles/6.png')
          .image('number_7', 'img/niveles/7.png')
          .image('number_8', 'img/niveles/8.png')
          .image('number_9', 'img/niveles/9.png')
          .image('number_10', 'img/niveles/10.png')        

          //Imagenes de numeros
          .image('recurso_1', 'img/niveles/uno.png')
          .image('recurso_2', 'img/niveles/dos.png')
          .image('recurso_3', 'img/niveles/tres.png')
          .image('recurso_4', 'img/niveles/cuatro.png')
          .image('recurso_5', 'img/niveles/cinco.png')
          .image('recurso_6', 'img/niveles/seis.png')
          .image('recurso_7', 'img/niveles/siete.png')
          .image('recurso_8', 'img/niveles/ocho.png')
          .image('recurso_9', 'img/niveles/nueve.png')
          .image('recurso_10', 'img/niveles/diez.png')

          //sonidos translates
          .audio('translate_number_1', 'sonidos/translate_number_1.mp3')
          .audio('translate_number_2', 'sonidos/translate_number_2.mp3')
          .audio('translate_number_3', 'sonidos/translate_number_3.mp3')
          .audio('translate_number_4', 'sonidos/translate_number_4.mp3')
          .audio('translate_number_5', 'sonidos/translate_number_5.mp3')
          .audio('translate_number_6', 'sonidos/translate_number_6.mp3')
          .audio('translate_number_7', 'sonidos/translate_number_7.mp3')
          .audio('translate_number_8', 'sonidos/translate_number_8.mp3')
          .audio('translate_number_9', 'sonidos/translate_number_9.mp3')
          .audio('translate_number_10', 'sonidos/translate_number_10.mp3')

          //Sonidos de motivacion
          .audio('motivation_1', 'sonidos/motivacion1.mp3')
          .audio('motivation_2', 'sonidos/motivacion2.mp3')
          .audio('motivation_3', 'sonidos/motivacion3.mp3')
          .audio('motivation_4', 'sonidos/motivacion4.mp3')
          .audio('motivation_5', 'sonidos/motivacion5.mp3')
          .audio('motivation_6', 'sonidos/motivacion6.mp3')
          .audio('motivation_7', 'sonidos/motivacion7.mp3')
          .audio('motivation_8', 'sonidos/motivacion8.mp3')
          .audio('motivation_9', 'sonidos/motivacion9.mp3')
          .audio('motivation_10', 'sonidos/motivacion10.mp3')
        ;
        
        // Sonidos
        this.load
          .audio('soundTheme', 'sonidos/SoundTheme.mp3')
        ;
      break;      
      
      default:
          break;
    }
      
  }

  create() {
      // Cuando los recursos estén completamente cargados, inicia la escena objetivo
      this.scene.start(this.targetScene);
  }

  createParticles() {
      // Crea un pequeño círculo como textura de partícula
      const particleGraphics = this.add.graphics();
      particleGraphics.fillStyle(0xffffff, 1);
      particleGraphics.fillCircle(5, 5, 5);
      particleGraphics.generateTexture('particle', 10, 10);
      particleGraphics.destroy();

      // Crear un emisor de partículas
      const particles = this.add.particles('particle');
      particles.createEmitter({
          x: { min: 0, max: this.sys.game.canvas.width },
          y: { min: 0, max: this.sys.game.canvas.height },
          speed: { min: -20, max: 20 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.5, end: 0 },
          alpha: { start: 1, end: 0 },
          lifespan: 3000,
          frequency: 100,
          quantity: 2,
          blendMode: 'ADD'
      });
  }

  controlBackGroundGradient() {
      // Crear el rectángulo del fondo
      this.bgGradient = this.add.graphics();

      // Variables para los colores del degradado
      this.color1 = Phaser.Display.Color.RandomRGB();
      this.color2 = Phaser.Display.Color.RandomRGB();
      this.colorStep = 0.01;  // Paso de transición entre colores (velocidad de cambio)

      // Dibujar el fondo inicial
      this.drawGradientBackground();

      // Evento de tiempo para actualizar el fondo regularmente
      this.time.addEvent({
          delay: 50, // Intervalo de tiempo en milisegundos entre cambios
          callback: this.updateGradientColors,
          callbackScope: this,
          loop: true
      });
  }

  drawGradientBackground() {
      // Limpiar el gráfico anterior
      this.bgGradient.clear();

      // Crear el degradado usando `fillGradientStyle`
      this.bgGradient.fillGradientStyle(
          this.color1.color, this.color2.color, 
          this.color2.color, this.color1.color, 1
      );
      
      // Dibuja un rectángulo que cubra toda la pantalla
      this.bgGradient.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
  }

  updateGradientColors() {
      // Interpolar entre colores para suavizar la transición
      this.color1 = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.color1, Phaser.Display.Color.RandomRGB(), 100, 1
      );
      this.color2 = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.color2, Phaser.Display.Color.RandomRGB(), 100, 1
      );

      // Convertir de objeto interpolado a color Phaser.Color
      this.color1 = new Phaser.Display.Color(
          this.color1.r, this.color1.g, this.color1.b
      );
      this.color2 = new Phaser.Display.Color(
          this.color2.r, this.color2.g, this.color2.b
      );

      // Volver a dibujar el fondo con los colores actualizados
      this.drawGradientBackground();
  }

  createGears() {
      const centerX = this.cameras.main.centerX;
      const centerY = this.cameras.main.centerY;

      // Crear engranajes
      this.gear1 = this.add.graphics({ x: centerX - 50, y: centerY -100 });
      this.gear2 = this.add.graphics({ x: centerX + 50, y: centerY -100});

      this.drawGear(this.gear1, 50, 10, 8, 0xffffff);
      this.drawGear(this.gear2, 40, 8, 12, 0xaaaaaa);

      // Animar engranajes
      this.tweens.add({
          targets: this.gear1,
          angle: 360,
          duration: 2000,
          repeat: -1
      });

      this.tweens.add({
          targets: this.gear2,
          angle: -360,
          duration: 1000,
          repeat: -1
      });
  }

  drawGear(graphics, radius, toothHeight, toothCount, color) {
      const stepAngle = Phaser.Math.PI2 / toothCount;
      const innerRadius = radius - toothHeight;

      graphics.fillStyle(color, 1);
      graphics.beginPath();

      for (let i = 0; i < toothCount; i++) {
          const angle1 = i * stepAngle;
          const angle2 = angle1 + stepAngle / 2;
          const angle3 = (i + 1) * stepAngle;

          const x1 = Math.cos(angle1) * innerRadius;
          const y1 = Math.sin(angle1) * innerRadius;
          const x2 = Math.cos(angle2) * radius;
          const y2 = Math.sin(angle2) * radius;
          const x3 = Math.cos(angle3) * innerRadius;
          const y3 = Math.sin(angle3) * innerRadius;

          if (i === 0) {
              graphics.moveTo(x1, y1);
          }

          graphics.lineTo(x2, y2);
          graphics.lineTo(x3, y3);
      }

      graphics.closePath();
      graphics.fillPath();

      // Agregar un círculo central
      graphics.fillStyle(0x000000, 1);
      graphics.fillCircle(0, 0, radius / 4);
  }
}

export default Loading;