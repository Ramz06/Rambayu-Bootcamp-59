document.getElementById('blog-form').addEventListener('click', async (e) => {
    e.preventDefault(); // Mencegah navigasi default
    await enterBlogForm();
  });

async function enterBlogForm() {
  try {
    const response = await fetch("/blog-form", { method: "GET" });

    if (response.ok) {
      window.location.href = "/blog-form"
    } else if (response.status === 401) {
        const unauthorizedModal = new bootstrap.Modal(document.getElementById('unauthorizedModal'));
        unauthorizedModal.show();
    } else {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan jaringan.");
  }
}
