// Import dei dati
const menu = require('../data/posts');

// Funzioni con logica relativa alla rotta dei post
function index(req, res) {
    // res.json({
    //     message: "Lista dei post",
    //     posts: menu
    // });

     //Ora il menu filtrato = menu originale
     let filteredMenu = menu;

     // Se la richiesta contiene un filtro tag, filtro il menu
     if (req.query.tag) {
         filteredMenu = menu.filter(
             post => post.tags.includes(req.query.tag)
         );
     }
 
     // restituiamo la variabile filteredMenu, che sia filtrata o meno
     res.json(filteredMenu);
 }

function show(req, res) {
     // recuperiamo l'id dall' URL e trasformiamolo in numero
     const id = parseInt(req.params.id)

     // cerchiamo il post tramite id
     const post = menu.find(post => post.id === id);
 
     // Condizione if
     if (!post) {
 
         // ritorno lo stato di errore 404, non trovato
         res.status(404);
 
         // ritorno un messaggio di errore (formato json)
         return res.json({
             error: "Not Found",
             message: "Post non trovato"
         })
     }
 
     // Restituiamolo sotto forma di JSON   
     res.json(post);
 }
 

function store(req, res) {
    console.log(req.body);
    res.send(`Creazione nuovo post`);
}

function update(req, res) {
    res.send(`Modifica integrale del post` + req.params.id)
}

function modify(req, res) {
    res.send(`Modifica parziale del post` + req.params.id);
}

function destroy(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)
    // cerchiamo il post per id
    const post = menu.find(post => post.id === id);
    // Condizione if
    if (!post) {

        // ritorno lo stato di errore 404, non trovato
        res.status(404);

        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }
     // cancello il post trovato
     menu.splice(menu.indexOf(post), 1);
     //stampo in terminale la lista aggiornata
     console.log(menu);
    // ritorno la risposta positiva di avvenuta cancellazione
    res.sendStatus(204);
}

// esporto
module.exports = { index, show, store, update, modify, destroy };