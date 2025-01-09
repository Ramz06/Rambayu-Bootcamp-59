import alertModal from "../alert-modal.js";

async function changePassword() {
  try {
    const response = await fetch('/users/edit-password', { method: 'PATCH' });

    if (response.ok) {
      // Jika berhasil logout, redirect ke halaman login
      window.location.href = '/users/login';
    } else if (response.status === 401) {
      alertModal.unauthorizedAlert();
    } else {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan jaringan.');
  }
}

export default changePassword;
  