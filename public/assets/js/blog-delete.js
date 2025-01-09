import alertModal from "./alert-modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const blogId = button.getAttribute("data-id");
      alertModal.confirmationAlert().then(async (response) => {
        if (response.isConfirmed) {
          try {
            const result = await fetch(`/blog-delete/${blogId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (result.ok) {
              alertModal.successDeleteBlog();
              window.location.href = "/blogs"; // Refresh halaman untuk memperbarui daftar
            } else if (result.status === 401) {
              alertModal.unauthorizedAlert();
            } else if (result.status === 403) {
              alertModal.forbiddenAlert()
            } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
            }
          } catch (err) {
            console.log(`Failed to delete blog: ${err.message}`);
          }
        } else if (response.dismiss === Swal.DismissReason.cancel) {
          alertModal.cancelDeleteBlog();
        } else {
          console.log("delete decline")
        }
      
      });
    });
  });
});
