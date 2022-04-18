class ReservationList {
  reservation = [];

  constructor() {}
 
  
    createReservationListParent = () => {
      const tr = document.createElement('tr');
      tr.id = 'Reservation-list';
      tr.className = 'list-group list-group-flush checked-list-box';
      return tr;
    };
  
    _deleteEventHandler = (reservation_id) => async () => {
      if (reservation_id) {
        const res = await deleteReservation(reservation_id);
  
        if (res !== null) {
          this.reservation = this.reservation.filter((reservation) => reservation.reservation_id !== reservation_id);
          const reservation = document.getElementById(`reservation-${reservation_id}`);
          reservation.remove();
  
          if (!this.reservation.length) {
            const div = document.getElementById('reservation');
            const loadingDiv = div.childNodes[1];
            const errDiv = this.generateErrorMsg('Create some new reservation!');
            div.replaceChild(errDiv, loadingDiv);
          }
        }
      }
    };
  
    /**
     * Builds the list item.
     * Uses bootstrap classes with some custom overrides.
     *
     * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
     * @example
     * <li class="list-group-item">
     *   <button class="btn btn-secondary" onclick="deleteTask(e, index)">X</button>
     *   <span>Task name</span>
     *   <span>pending</span>
     *   <span>date create</span>
     * </li>
     */
    buildReservationListRowItem = (reservation) => {
      const listGroupItem = document.createElement('th');
      listGroupItem.id = `reservation-${reservation.reservation_id}`; 
      listGroupItem.className = 'list-group-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('X');
      deleteBtn.className = 'btn btn-secondary';
      deleteBtn.addEventListener('click', this._deleteEventHandler(reservation.reservation_id));
      deleteBtn.appendChild(deleteBtnTxt);
  
      const reservationUserNameSpan = document.createElement('span');
      const reservationUserName = document.createTextNode(reservation.username);
      reservationUserNameSpan.appendChild(reservationUserName);

  
      const bikeSpan = document.createElement('span');
      const bike= document.createTextNode(reservation.bike_id)
      bikeSpan.appendChild(bike);
  
      const dateSpan = document.createElement('span');
      const date = document.createTextNode(reservation.reservation_date);
      dateSpan.appendChild(date);

      const startTimeSpan = document.createElement('span');
      const startTime = document.createTextNode(reservation.reservation_start_time);
      startTimeSpan.appendChild(startTime);

      const endTimeSpan = document.createElement('span');
      const endTime= document.createTextNode(reservation.reservation_end_time);
      endTimeSpan.appendChild(endTime);
  
       
  
      // add list item's details
      listGroupItem.append(deleteBtn);
      listGroupItem.append(reservationUserNameSpan);
      listGroupItem.append(bikeSpan);
      listGroupItem.append(dateSpan);
      listGroupItem.append(startTimeSpan);
      listGroupItem.append(endTimeSpan);

  
      return listGroupItem;
    };
  
    /**
     * Assembles the list items then mounts them to a parent node.
     * Uses bootstrap classes with some custom overrides.
     */
    buildReservationList = (mount, reservation) =>
      reservation.map((reservation) => {
        const listGroupRowItem = this.buildReservationListRowItem(reservation);
  
        // add entire list item
        mount.append(listGroupRowItem);
      });
  
    generateErrorMsg = (msg) => {
      const div = document.createElement('div');
      const text = document.createTextNode(msg);
      div.id = 'user-message';
      div.className = 'center';
      div.appendChild(text);
      return div;
    };
  
    generateReservation = async () => {
      const res = await getReservation();
      const div = document.getElementById('reservation');
      const loadingDiv = div.childNodes[1];
  
      if (res.length) {
        this.reservation = res;
        const reservationDiv = this.createReservationListParent();
        this.buildReservationList(reservationDiv, res);
        div.replaceChild(reservationDiv, loadingDiv);
      } else {
        const errDiv = this.generateErrorMsg(res.msg);
        div.replaceChild(errDiv, loadingDiv);
      }
    };
  }
  
  const inst = new ReservationList();
  
  