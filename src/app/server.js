import express from 'express';
import { Server as SocketIOServer } from 'socket.io'
import { engine } from 'express-handlebars';
import { main } from '../getData/getLiveData.js';
import { UsersManager } from '../manager/user.manager.js';
import { PORT } from '../config/server.config.js';
import { conectar } from "../database/mongoose.js";


const userManager = new UsersManager('./src/db/usersData.json')

const app = express();

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))
app.use(express.json())

const httpServer = app.listen(PORT, () => { console.log(`conectado en el puerto ${PORT}`) });
await conectar()
const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
  console.log(`Nuevo Cliente conectado! id: ${clientSocket.id}`);
  clientSocket.emit('mensajeDesdeServidor', { Conexión: 'Satisfactoria' });

  const matchs = await main();
  clientSocket.emit('firstConection', matchs)

  clientSocket.on('getData', async (data) => {
    async function runMain() {
      while (true) {
        const userData = await userManager.findUserByUsername(data)
        const matchs = await main();

        if (userData) {
          const userPredictions = userManager.getAllUsersPredictions();
          clientSocket.emit('constantData', { matchs, userData, userPredictions })
        } else {
          clientSocket.emit('constantData', { matchs })
        }

        await delay(10000); // Esperar 5 segundos antes de ejecutar nuevamente
      }
    }
    runMain()
  })

  clientSocket.on('addBet', async (data) => {
    const action = await userManager.addBetToUser(data)
    if (action.error === undefined) { } else {
      clientSocket.emit('error', action.error)
    }
  })
  clientSocket.on('updateTable', async (data) => {
    async function runMain() {
      while (true) {
        const usersMatchs = await userManager.getAllUsersPredictions()
        clientSocket.emit('tableData', usersMatchs)
        await delay(60000); // Esperar 1 minuto antes de ejecutar nuevamente
      }
    }
    runMain()
  })
  clientSocket.on('updateUserCorrectPredictions', async (data) => {
    await userManager.setUserCorrectPredictions({ username: data.userID, correctPredictions: data.userCorrectsPredictions, incorrectPredictions: data.userIncorrectsPredictions })
  })
})

app.get('/bets', async (req, res, next) => {
  // const matchs = await main();
  res.render('realTimeBets', {
    cssName: "realTimeStyles",
    pageTitle: 'BETS'
    // matchs
  })
})
app.post('/register', async (req, res, next) => {
  const datosUsuario = req.body;
  try {
    const result = await userManager.addUser(datosUsuario)
    res.status(200).json(result)
  } catch (error) {
    res.json({ error: error.message });
  }
})
app.post('/addbet', async (req, res, next) => {
  const datosUsuario = req.body;
  try {
    // username, tournamentId, matchId, predValues
    userManager.getAllUsersPredictions();
    const result = await userManager.addBetToUser(datosUsuario)
    res.status(200).json(result)
  } catch (error) {
    res.json({ error: error.message });
  }
})

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}