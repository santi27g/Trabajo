let canvas, ctx;

// Tasa de refresco
const FPS = 60;

// Dimensiones del mapa
const MAP_COLUMNS = 20;
const MAP_ROWS = 15;

// Cada cuadrado que compone al mapa
const SQUARE_LENGTH = 40; // Largo del cuadrado

// GANADOR //
let winner = false; // Si hay un ganador
let winnerMessage = 'Sin ganador.'; // Mensaje

// MAPAS //
const MAPS = [map1, map2, map3, map4];
let currentMap = MAPS[0]; // Mapa actual
// Cargar próximo mapa
function loadNextMapLevel() {
  const currentMapIndex = MAPS.indexOf(currentMap);
  if (currentMapIndex + 1 < MAPS.length) {
    currentMap = MAPS[currentMapIndex + 1]; // Próximo mapa

    // Resetea la posición de los autos
    players.forEach((player) => player.resetCar());
  }
}

// ELEMENTOS DEL MAPA //
const PROPULSOR_SPEED = 1.2; // Multiplica la velocidad por 1.2
const OBE_BOUNCE = 2; // Multiplica la velocidad por 2

// AUTO/JUGADORES //
const ROAD_FRICTION = 0.98;
const MINIMUM_SPEED_TO_TURN = 0.4; // Velocidad mínima para girar
const START_DEGREE = -90; // Ángulo de inicio del auto

class Player {
  // El constructor recibe los parámetros necesarios para la creación de un jugador
  constructor({
    id, // Identificador único
    name, // Nombre del auto
    image, // URL imagen

    // Propiedades
    forwardRate, // Aceleración hacia adelante
    reverseRate, // Aceleración hacia atrás
    turningRate, // Aceleración de giro
    crashBounce, // Rebote de choque (0: 0% | 1: 100%)

    // Controles
    forwardKey, // Tecla para adelante
    leftKey, // Tecla para girar izquierda
    reverseKey, // Tecla para reversa
    rightKey, // Tecla para girar derecha
  }) {
    // ATRIBUTOS CONSTANTES //
    this.id = id; // Identificador del auto
    this.name = name; // Nombre

    // Cargar imagen
    const carImage = 'cars/' + image;
    this.image = loadImage(carImage);

    // Propiedades
    this.FORWARD_RATE = forwardRate || 0.1; // por defecto a 0.1
    this.REVERSE_RATE = reverseRate || 0.07;
    this.TURNING_RATE = turningRate || 0.032;

    // Controles
    this.controls = {
      forwardKey,
      leftKey,
      reverseKey,
      rightKey,
    };
    /////////////////////////////

    // ATRIBUTOS VARIABLES //
    // Cambian durante el juego.

    this.startPoint = null; // Punto de comienzo de cada jugador, utilizado para la reaparición

    this.crashBounce = crashBounce || 0.4; // Rebote del auto, por defecto a 0.4

    this.x_pos = 0; // Posición X en el mapa
    this.y_pos = 0; // Posición Y en el mapa
    this.angle = 0; // Ángulo de giro
    this.speed = 0; // Velocidad

    // Teclas presionadas
    // Se inicializan en false, cambian a true si son presionadas
    this.keysPressed = {
      forward: false, // Mientras se esté presionando la tecla designada para avanzar es 'true', sino es false
      left: false,
      reverse: false,
      right: false,
    };
  }

