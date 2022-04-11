(async ()=>{
  const reservation = await getReservation();
  console.log(reservation);
  if (reservation.length) {
    const div = document.getElementById('reservation');
    const loadingDiv = div.childNodes[1];

    const tr = document.createElement('tr');
    div.replaceChild(tr, loadingDiv); // <- order is important here!
    reservation.map((reservation) => {
      // building blocks
      const th = document.createElement('th');
      th.className = 'reservation-item';
      const block = document.createElement('div');
      block.className = 'reservation-item-block';

      const checkboxSpan = document.createElement('span');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkboxSpan.className = 'reservation-checkbox';
      checkboxSpan.appendChild(checkbox);
  
      const nameSpan = document.createElement('span');
      nameSpan.className = 'reservation-username';
      nameSpan.innerText = reservation.username;
  
      const bikeSpan = document.createElement('span');
      bikeSpan.className = 'reservation-bike_id';
      bikeSpan.innerText = reservation.bike_id;
  
      const dateSpan = document.createElement('span');
      dateSpan.className = 'reservation-date';
      dateSpan.innerText = reservation.reservation_date;

      const startTimeSpan = document.createElement('span');
      startTimeSpan.className = 'reservation_start_time';
      startTimeSpan.innerText = reservation.reservation_date;

      const endTimeSpan = document.createElement('span');
      endTimeSpan.className = 'reservation_end_time';
      endTimeSpan.innerText = reservation.reservation_date;
  
        // add list item
      block.appendChild(checkboxSpan);
      block.appendChild(nameSpan);
      block.appendChild(bikeSpan);
      block.appendChild(dateSpan);
      block.appendChild(startTimeSpan);
      block.appendChild(endTimeSpan);
  
      th.appendChild(block);
      tr.appendChild(th);
      });
    }
  })();


/*(async () => {
    const reservation = await getReservation();
    console.log(reservation);
  
    if (reservation.length) {
      const div = document.getElementById('reservation');
      const loadingDiv = div.childNodes[1];
  
      const ul = document.createElement('ul');
  
      // replace 'loading...' with list
      div.replaceChild(ul, loadingDiv); // <- order is important here!
  
      // create the list
      reservation.map((reservation) => {
        // building blocks
        const li = document.createElement('li');
        li.className = 'reservation-item';
        const block = document.createElement('div');
        block.className = 'reservation-item-block';
  
        //   content
        const checkboxSpan = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxSpan.className = 'reservation-checkbox';
        checkboxSpan.appendChild(checkbox);
  
        const nameSpan = document.createElement('span');
        nameSpan.className = 'reservation-username';
        nameSpan.innerText = reservation.username;
  
        const bikeSpan = document.createElement('span');
        bikeSpan.className = 'reservation-bike_id';
        bikeSpan.innerText = reservation.bike_id;
  
        const dateSpan = document.createElement('span');
        dateSpan.className = 'reservation-date';
        dateSpan.innerText = reservation.reservation_date;

        const startTimeSpan = document.createElement('span');
        startTimeSpan.className = 'reservation_start_time';
        startTimeSpan.innerText = reservation.reservation_date;

        const endTimeSpan = document.createElement('span');
        endTimeSpan.className = 'reservation_end_time';
        endTimeSpan.innerText = reservation.reservation_date;
  
        // add list item
        block.appendChild(checkboxSpan);
        block.appendChild(usernameSpan);
        block.appendChild(bikeSpan);
        block.appendChild(dateSpan);
        block.appendChild(startTimeSpan);
        block.appendChild(endTimeSpan);
  
        li.appendChild(block);
        ul.appendChild(li);
      });
    }
  })();*/