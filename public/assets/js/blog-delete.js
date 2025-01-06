document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const blogId = button.getAttribute("data-id");
      try {
        const response = await fetch(`/blog-delete/${blogId}`, {
          method: "DELETE", // Gunakan HTTP DELETE
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("Blog deleted successfully!");
          window.location.href = "/blogs"; // Refresh halaman untuk memperbarui daftar
        } else if (response.status === 401) {
          const unauthorizedModal = new bootstrap.Modal(
            document.getElementById("unauthorizedModal")
          );
          unauthorizedModal.show();
        } else if (response.status === 403) {
          const notAllowedModal = new bootstrap.Modal(
            document.getElementById("notAllowedModal")
          );
          notAllowedModal.show();
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (err) {
        console.log(`Failed to delete blog: ${err.message}`);
      }
    });
  });
});
