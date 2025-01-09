import alertModal from "./alert-modal.js";

const editForm = document.getElementById('blog-edit');
console.log(editForm);
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
  
async function editBlog(id, form) {
    console.log(id);
    try {
        const response = await fetch(`http://localhost:3000/blog-edit/${id}`, {
            method: 'PUT',
            body: new FormData(form)
        });

        if (response.ok) {
            window.location.href = '/blogs';
        } else if (response.status === 401) {
            alertModal.unauthorizedAlert();
            setTimeout(() => {
              window.location.href = '/blogs';
            }, 2000);
        } else if (response.status === 403) {
            alertModal.forbiddenAlert();
            setTimeout(() => {
              window.location.href = '/blogs';
            }, 2000);
        } else {
            const result = await response.json();
        }
    } catch (err) {
        console.error('Error updating blog:', err);
    }
}
