const express = require("express");
const app = express(express.json());


app.use(express.json());

const { routeLivre } = require("./app/routes/routeLivre.js");
app.use(routeLivre);



//         //Put d'un livre
//         app.put("/livres/:numlivre", async (req, res) => {
//             const putNumLivre = parseInt(req.params.numlivre, 10);
//             const query = {
//                 "selector":{"numero" : putNumLivre},
//                 "fields": ["_id", "_rev"],
//             }
//            const getLivre = await dbLivres.find(query)
        
//            const { numero, titre, pages } = req.body;
//            const validateUpdatedLivre = {
//                 numero,
//                 titre,
//                 pages
//             };
        
//             const { value, error } = schema.validate(validateUpdatedLivre);
//                 if (error == undefined) {
//                     const updatedLivre = {
//                         _id : getLivre.docs[0]._id,
//                         _rev : getLivre.docs[0]._rev,
//                         numero,
//                         titre,
//                         pages
//                     };
//                     const newLivre = await dbLivres.insert(updatedLivre);
//                     res.status(201).json(newLivre);
//                 } else {
//                     res.status(500).json({ error: error });
//                 }
//         });

//         app.delete("/livres/:numlivre", async (req, res) => {
//             const deleteNumLivre = parseInt(req.params.numlivre, 10);
//             const query = {
//                 "selector":{"numero" : deleteNumLivre},
//                 "fields": ["_id", "_rev"],
//             }
//            const deleteLivre = await dbLivres.find(query)
//             try {
//                 const result = await dbLivres.destroy(
//                     deleteLivre.docs[0]._id,
//                     deleteLivre.docs[0]._rev,
//                 );
//                 if (result.n === 0) {
//                     return res.status(404).json({ error: "Livre non trouvé" });
//                 }
        
//                 res.status(200).json({ message: "Livre supprimé" });
//             } catch (error) {
//                 console.error("Erreur lors de la suppression du livre:", error);
//                 res.status(500).json({ error: "Erreur interne du serveur" });
//             }
//         });

//         const Joi = require('joi').extend(require('@joi/date'));
//         const schema = Joi.object({
//             numero: Joi.number()
//                 .integer()
//                 .min(1)
//                 .required(),
//             titre : Joi.string()
//                 .min(3)
//                 .max(200)
//                 .required(),
//             pages : Joi.array()
//                 .items(Joi.string())
//                 .min(1)
//                 .required(),
//         })


app.listen(8080, () => {
    console.log("Server started");
  });