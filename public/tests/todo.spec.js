const reservationsService = new ReservationsService();
const todo = new ToDo(reservationsService);

describe('Todo App', () => {
  it('should initialize some HTML', () => {
    spyOn(todo, 'init');
    todo.init();

    expect(todo.init).toHaveBeenCalled();
  });

  it('should add a reservation', async () => {
    const newReservation = {
      reservation_id: 1,
      reservation_date: '2022-04-24',
      reservation_start_time: '10:50:32',
      reservation_end_time: '11:50:32',
    };
    const addReservationServiceSpy = spyOn(reservationsService, 'addReservation');

    expect(todo.reservations.length).toBe(0);

    await todo.addReservation(newReservation);

    expect(addReservationServiceSpy).toHaveBeenCalled();
    expect(todo.reservations.length).toBe(1);
  });

  it('should delete a reservation', async () => {
    const existingReservation = {
      reservation_id: 1,
      reservation_date: '2022-04-24',
      reservation_start_time: '22:50:32',
      reservation_end_time: '23:50:32',
    };
    const deleteReservationServiceSpy = spyOn(reservationsService, 'deleteReservation');

    expect(todo.reservations.length).toBe(1);

    await todo.deleteReservation(existingReservation.reservation_id);

    expect(deleteReservationServiceSpy).toHaveBeenCalled();
    expect(todo.reservations.length).toBe(0);
  });

  xit('should update an individual reservation', () => {
    // ..
  });
});