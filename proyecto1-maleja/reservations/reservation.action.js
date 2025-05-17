const Reservation = require('../reservations/reservation.model');

async function readReservationConFiltros(query) {
  const filtros = {};
  if (query.bookId) {
    filtros.bookId = query.bookId;
  }

  if (query.userId) {
    filtros.userId = query.userId;
  }

  return Reservation.find(filtros)
    .populate('userId', 'name email')
    .populate('bookId', 'title author')
    .then(reservas => reservas)
    .catch(error => {
      console.error("Error al recuperar reservas:", error);
      throw error;
    });
}


const createReservation = async (data) => {
  const reserva = new Reservation(data);
  await reserva.save();
}

module.exports = { readReservationConFiltros, createReservation };
