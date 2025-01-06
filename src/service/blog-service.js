const db = require("../../models");
const Blog = db.Blog;
const { displayTime } = require("../utils/display-time");

function getBlogs(result) {
  const blogs = result.map((blog) => ({
    blogDuration: displayTime(blog.blogDuration),
    postedTime: displayTime(blog.postedTime),
    id: blog.id,
    author: blog.username,
    title: blog.title,
    content: blog.content,
    imageurl: blog.imageurl,
  }));
  return blogs;
}

const updateBlogTimers = async () => {
  try {
    // Ambil semua blog dari database
    const blogs = await Blog.findAll();

    // Perbarui blogDuration dan postedTime
    for (const blog of blogs) {
      const newDuration = blog.blogDuration - 60; // Kurangi durasi
      const newPostedTime = blog.postedTime + 60;

      // Update ke database
      if (newDuration < 1) {
        await Blog.destroy({ where: { id: blog.id } });
      } else {
        await Blog.update(
          {
            blogDuration: newDuration,
            postedTime: newPostedTime,
          },
          {
            where: { id: blog.id },
          }
        );
      }
    }

    console.log("Blog timers updated");
  } catch (err) {
    console.error("Error updating blog timers:", err);
  }
};

const blogService = {
  getBlogs,
  updateBlogTimers,
};

module.exports = blogService;
