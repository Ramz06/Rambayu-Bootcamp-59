// Fungsi untuk mengambil data members dari URL menggunakan Fetch API dengan async/await
async function getMembers(url) {
  try {
      const response = await fetch(url); // Tunggu respons dari fetch
      if (!response.ok) {
          throw new Error('Members not found'); // Lempar error jika respons bukan 200
        }
        const members = await response.json(); // Parse JSON jika respons berhasil
        return members;
    } catch (error) {
      console.log(url)
      console.error(error.message); // Menampilkan error jika ada masalah
  }
}

// Mengambil data members dan merender mereka
async function init() {
  const members = await getMembers('src/js/data/clients.json');
  
  if (members) {
      // Render semua members pada awal
      renderMembers(members, memberContainer);

      // Menambahkan filter berdasarkan rating
      addRatingFilter(members, starButtons, memberContainer);
  }
}

// Fungsi untuk merender members ke dalam HTML
function renderMembers(membersArray, memberContainer) {
  let html = "";
  membersArray.forEach((member) => {
      html += `
          <div class="card m-2" style="width: 18rem;">
              <img
                  src="${member.image}"
                  alt="Product Image"
                  class="card-img-top"
              />
              <div class="card-body">
                  <h5 class="card-title">"${member.feedback}"</h5>
                  <p class="card-text">- ${member.name}</p>
                  <p class="card-text">
                      <strong>Rating:</strong> ${member.star} <span class="star">★</span>
                  </p>
              </div>
          </div>`;
  });
  memberContainer.innerHTML = html;
}

// Fungsi untuk menambahkan event listener pada tombol rating
function addRatingFilter(members, starButtons, memberContainer) {
  starButtons.forEach((starButton) => {
      starButton.addEventListener("click", (e) => {
          const value = e.target.value;

          // Jika tombol "all" atau value bukan angka, tampilkan semua member
          if (value === "all" || isNaN(parseInt(value))) {
              renderMembers(members, memberContainer);
          } else {
              // Jika value angka, filter dan tampilkan member dengan bintang tertentu
              const selectedStar = parseInt(value); // Konversi value ke angka
              const staredMembers = members.filter(
                  (member) => member.star === selectedStar
              );
              renderMembers(staredMembers, memberContainer);
          }
      });
  });
}

// Inisialisasi elemen HTML
const memberContainer = document.querySelector("section");
const starButtons = document.querySelectorAll(".star-button");

// Inisialisasi aplikasi
init();
