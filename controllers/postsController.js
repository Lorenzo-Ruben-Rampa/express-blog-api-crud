// Import dei dati
const menu = require('../data/posts');
const { post } = require('../routers/posts');

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
    // console.log(req.body);
    // res.send(`Creazione nuovo post`);
    // Creo un nuovo id e ritorno l'ultimo elemento id di menu +1
    const newId = menu[menu.length -1].id +1;
    // Creo un nuovo oggetto post
    const newPost = {
        id: newId,
        name: req.body.name,
        content: req.body.content,
        image: req.body.image,
        tag: req.body.tags
    }
    // Aggiungo il nuovo post al menu
    menu.push(newPost);
    console.log(menu);

    // Restituisco lo status 201 e il nuovo post creato
    res.status(201);
    res.json(newPost);
}

function update(req, res) {
    // res.send(`Modifica integrale del post` + req.params.id)

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
    // modifico i dati del post invididuato
        post.title = req.body.title;
        post.content = req.body.content;
        post.image = req.body.image;
        post.tags = req.body.tags;     
    
        // Stampo in console il menu per un check
        console.log(menu);
        
    // Ritorno l'oggetto modificato
    res.json(post);
}

function modify(req, res) {
    // res.send(`Modifica parziale del post n° ` + req.params.id);
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
    //operatore ternario
    if (req.body.title) {
        post.title = req.body.title;
    } else {
        post.title = post.title;
    }

    // stampiamo in console il menu
    console.log(menu);


    // ritorniamo l'oggetto modificato
    res.json(post);
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