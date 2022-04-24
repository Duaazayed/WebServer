const RESERVATIONS_API = `${BASE_API_URL}/reservation`; // http://localhost:5000/api/reservation

class ReservationsService {
  getReservations = () => _get(RESERVATIONS_API, OPTIONS_WITH_AUTH);

  addReservation = (formData) => _post(RESERVATIONS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteReservation = (reservationId) => _delete(`${RESERVATIONS_API}/${reservationId}`, OPTIONS_WITH_AUTH);
}