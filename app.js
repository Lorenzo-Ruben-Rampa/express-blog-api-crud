const express = require('express')
const app = express()
const port = 3000

// Registro il body-parser per "application/json"
app.use(express.json());

// Importo il file del routing
const postsRouter = require('./routers/posts');

// Definisco una cartella per i file statici
app.use(express.static('public'));

// Definisco la rotta home
app.get('/', (req, res) => {
	res.send( 'Server del mio blog')
})

// Utilizzo la rotta posts per definire la parte iniziale delle rotte
app.use('/posts', postsRouter)

// Avvio server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
