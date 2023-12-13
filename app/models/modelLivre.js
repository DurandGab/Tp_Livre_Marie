const nano = require('nano')('http://rfm4338a:root@127.0.0.1:5984');
const dbLivres = nano.db.use('livres');

//Get tous les livres
const  listeDesLivres = async () => {
    const query = {
        "selector": {},
        "fields": ["numero", "titre", "pages"],
        "sort": ["titre", "numero", "pages"],
    };
    try {
        let livres = await dbLivres.find(query);
        return livres.docs
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}


//Get un livre en fonction du numéro
const LivreNum = async (getNumero) => {
    const query = {
        "selector":{"numero" : getNumero},
        "fields": ["titre", "pages"],
    }
    try {
        let livres = await dbLivres.find(query);
        return livres.docs[0]
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

//Get toutes les pages d'un livre
const PagesLivre = async (getNumero) => {
    const query = {
        "selector":{"numero" : getNumero},
        "fields": ["pages"],
    }
    try {
        let livres = await dbLivres.find(query);
        return livres.docs[0].pages
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

//Get une page d'un livre

const PageLivre = async (getNumero) => {
    const query = {
        "selector":{"numero" : getNumero},
        "fields": ["pages"],
    }
    try {
        let livres = await dbLivres.find(query);
        return livres.docs[0].pages
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

//Post d'un livre
const NewLivre = async (newLivre) => {
    try {
        let insertLivre = await dbLivres.insert(newLivre);
        return insertLivre
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

//Récuperation du num Livre
const GetLivreByNumber = async (numLivreToUpdate) => {
    const query = {
        "selector": { "numero": numLivreToUpdate },
        "fields": ["_id", "_rev"],
    };

    try {
        const livreToGet = await dbLivres.find(query);
        return livreToGet.docs[0];
    } catch (error) {
        throw error;
    }
}
//Put d'un livre
const UpdateLivre = async (updatedLivre) => {
    try {
        const updatedLivreResult = await dbLivres.insert(updatedLivre);
        return updatedLivreResult;
    } catch (error) {
        throw error;
    }
}

//Delete Livre
const DeleteLivre = async (id, rev) => {
    try {
        const result = await dbLivres.destroy(id, rev);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { listeDesLivres,LivreNum,PagesLivre,PageLivre,NewLivre,GetLivreByNumber,UpdateLivre,DeleteLivre }