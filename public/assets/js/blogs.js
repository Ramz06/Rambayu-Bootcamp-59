import alertModal from "./alert-modal.js";

const toBlogForm = document.getElementById("blog-form");
toBlogForm.addEventListener("click", async (e) => {
  e.preventDefault(); // Mencegah navigasi default
  await enterBlogForm();
});

const toEditForm = document.querySelectorAll(".edit-btn");
toEditForm.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    await enterBlogEdit(id);
  });
});

async function enterBlogForm() {
  try {
    const response = await fetch("/blog-form", { method: "GET" });

    if (response.ok) {
      window.location.href = "/blog-form";
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

async function enterBlogEdit(id) {
  try {
    const response = await fetch(`http://localhost:3000/blog-edit/${id}`, {
      method: "GET",
    });

    if (response.ok) {
      window.location.href = `/blog-edit/${id}`;
    } else if (response.status === 401) {
        alertModal.unauthorizedAlert();
    } else if (response.status === 403) {
      alertModal.forbiddenAlert();
    } else {
      const result = await response.json();
    }
  } catch (err) {
    console.error("Error updating blog:", err);
  }
}
