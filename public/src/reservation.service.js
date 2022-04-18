const RESERVATION_API = `${BASE_API_URL}/reservation`; // http://localhost:3000/api/reservation

const getRerservation = () => _get(RESERVATION_API, OPTIONS_WITH_AUTH);

const addReservation = (formData) =>
  _post(RESERVATION_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteReservation = (reservation_id) =>
  _delete(`${RESERVATION_API}/${reservation_id}`, OPTIONS_WITH_AUTH);