const express = require("express");
const routeLivre = express.Router()

const controllerLivre =
require("../controllers/controllerLivre.js");

routeLivre.get("/", (req, res) => {
    res.json('API des livres');
  });

//Get tous les livres
routeLivre.get("/livres", (req, res) => {
    controllerLivre.getLivres(req, res)
})

//Get un livre en fonction du numéro
routeLivre.get("/livres/:numlivre", (req, res) => {
    controllerLivre.getLivreNum(req, res)
})

//Get toutes les pages d'un livre
routeLivre.get("/livres/:numlivre/pages", (req, res) => {
    controllerLivre.getPagesLivre(req, res)
})

//Get une page d'un livre
routeLivre.get("/livres/:numlivre/pages/:numpage", (req, res) => {
    controllerLivre.getPageLivre(req, res)
})

//Post d'un livre
routeLivre.post("/livres", (req, res) => {
    controllerLivre.postLivre(req, res)
})

//Put d'un livre
routeLivre.put("/livres", (req, res) => {
    controllerLivre.putLivre(req, res)
})

//Delete Livre
routeLivre.delete("/livres/:numlivre", (req, res) => {
    controllerLivre.deleteLivre(req, res)
})

module.exports = { routeLivre };
