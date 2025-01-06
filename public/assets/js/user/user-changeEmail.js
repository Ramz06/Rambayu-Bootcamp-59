async function changeEmail() {
  try {
    const response = await fetch('/users/edit-email', { method: 'PATCH' });

    if (response.ok) {
      // Jika berhasil logout, redirect ke halaman login
      window.location.href = '/users/login';
    } else if (response.status === 401) {
      // Jika server mengembalikan status 401, tampilkan modal box
      const unauthorizedModal = new bootstrap.Modal(document.getElementById('unauthorizedModal'));
            unauthorizedModal.show();
    } else {
      // Tangani error lainnya
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan jaringan.');
  } 
}

export default changeEmail;
  