const { readReservationConFiltros, createReservation } = require("./reservation.action.js");

async function GetBookReservations(req, res) {
    try {
        const { bookId } = req.query;
        if (!bookId) {
            return res.status(400).json({ msg: "El parámetro bookId es requerido." });
        }
        const resultadosBusqueda = await readReservationConFiltros(req.query);
        if (Array.isArray(resultadosBusqueda) && resultadosBusqueda.length === 0) {
            return res.status(404).json({ msg: "No se encontraron reservas para el bookId especificado." });
        }
        const resultadosFormateados = resultadosBusqueda.reduce((acc, reserva) => {
            const { title: bookTitle, author: bookAuthor } = reserva.bookId;
            const { name: userName, email: userEmail } = reserva.userId;
          
            let libro = acc.find(item => item.bookTitle === bookTitle);
          
            if (!libro) {
              libro = { bookTitle, bookAuthor, users: [] };
              acc.push(libro);
            }
          
            libro.users.push({
              userName,
              userEmail,
              reservationDate: reserva.reservationDate,
              deliveryDate: reserva.deliveryDate
            });
          
            return acc;
          }, []);
          
          res.status(200).json(resultadosFormateados);

    } catch (e) {
        res.status(500).json({ msg: "Error al recuperar las reservas", error: e.message });
    }
}

async function GetUserReservations(req, res) {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ msg: "El parámetro userId es requerido." });
        }

        const resultadosBusqueda = await readReservationConFiltros(req.query);
        if (Array.isArray(resultadosBusqueda) && resultadosBusqueda.length === 0) {
            return res.status(404).json({ msg: "No se encontraron reservas para el userId especificado." });
        }

        const resultadosFormateados = resultadosBusqueda.reduce((acc, reserva) => {
            const { name: userName } = reserva.userId;
            const { title: bookTitle, author: bookAuthor } = reserva.bookId;

            let usuario = acc.find(item => item.userName === userName);

            if (!usuario) {
                usuario = { userName, books: [] };
                acc.push(usuario);
            }

            usuario.books.push({
                bookTitle,
                bookAuthor,
                reservationDate: reserva.reservationDate,
                deliveryDate: reserva.deliveryDate
            });

            return acc;
        }, []);

        res.status(200).json(resultadosFormateados);

    } catch (e) {
        res.status(500).json({ msg: "Error al recuperar las reservas", error: e.message });
    }
}



async function PostReservation(req, res) {
    try {
        req.body.reserver = req.userId;
        await createReservation(req.body);

        res.status(200).json({
            mensaje: "Exito"
        })
    } catch (e) {
        respondWithError(res, e);
    }
}

module.exports = { GetBookReservations, PostReservation, GetUserReservations };