async function changePassword() {
  try {
    const response = await fetch('/users/edit-password', { method: 'PATCH' });

    if (response.ok) {
      // Jika berhasil logout, redirect ke halaman login
      window.location.href = '/users/login';
    } else if (response.status === 401) {
      // Jika server mengembalikan status 401, tampilkan modal box
      const notLoggedInModal = new bootstrap.Modal(document.getElementById('notLoggedInModal'));
      notLoggedInModal.show();
    } else {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan jaringan.');
  }
}

export default changePassword;
  