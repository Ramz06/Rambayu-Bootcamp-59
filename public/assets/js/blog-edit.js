const form = document.getElementById('blog-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload

    console.log("connected");
    const id = document.getElementById('blog-id').value;

    try {
        const response = await fetch(`http://localhost:3000/blog-edit/${id}`, {
            method: 'PUT',
            body: new FormData(form)
        });

        if (response.ok) {
            // Redirect to /blogs after successful update
            window.location.href = '/blogs';
        } else {
            const result = await response.json();
        }
    } catch (err) {
        console.error('Error updating blog:', err);
    }
});