  // Resetea el auto (al empezar el mapa)
  // startPoint: refiere a un índice en el arreglo del mapa donde el
  // jugador va a comenzar
  resetCar = (startPoint) => {
    this.speed = 0; // Detiene el auto

    // Recorre cada cuadrado del mapa
    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLUMNS; col++) {
        let arrayIndex = indexAt(col, row);

        // Ajusta el ángulo
        this.angle = START_DEGREE * (Math.PI / 180); // Convierte

        // Si se entrega un punto de aparición como parámetro, resetear al mismo
        if (startPoint) {
          if (arrayIndex === startPoint) {
            this.x_pos = col * SQUARE_LENGTH + SQUARE_LENGTH / 2;
            this.y_pos = row * SQUARE_LENGTH + SQUARE_LENGTH / 2;
            return;
          }
        }

        // Busca dentro del arreglo del mapa, el número correspondiente a la
        // id del auto y lo reemplaza por ROAD (calle)
        if (currentMap[arrayIndex] === this.id) {
          this.startPoint = arrayIndex;
          currentMap[arrayIndex] = TILES.ROAD.id;

          // Coloca los autos en su respectivo cuadrado de inicio
          this.x_pos = col * SQUARE_LENGTH + SQUARE_LENGTH / 2;
          this.y_pos = row * SQUARE_LENGTH + SQUARE_LENGTH / 2;
          return;
        }
      }
    }
    console.warn(
      `El jugador ${this.name} no tiene un punto de aparición designado.`
    );
  };

  // Calcula la próxima posición del auto en base
  // a el estado de sus atributos variables
  // Esta función se ejecuta en cada tick (60 veces por segundo si son 60FPS)
  calculateNextPosition = () => {
    // Va reduciendo gradualmente la velocidad del auto
    this.speed *= ROAD_FRICTION;

    // Si la tecla designada para avanzar está presionada,
    // aumenta la velocidad teniendo en cuenta
    // la aceleración delantera (forwardRate)
    if (this.keysPressed.forward) this.speed += this.FORWARD_RATE;

    // Si la tecla designada para reversa está presionada,
    // reduce la velocidad teniendo en cuenta
    // la aceleración de reversa (reverseRate)
    if (this.keysPressed.reverse) this.speed -= this.REVERSE_RATE;

    // Verifica si es posible girar el auto en base a la
    // velocidad mínima de giro.
    // Math.abs() devuelve el valor absoluto de un número.
    if (Math.abs(this.speed) > MINIMUM_SPEED_TO_TURN) {
      // Si la tecla designada para girar a la derecha
      // está presionada, aumenta positivamente el ángulo de giro
      // teniendo en cuenta la aceleración de giro (turningRate)
      if (this.keysPressed.right) this.angle += this.TURNING_RATE;

      // Si la tecla designada para girar a la izquierda
      // está presionada, aumenta positivamente el ángulo de giro
      // teniendo en cuenta la aceleración de giro (turningRate)
      if (this.keysPressed.left) this.angle -= this.TURNING_RATE;
    }

    // Modifica la posición del auto teniendo en cuenta
    // el ángulo de giro y la velocidad.
    this.x_pos += Math.cos(this.angle) * this.speed;
    this.y_pos += Math.sin(this.angle) * this.speed;

    // Esta función se encarga de gestionar las colisiones y
    // interacciones con el mapa.
    checkCarColission(this);
  };

  // Esta función dibuja el auto en el mapa en base
  // a el estado de sus atributos
  drawCar = () => {
    moveCanvasImg(this.image, this.x_pos, this.y_pos, this.angle);
  };
}
// Esta función se encarga de gestionar las colisiones y
// interacciones con el mapa.
function checkCarColission(player) {
  // Obtener x, y del jugador en el canvas
  let carX = Math.floor(player.x_pos / SQUARE_LENGTH);
  let carY = Math.floor(player.y_pos / SQUARE_LENGTH);

  // Obtener el bloque de debajo del auto
  let tileId = tileAt(carX, carY);

  // Detectar colisiones
  switch (tileId) {
    case TILES.ROAD.id:
      return;

    case TILES.ROCK.id:
      player.resetCar(player.startPoint);
      return;

    case TILES.PROPULSOR.id:
      player.speed *= PROPULSOR_SPEED;
      return;

    case TILES.GOAL.id:
      // Si es el último mapa, anunciar ganador
      if (MAPS.indexOf(currentMap) + 1 === MAPS.length) {
        winner = true;
        winnerMessage = '\ud83d\ude03  ' + player.name + ' es el ganador!';
      }

      loadNextMapLevel(); // Cargar próximo mapa
      return;

    case TILES.OBE.id:
      return bounce(OBE_BOUNCE); // Rebotar con valor custom

    default:
      return bounce(); // Rebotar
  }

  // Función que hace rebotar al jugador
  function bounce(customValue) {
    // Previene que el auto atraviese las paredes
    player.x_pos -= Math.cos(player.angle) * player.speed;
    player.y_pos -= Math.sin(player.angle) * player.speed;

    // Reversa (rebote)
    player.speed *= -customValue || -player.crashBounce;

    // Prevenir rebote infinito
    if (Math.abs(player.speed) > 100) player.speed = 0;
  }
}

// Se crean dos instancias de la clase Player (dos jugadores)
// y se guardan en el arreglo players para su uso.
let player1 = new Player({
  id: 101,
  name: 'Ladrón',
  image: 'CAR_4.png',
  forwardKey: 'KeyW',
  leftKey: 'KeyA',
  reverseKey: 'KeyS',
  rightKey: 'KeyD',
  // forwardRate: 0.2,
  // turningRate: 0.05,
});
let player2 = new Player({
  id: 102,
  name: 'Policía',
  image: 'CAR_3.png',

  forwardKey: 'ArrowUp',
  leftKey: 'ArrowLeft',
  reverseKey: 'ArrowDown',
  rightKey: 'ArrowRight',
});
const players = [player1, player2];

// IMAGENES //
// Imágenes que utiliza el juego
let images = Object.values(TILES); // Inicializar con las texturas del mapa

