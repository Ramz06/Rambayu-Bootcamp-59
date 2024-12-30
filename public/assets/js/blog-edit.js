const form = document.getElementById('blog-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const id = 1; // ID blog yang ingin diupdate (sesuaikan dengan data Anda)
    const title = form.title.value;
    const content = form.content.value;
    const imageUrl = form.imageUrl.value;

    try {
        const response = await fetch(`http://localhost:3000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, imageUrl }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Blog updated successfully!');
            console.log(result);
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (err) {
        console.error('Error updating blog:', err);
    }
});
