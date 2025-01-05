async function logout() {
  try {
    const response = await fetch("/users/logout", { method: "DELETE" });

    if (response.ok) {
      const successModal = new bootstrap.Modal(
        document.getElementById("successLogoutModal")
      );
      successModal.show();
    } else if (response.status === 401) {
      const notLoggedInModal = new bootstrap.Modal(
        document.getElementById("notLoggedInModal")
      );
      notLoggedInModal.show();
    } else {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan jaringan.");
  }
}

export default logout;
