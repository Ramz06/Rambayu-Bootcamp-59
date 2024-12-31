document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const blogId = button.getAttribute('data-id');
        const confirmation = confirm('Are you sure you want to delete this blog?');

        if (confirmation) {
          try {
            const response = await fetch(`/blog-delete/${blogId}`, {
              method: 'DELETE', // Gunakan HTTP DELETE
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              alert('Blog deleted successfully!');
              window.location.href = '/blogs'; // Refresh halaman untuk memperbarui daftar
            } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
            }
          } catch (err) {
            alert(`Failed to delete blog: ${err.message}`);
          }
        }
      });
    });
  });