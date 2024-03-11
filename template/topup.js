async function get_chanels() {
    const response = await axios.get(`http://127.0.0.1:8000/chanels`);
    console.log(response.data);
    const chanel = response.data['chanels'];
    displayChanels(chanel);
    console.log(chanel)
  }
  
  function displayChanels(channels) {
    const payment_chanel = document.getElementById('chanels');
    payment_chanel.innerHTML = ``;
  
    channels.forEach(chanel => {
      const div = document.createElement('div');
      div.innerHTML = `<p>${chanel.id} ${chanel.name}</p>`;
      payment_chanel.appendChild(div);
    });
  }