// Agregar tambien las texturas de cada jugador.
players.map((player) => {
  images.push({
    id: player.id,
    element: player.image,
  });
});

// CONTROLES
// Esta función se ejecuta cuando una tecla es pulsada o soltada
function handleKey(keyEvent, pressed) {
  // el parámetro pressed define si la tecla fué pulsada(true) o soltada(false)

  const pressedKey = keyEvent.code; // Obtener que tecla fue pulsada/soltada

  // Para cada jugador, verificar si la tecla pulsada/soltada corresponde
  // a uno de sus controles
  players.forEach((player) => {
    if (pressedKey === player.controls.forwardKey) {
      // Si la tecla pulsda/soltada es la tecla asignada pra ir hacia
      // adelante, entonces establecer que fue persionada o soltada dicha tecla
      // en los atributos del auto
      player.keysPressed.forward = pressed;
    }
    if (pressedKey === player.controls.leftKey) {
      player.keysPressed.left = pressed;
    }
    if (pressedKey === player.controls.reverseKey) {
      player.keysPressed.reverse = pressed;
    }
    if (pressedKey === player.controls.rightKey) {
      player.keysPressed.right = pressed;
    }
  });
}

// Esta función se ejecuta al cargarse completamente la ventana
function main() {
  canvas = document.querySelector('#gameCanvas');
  ctx = canvas.getContext('2d');

  // Ajustar medida del canvas
  canvas.height = SQUARE_LENGTH * MAP_ROWS;
  canvas.width = SQUARE_LENGTH * MAP_COLUMNS;

  // Refrescar y redibujar el canvas 60 veces por segundo
  setInterval(() => {
    if (!winner)
      players.forEach((player) => {
        player.calculateNextPosition();
      });

    drawAllElements();
  }, 1000 / FPS);

  // Key listeners
  document.addEventListener('keydown', (e) => handleKey(e, true));
  document.addEventListener('keyup', (e) => handleKey(e, false));

  // Resetea la posición de los autos
  players.forEach((player) => player.resetCar());
}
window.onload = main; // Punto de partida

// FUNCIONES UTILIDAD //

// Función que dado un punto (x, y) del mapa, devuelve el bloque colocado
// en ese mismo punto
// Si no se encuentra un bloque, devuelve por defecto WALL
function tileAt(x, y) {
  if (x >= 0 && x < MAP_COLUMNS && y >= 0 && y < MAP_ROWS) {
    let index = indexAt(x, y);
    return currentMap[index];
  } else return TILES.WALL.id;
}

// Función que dado un punto (x, y) del mapa, devuelve el respectivo
// índice de ese punto en el arreglo del mapa
function indexAt(x, y) {
  return x + MAP_COLUMNS * y;
}

// FUNCIONES PARA MANIPULAR EL CANVAS //

// Función que dibuja los elementos del mapa
function drawTrackElements() {
  let imageX = 0;
  let imageY = 0;

  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLUMNS; x++) {
      // Encuentra una imágen que corresponda a la posición del mapa
      let tile = images.find((tile) => tile.id === tileAt(x, y));
      if (!tile) tile = images[0]; // Si no se encuentra, utilizar placeholder
      ctx.drawImage(tile.element, imageX, imageY);

      imageX += SQUARE_LENGTH;
    }
    imageY += SQUARE_LENGTH;
    imageX = 0;
  }
}

function drawAllElements() {
  // Anunciar si hay un ganador
  if (winner) {
    drawRectangle(95, canvas.height / 4, 600, 75, 'black');
    drawText(winnerMessage, 100, canvas.height / 3, 'yellow', 40);
    currentMap = MAPS[0];
    return;
  }

  // Dibujar el mapa
  drawTrackElements();

  // Dibujar a los jugadores
  players.forEach((player) => player.drawCar());
}

// Mueve una imágen del canvas.
// Utilizado para el movimiento del auto
function moveCanvasImg(myImage, posX, posY, atAngle) {
  // Guardar el estado del canvas antes de hacer algún cambio en él
  ctx.save();

  // Mueve, rota y redibuja el canvas para que se ajuste a la posición
  // de cada auto
  ctx.translate(posX, posY);
  ctx.rotate(atAngle);
  ctx.drawImage(myImage, -myImage.width / 2, -myImage.height / 2);

  // Regresa el resto del canvas a su estado original
  ctx.restore();
}

// Crea un rectángulo en determinada posición
function drawRectangle(topLeftX, topLeftY, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(topLeftX, topLeftY, width, height);
}

// Crea texto en determinada posición
function drawText(showWords, textX, textY, color, fontSize) {
  let font = String(fontSize + 'px sans-serif');
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(showWords, textX, textY);
}
