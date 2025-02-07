// Import dei dati
const menu = require('../data/posts');

// Funzioni con logica relativa alla rotta dei post
function index(req, res) {
    res.json({
        message: "Lista dei post",
        posts: menu
    });
}

function show(req, res) {
    const postId = req.params.id;
    const foundPost = posts.find(post => post.id == postId);

    if (foundPost) {
        res.json({
            message: `Dettagli del post n° ${postId}`,
            post: foundPost
        });
    } else {
        res.status(404).json({ message: "Post non trovato" });
    }
}

function store(req, res) {
    res.send(`Creazione nuovo post`);
}

function update(req, res) {
    res.send(`Modifica integrale del post` + req.params.id)
}

function modify(req, res) {
    res.send(`Modifica parziale del post` + req.params.id);
}

function destroy(req, res) {
    res.send(`Cancellazione del post` + req.params.id);
}

// esporto
module.exports = { index, show, store, update, modify, destroy };