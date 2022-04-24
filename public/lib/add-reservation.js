const doAddReservation = async (e) => {
    e.preventDefault();
  
    const reservationInput = document.getElementById('formInputReservationName');
    const username = reservationInput.value;
    const dateSelect = document.getElementById('formSelectDate');
    const options = dateSelect.options;
    const selectedIndex = dateSelect.selectedIndex;
    const date = options[selectedIndex].text;
  
    if (!username) {
      alert('Please enter a  username.');
      return;
    }
  
    const res = await addReservation({ username, date });
  
    if (res !== null) {
      inst.generateReservation();
    }
    reservationInput.value = '';
  };