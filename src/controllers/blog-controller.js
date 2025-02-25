const path = require("path");
const fs = require("fs");
const blogService = require("../service/blog-service");
const authValidation = require("../validation/auth-validation")

const db = require("../../models");
const Blog = db.Blog;

const renderBlogs = async (req, res) => {   
    try {
        const result = await Blog.findAll();
        const blogs = blogService.getBlogs(result);

        const user = await authValidation(req.session.user)
        if (user) {
            res.render("blogs", { blogs, activePage: 'blogs', user : user.username})
        } else {
            res.render("blogs", { blogs, activePage : 'blogs'})
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}

const renderBlogDetail = async (req, res) => {
    const id = req.params.id;
  try {
    const result = await Blog.findByPk(id);
    const blog = blogService.getBlog(result);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    const user = await authValidation(req.session.user);
    if (user) {
        res.render("blog-detail", {blog, user: user.username});
    } else {
        res.render("blog-detail", {blog});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const renderBlogForm = async (req, res) => {
    const user = await authValidation(req.session.user)
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.render("blog-form", {user: user.username})
}

const renderBlogEdit = async (req, res) => {
    const user = await authValidation(req.session.user)
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const id = req.params.id;
    const blog = await Blog.findByPk(id);
    if (blog.username !== user.username) {
        return res.status(403).json({ message: "Not Allowed" });
    }
    res.status(200).render("blog-edit", {blog, user : user.username})
}

const addBlog = async (req, res) => {
    const user = await authValidation(req.session.user)
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, content, startdate, enddate } = req.body;
    const file = req.file;
    const imageurl = file.filename; 
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);
    const blogDuration = Math.ceil((endDate - startDate) / 1000);

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Query INSERT ke tabel
        const result = await Blog.create({
            title: title,
            content: content,
            imageurl: imageurl,
            blogDuration: blogDuration,
            username: user.username
        })
        res.redirect("/blogs");
    }
    catch (err) {
        console.log(err.message);
    }

}

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const user = await authValidation(req.session.user)
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const blog = await Blog.findByPk(id);
    if (blog.username !== user.username) {
        return res.status(403).json({ message: "Not Allowed" });
    }

    try {
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        if (req.file) {
            const imageurl = req.file.filename;
            const oldImagePath = path.join(__dirname, '..', '..', 'public', 'assets', 'uploads', blog.imageurl);
            console.log(`Attempting to delete file at: ${oldImagePath}`);
            try {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Gagal menghapus file:', err);
                    } else {
                        console.log('File berhasil dihapus!');
                    }
                });
            } catch (error) {
                console.error(`Error deleting old image: ${error.message}`);
            }
            const imageResult = await Blog.update({
                imageurl: imageurl
            }, {
                where: {
                    id: id
                }
            })
        }
        
        const result = await Blog.update({
            title: title,
            content: content,
        }, {
            where: {
                id: id
            }
        })
        console.log("data updated");
        res.redirect("/blogs");

    }
    catch (err) {
        console.log(err.message);
    }
}

const deleteBlog = async (req, res) => {
    const user = await authValidation(req.session.user)
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    const blog = await db.Blog.findByPk(id);
    if (blog.username !== user.username) {
        return res.status(403).json({ message: "Not Allowed" });
    }

    try {
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        const oldImagePath = path.join(__dirname, '..', '..', 'public', 'assets', 'uploads', blog.imageurl);
            console.log(`Attempting to delete file at: ${oldImagePath}`);
            try {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Gagal menghapus file:', err);
                    } else {
                        console.log('File berhasil dihapus!');
                    }
                });
            } catch (error) {
                console.error(`Error deleting old image: ${error.message}`);
            }
        const result = await Blog.destroy({
            where: { id }, // Hapus berdasarkan ID
        });

        if (result === 0) {
            throw new Error('Blog not found or already deleted');
        }
        res.redirect("/blogs");
        console.log("data deleted");
    } catch (error) {
        console.log(error.message);
    }

}

const blogController = {
    addBlog,
    updateBlog,
    deleteBlog,
    renderBlogs,
    renderBlogDetail,
    renderBlogForm,
    renderBlogEdit
}

module.exports = blogController;
