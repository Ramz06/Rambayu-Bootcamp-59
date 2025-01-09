document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image');
    console.log(imageInput)
    const imagePreview = document.getElementById('imagePreview');
    
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

  
      if (file) {
        // Jika ada file yang dipilih, tampilkan preview
        imagePreview.innerHTML = '';
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result; // Data URL dari file
          img.alt = 'Selected Image';
          img.className = 'img-fluid';
          imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        // Jika tidak ada file yang dipilih, tampilkan fallback
        imagePreview.innerHTML = '<span class="text-danger"> *No image selected </span>';
      }
    });
  });