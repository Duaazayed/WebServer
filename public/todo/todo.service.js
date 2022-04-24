
 class ToDo {
    reservations = [];
    reservationsService;
  
    constructor(reservationsService) {
      this.reservationsService = reservationsService;
    }
  
    init() {
      this.render();
    }
  
    
    _renderListRowItem = (reservation) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `reservation-${reservation.reservation_id}`;
      listGroupItem.className = 'list-group-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('X');
      deleteBtn.id = 'delete-btn';
      deleteBtn.className = 'btn btn-secondary';
      deleteBtn.addEventListener('click', this._deleteEventHandler(reservation.reservation_id));
      deleteBtn.appendChild(deleteBtnTxt);
  
      const reservationDateSpan = document.createElement('span');
      const reservationDate = document.createTextNode(reservation.reservation_date);
      reservationDateSpan.appendChild(reservationDate);

      const reservationStartTimeSpan = document.createElement('span');
      const reservationStartTime = document.createTextNode(reservation.reservation_start_time);
      reservationStartTimeSpan.appendChild(reservationStartTime);

      const reservationEndTimeSpan = document.createElement('span');
      const reservationEndTime = document.createTextNode(reservation.reservation_end_time);
      reservationEndTimeSpan.appendChild(reservationEndTime);

      listGroupItem.append(deleteBtn);
      listGroupItem.append(reservationDateSpan);
      listGroupItem.append(reservationStartTimeSpan);
      listGroupItem.append(reservationEndTimeSpan);
  
      return listGroupItem;
    };
  
    
    _renderList = () => {
      const reservationsDiv = document.getElementById('reservations');
      const loadingDiv = reservationsDiv.childNodes[0];
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.id = 'reservations-list';
      ul.className = 'list-group list-group-flush checked-list-box';
  
      this.reservations.map((reservation) => {
        const listGroupRowItem = this._renderListRowItem(reservation);
  
        // add entire list item
        ul.appendChild(listGroupRowItem);
      });
  
      fragment.appendChild(ul);
      reservationsDiv.replaceChild(fragment, loadingDiv);
    };
  
    _renderMsg = () => {
      const reservationsDiv = document.getElementById('reservations');
      const loadingDiv = reservationsDiv.childNodes[0];
      const listParent = document.getElementById('reservations-list');
      const msgDiv = this._createMsgElement('Create some new reservations!');
  
      if (reservationsDiv) {
        reservationsDiv.replaceChild(msgDiv, loadingDiv);
      } else {
        reservationsDiv.replaceChild(msgDiv, listParent);
      }
    };
  
    
    addReservation = async (newReservation) => {
      try {
        const { reservation_date, reservation_start_time, reservation_end_time } = newReservation;
        await this.tasksService.addTask({ reservation_date,reservation_start_time,reservation_end_time }); 
        this.reservations.push(newReservation); // push task with all it parts
      } catch (err) {
        console.log(err);
        alert('Unable to add reservation. Please try again later.');
      }
    };
  
   
    _addReservationEventHandler = () => {
      const reservationDateInput = document.getElementById('formInputReservationDate');
      const reservation_date = reservationDateInput.value;

      const reservationStartTimeInput = document.getElementById('formInputReservationStartTime');
      const reservation_start_time = reservationStartTimeInput.value;

      const reservationEndTimeInput = document.getElementById('formInputReservationEndTime');
      const reservation_end_time = reservationEndTimeInput.value;
  
  
      // validation checks
      if (!reservation_date) {
        alert('Please enter a reservation date.');
        return;
      }

      if (!reservation_start_time) {
        alert('Please enter a reservation start time.');
        return;
      }
      if (!reservation_end_time) {
        alert('Please enter a reservation end time.');
        return;
      }
  
      const reservation = { reservation_date, reservation_start_time, reservation_end_time }; // assemble the new task parts
      const { newReservation, newReservationl } = this._createNewReservationl(reservation); // add task to list
  
      this.addReservation(newReservation);
  
      const listParent = document.getElementById('reservation-list');
  
      if (listParent) {
        listParent.appendChild(newReservationl);
      } else {
        this._renderList();
      }
      reservationInput.value = ''; 
    };
  
    
    __createNewReservationl = (reservation) => {
      const reservation_id = this.reservations.length;
      const reservation_date = new Date().toISOString();
      const newReservation = { ...reservation, reservation_id, reservation_date,  reservation_start_time, reservation_end_time };
      const newReservationl = this._renderListRowItem(newReservation);
  
      return { newReservation, newReservationl };
    };
  
    
    deleteReservation = async (reservationId) => {
      try {
        const res = await this.reservationsService.deleteReservation(reservationId);
        this.reservations = this.reservations.filter((reservation) => this.reservation.reservation_id !== reservationId);
  
        if (res !== null) {
          alert('Reservation deleted successfully!');
        }
        return res;
      } catch (err) {
        alert('Unable to delete reservation. Please try again later.');
      }
    };
  
  
    _deleteEventHandler = (reservationId) => () => {
      const reservation = document.getElementById(`reservation-${reservationId}`);
      reservation.remove();
  
      this.deleteReservation(reservationId).then(() => {
        if (!this.reservations.length) {
          this._renderMsg();
        }
      });
    };
  
    _createMsgElement = (msg) => {
      const msgDiv = document.createElement('div');
      const text = document.createTextNode(msg);
      msgDiv.id = 'user-message';
      msgDiv.className = 'center';
      msgDiv.appendChild(text);
  
      return msgDiv;
    };
  
    render = async () => {
      const reservations = await this.reservationsService.getReservations();
  
      try {
        if (reservations.length) {
          this.reservations = reservations;
          this._renderList();
        } else {
          this._renderMsg();
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };
  }