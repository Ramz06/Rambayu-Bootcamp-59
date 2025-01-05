const db = require("../../models")
const Blog = db.Blog

const updateBlogTimers = async () => {
    try {
      // Ambil semua blog dari database
      const blogs = await Blog.findAll();
  
      // Perbarui blogDuration dan postedTime
      for (const blog of blogs) {
        const newDuration = blog.blogDuration - 1; // Kurangi durasi
        const newPostedTime = new Date(blog.postedTime.getTime() + 60000); // Tambahkan 1 menit ke postedTime
  
        // Update ke database
        await Blog.update({
          blogDuration: newDuration > 0 ? newDuration : 0, // Jika blogDuration < 0, tetap 0
          postedTime: newPostedTime
        }, {
          where: { id: blog.id }
        });
      }
  
      console.log('Blog timers updated');
    } catch (err) {
      console.error('Error updating blog timers:', err);
    }
  };
  

module.exports = {
    updateBlogTimers
}
