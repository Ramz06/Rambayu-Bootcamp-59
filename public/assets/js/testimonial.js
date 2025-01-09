
  const fetchClients = async () => {
    try {
      // Ambil data JSON dari endpoint API
      const response = await fetch('/api/testimonial');
      const clients = await response.json();

      // Render semua clients pertama kali
      renderClients(clients);

      // Tambahkan event listener ke setiap tombol bintang
      const stars = document.querySelectorAll('.client-star');
      stars.forEach(star => {
        star.addEventListener('click', () => {
          const starText = star.textContent.replace('⭐', '').trim();

          // Jika tombol "All" diklik, render semua clients
          if (starText === "All") {
            renderClients(clients);
          } else {
            // Render berdasarkan rating bintang
            const starRating = parseInt(starText);
            const filteredClients = clients.filter(client => client.star === starRating);
            renderClients(filteredClients);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const renderClients = (clients) => {
    const container = document.querySelector('.team_container .row');
    container.innerHTML = ''; // Kosongkan kontainer sebelum render ulang

    clients.forEach(client => {
      const clientHTML = `
        <div class="col-lg-3 col-sm-6">
          <div class="box pb-3">
            <div class="img-box">
              <img src="${client.image}" class="img1" alt="${client.name}" width="70" height="120">
            </div>
            <div class="detail-box">
              <h5>${client.name}</h5>
              <p>${client.feedback}</p>
            </div>
            <div>⭐${client.star}</div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', clientHTML);
    });
  };

  // Panggil fungsi fetchClients untuk pertama kali
  fetchClients();
