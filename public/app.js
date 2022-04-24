const reservationsService = new ReservationsService();
const todo = new ToDo(reservationsService);

todo.init();