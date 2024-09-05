// Crear una instancia del objeto Particle para interactuar con la API de Particle
var particle = new Particle();
var token; // Variable para almacenar el token de autenticación

// Iniciar sesión en Particle usando el nombre de usuario y la contraseña proporcionados
particle.login({username: 'lalcaraz11@ucol.mx', password: 'esteban2003pro'}).then(
  function(data) {
    // Si la autenticación es exitosa, almacenar el token en la variable 'token'
    token = data.body.access_token;

    // Obtener una referencia al elemento del slider en el DOM
    var Ktms = document.getElementById('Ktms');
    
    // Configurar el evento oninput del slider para ejecutar una función cada vez que el usuario lo mueve
    Ktms.oninput = function() {
      // Obtener una referencia al elemento de salida que muestra el valor del slider
      var output = document.getElementById('Kvaluetms');
      
      // Obtener el valor actual del slider
      var val = this.value;
      
      // Mostrar el valor del slider en el elemento de salida
      output.innerHTML = val;

      // Multiplicar el valor del slider por 5 y actualizar el área de datos
      var multipliedValue = val * 5;
      document.getElementById('dataDisplay').innerHTML = `DATA: ${multipliedValue}`;

      // Llamar a la función en el dispositivo Particle con el valor del slider como argumento
      particle.callFunction({
        deviceId: '0a10aced202194944a059f4c', // ID del dispositivo en Particle
        name: 'TMS_2', // Nombre de la función a llamar en el dispositivo
        argument: val, // Argumento que se pasará a la función (valor del slider)
        auth: token // Token de autenticación para acceder al dispositivo
      }).then(
        function(data) {
          // Si la llamada a la función es exitosa, registrar el resultado en la consola
          console.log('Function called successfully:', data);
        },
        function(err) {
          // Si ocurre un error, registrar el error en la consola
          console.log('An error occurred:', err);
        }
      );
    };
  },
  function(err) {
    // Si no se puede iniciar sesión, registrar el error en la consola
    console.log('Could not log in.', err);
  }
);
