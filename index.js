var particle = new Particle();
var token;

// Inicia sesión en Particle y obtiene el token de acceso
particle.login({username: 'lalcaraz11@ucol.mx', password: 'esteban2003pro'}).then(
  function(data) {
    token = data.body.access_token;
  },
  function(err) {
    console.log('Could not log in.', err);
  }
);

// Función para actualizar el color de fondo según el estado del LED
function updateBackground(state) {
  var body = document.getElementById('body');
  var breaker1 = document.getElementById('Breaker1');
  
  if (state === '1') {
    body.style.backgroundColor = '#00CED1'; // Azul celeste cuando está encendido
    breaker1.classList.add('on'); // Añade la clase "on" para cambiar el color del pulgar a amarillo
  } else {
    body.style.backgroundColor = '#002244'; // Azul oscuro cuando está apagado
    breaker1.classList.remove('on'); // Remueve la clase "on" para cambiar el color del pulgar a gris
  }
}

// Configura el slider para controlar el LED y actualizar el fondo
function setupSlider() {
  var breaker1 = document.getElementById('Breaker1');
  var output = document.getElementById('state1');

  breaker1.oninput = function() {
    var Salida1 = this.value;
    output.innerHTML = Salida1;
    updateBackground(Salida1);

    // Llama a la función en el dispositivo Particle
    particle.callFunction({
      deviceId: '0a10aced202194944a059f4c',
      name: 'led',
      argument: Salida1,
      auth: token,
    });
  };
}

// Espera un segundo antes de inicializar el slider para asegurarse de que el token esté disponible
setTimeout(setupSlider, 1000);
