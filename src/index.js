const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
app.use(express.json());
const path = require('path');


//setting app
app.set('port', 3001);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// routes
app.get('/user', (req, res) => {
    res.json({
      "id": "0001",
      "name": "Cesar Aldazoro",
      "fono": "953973837",
      "edad": "30"
    });
  });
  
  // Ruta GET para mostrar las horas reservadas
  app.get('/api/horas', (req, res) => {
    const dataPath = join(__dirname, 'reservas.json');
  
    readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al leer el archivo de reservas' });
      }
      const reservas = JSON.parse(data);
      res.json(reservas);
    });
  });

  // Ruta POST para agregar una nueva reserva
app.post('/api/reservar', (req, res) => {
    const dataPath = join(__dirname, 'reservas.json');
  
    // Leer las reservas existentes
    readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al leer las reservas existentes' });
      }
  
      const reservas = JSON.parse(data); // Convertir texto a objeto JSON
      const nuevaReserva = req.body; // Los datos que el cliente envió
  
      reservas.push(nuevaReserva); // Agregar la nueva reserva a la lista
  
      // Guardar la nueva lista en reservas.json
      writeFile(dataPath, JSON.stringify(reservas, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ mensaje: 'Error al guardar la nueva reserva' });
        }
        res.status(201).json({ mensaje: 'Reserva guardada exitosamente' });
      });
    });
  });
// Levantando el servicio HTTP
//app.listen(app.get('port'),() => {
//   console.log(`Servidor iniciado! ${app.get('port')}`);
//});
const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
  );
  
  sslServer.listen(app.get('port'), () => {
    console.log(`Servidor iniciado! ${app.get('port')}`);
  });
