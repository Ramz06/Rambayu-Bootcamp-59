import alertModal from "../js/alert-modal.js";

async function logout() {
  try {
    const response = await fetch("/users/logout", { method: "DELETE" });

    if (response.ok) {
      alertModal.successLogoutUser();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (response.status === 401) {
      alertModal.unauthorizedAlert();
    } else {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan jaringan.");
  }
}

export default logout;
