let blogs = [];

const blogForm = document.querySelector('form')

blogForm.addEventListener('submit', e => {
    e.preventDefault();
    
    let title = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let image = document.getElementById('image').files[0];
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    let imageUrl = URL.createObjectURL(image);

    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDuration = end - start;

    const duration = timeDuration / (1000 * 60 * 60 * 24) + " days";

    if (title == '' || description == '' || startDate == '' || endDate == '' || image.length === 0) {
        return alert("The one of the input cannot be empty");
    } else {
        blogs.unshift({
            title,
            description,
            image: imageUrl,
            duration
        })
        
        blogForm.reset();
        renderBlogs();
    }
})