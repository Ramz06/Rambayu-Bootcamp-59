const enterButton = document.querySelectorAll('.edit-btn');
enterButton.forEach((button) => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        await enterBlogEdit(id);
    });
});

const editForm = document.getElementById('blog-form');
editForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('submit');
    const id = document.getElementById('blog-id').value;
    await editBlog(id, editForm);
});

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

  
      if (file) {
        // Jika ada file yang dipilih, tampilkan preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result; // Data URL dari file
          img.alt = 'Selected Image';
          img.className = 'img-fluid';
          imagePreview.innerHTML = '';
          imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        // Jika tidak ada file yang dipilih, tampilkan fallback
        imagePreview.innerHTML = '{{#if blog.imageurl}}<img src="/assets/uploads/{{blog.imageurl}}" alt="Blog Image" class="img-fluid" />{{else}}<span>No image selected</span>{{/if}}';
      }
    });
  });
  

async function enterBlogEdit(id) {
    
    try {
        const response = await fetch(`http://localhost:3000/blog-edit/${id}`, {
            method: 'GET',
        });

        if (response.ok) {
            window.location.href = `/blog-edit/${id}`;
        } else if (response.status === 401) {
            const unauthorizedModal = new bootstrap.Modal(document.getElementById('unauthorizedModal'));
            unauthorizedModal.show();
        } else if (response.status === 403) {
            const notAllowedModal = new bootstrap.Modal(document.getElementById('notAllowedModal'));
            notAllowedModal.show();
        } else {
            const result = await response.json();
        }
    } catch (err) {
        console.error('Error updating blog:', err);
    }
}

async function editBlog(id, form) {

    try {
        const response = await fetch(`http://localhost:3000/blog-edit/${id}`, {
            method: 'PUT',
            body: new FormData(form)
        });

        if (response.ok) {
            window.location.href = '/blogs';
        } else if (response.status === 401) {
            const unauthorizedModal = new bootstrap.Modal(document.getElementById('unauthorizedModal'));
            unauthorizedModal.show();
        } else {
            const result = await response.json();
        }
    } catch (err) {
        console.error('Error updating blog:', err);
    }
}
