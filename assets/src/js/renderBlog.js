const blogContainer = document.querySelector("section.blog-container");


function renderBlogs() {
    let html = ``;
    blogs.forEach(blog => {
      html += `
            <div class="blog-card">
              <img src="${blog.image}" />
              <h3>${blog.title}</h3>
              <p>Duration : ${blog.duration}</p>
              <p>${blog.description}</p>
              <div class="tech-icons">
                <i class="fab fa-node"></i> 
                <img src="https://nextjs.org/static/favicon/favicon.ico" alt="Next.js" style="height: 30px; width: 30px;" />
                <i class="fab fa-react"></i>
                <img src="https://www.typescriptlang.org/favicon-32x32.png" alt="TypeScript" style=" height: 30px; width: 30px;" />
              </div>
              <div class="actions">
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
              </div>
              </div>`;
      blogContainer.innerHTML = `<h1>My Project</h1>` + html;
    });
}
