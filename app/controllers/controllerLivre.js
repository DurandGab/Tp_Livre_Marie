const modelLivre = require("../models/modelLivre.js");


//Get tous les livres
const getLivres = async (req, res) => {
    try {
        const livres = await modelLivre.listeDesLivres(req, res);
        res.json(livres);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//Get un livre en fonction du numéro
const getLivreNum = async (req, res) => {
    const getNumero = parseInt(req.params.numlivre, 10);

    try {
        const livre = await modelLivre.LivreNum(getNumero);
        if (!livre || livre.length === 0) {
            return res.status(404).json({ error: "Aucun livre trouvé avec ce numéro" });
        }
        res.json(livre);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//Get toutes les pages d'un livre
const getPagesLivre = async (req, res) => {
    const getNumero = parseInt(req.params.numlivre, 10);

    try {
        const livre = await modelLivre.PagesLivre(getNumero);
        if (!livre || livre.length === 0) {
            return res.status(404).json({ error: "Aucun livre trouvé avec ce numéro" });
        }
        res.json(livre);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//Get une page d'un livre
const getPageLivre = async (req, res) => {
    const getNumero = parseInt(req.params.numlivre, 10);
    const getNumPage = parseInt(req.params.numpage, 10);

    try {
        const livre = await modelLivre.PageLivre(getNumero);
        if (!livre || livre.length === 0) {
            return res.status(404).json({ error: "Aucun livre trouvé avec ce numéro" });
        }

        if (getNumPage < 1 || getNumPage > livre.length) {
            return res.status(404).json({ error: "Numéro de page invalide" });
        }
        res.json(livre[getNumPage -1]);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//Post d'un livre
const postLivre = async (req, res) => {
    const { numero, titre, pages} = req.body;

    if (!numero || !titre || !pages) {
        return res.status(400).json({ error: "il manque certaines info pour ajouter un livre" });
    }

    const newLivre = {
        numero,
        titre,
        pages
    };

        const { value, error } = schema.validate(newLivre);
        if (error == undefined) {
            const insertLivre = await modelLivre.NewLivre(newLivre);
            res.status(201).json(insertLivre);
        } else {
            res.status(500).json({ error: error });
        }
}

//Put d'un livre

const putLivre = async (req, res) => {
    const numLivreToUpdate = parseInt(req.params.numlivre, 10);
    const livreToGet = await modelLivre.GetLivreByNumber(numLivreToUpdate);

    if (!livreToGet) {
        return res.status(404).json({ error: 'Livre non trouvé' });
    }

    const { numero, titre, pages } = req.body;
    const validateUpdatedLivre = { numero, titre, pages };

    const { value, error } = schema.validate(validateUpdatedLivre);

    if (error) {
        return res.status(500).json({ error: error });
    }

    const updatedLivre = {
        _id: livreToGet._id,
        _rev: livreToGet._rev,
        numero,
        titre,
        pages
    };

    try {
        const updatedLivreResult = await modelLivre.UpdateLivre(updatedLivre);
        res.status(201).json(updatedLivreResult);
    } catch (error) {
        console.error('Error updating livre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

    //Delete Livre
    const deleteLivre = async (req, res) => {
        const numLivreToUpdate = parseInt(req.params.numlivre, 10);
        const livreToDelete = await modelLivre.GetLivreByNumber(numLivreToUpdate);
    
        if (!livreToDelete) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }
        try {
            const result = await modelLivre.DeleteLivre(livreToDelete._id, livreToDelete._rev);
    
            if (result.n === 0) {
                return res.status(404).json({ error: 'Livre non trouvé' });
            }
    
            res.status(200).json({ message: 'Livre supprimé' });
        } catch (error) {
            console.error('Erreur lors de la suppression du livre:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

const Joi = require('joi');
const schema = Joi.object({
    numero: Joi.number()
        .integer()
        .min(1)
        .required(),
    titre : Joi.string()
        .min(3)
        .required(),
    pages : Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
})         

module.exports = {getLivres,getLivreNum,getPagesLivre,getPageLivre,postLivre,putLivre, deleteLivre}