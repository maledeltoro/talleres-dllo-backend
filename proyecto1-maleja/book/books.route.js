const express = require('express')
const router = express.Router();
const { readBookConFiltros, createBook, updateBook, deleteBookHandler, getAvailableBooks, getMyBooks  } = require("./books.controller.js");
const { respondWithError } = require('../utils/functions.js');
const verifyToken = require("../auth/auth.jwt.js");
const  permissions  = require('../middleware/permissions.middleware.js');

async function GetBooks(req, res) {
    try {
        const resultadosBusqueda = await readBookConFiltros(req.params, req.query);

        if (Array.isArray(resultadosBusqueda) && resultadosBusqueda.length === 0) {
            return res.status(404).json({ msg: "No se encontraron libros con los criterios especificados." });
        }

        res.status(200).json(resultadosBusqueda);
    } catch (e) {
        res.status(500).json({ msg: "Error al recuperar los libros", error: e.message });
    }
}

async function PostBook(req, res) {
    try {
        await createBook(req.body);

        res.status(200).json({
            mensaje: "Exito"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}


async function PatchBooks(req, res) {
    try {
        const bookId = req.params.bookId;

        await updateBook(req, res);
    } catch (e) {
        respondWithError(res, e);
    }
}


async function DeleteBooks(req, res) {
    try {
        const id = req.params.id;
        await deleteBookHandler(req, res);

    } catch (e) {
        respondWithError(res, e);
    }
}

router.get("/:bookId?", GetBooks);
router.post("/", verifyToken, permissions.canCreateBook, PostBook);
router.patch("/:bookId", verifyToken, permissions.canEditBook, PatchBooks);
router.delete("/:id", verifyToken, permissions.canDeleteBook, DeleteBooks);



module.exports = router;