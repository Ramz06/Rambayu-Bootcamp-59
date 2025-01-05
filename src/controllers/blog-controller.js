const { convertTime } = require("../application/days-count");
const path = require("path");
const fs = require("fs");

const db = require("../../models");
const Blog = db.Blog;

const blogs = async (req, res) => {   
    try {
        const result = await Blog.findAll();
        const blogs = result;

        res.render("blogs", { blogs })
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}

const blogDetail = async (req, res) => {
    const id = req.params.id;
  try {
    const result = await Blog.findByPk(id);
    const blog = result;

    res.render("blog-detail", {blog});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const blogForm = (req, res) => {
    res.render("blog-form")
}

const blogEdit = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);
    res.render("blog-edit", {blog})
}

const addBlog = async (req, res) => {
    const { title, content } = req.body;
    const file = req.file;
    const imageurl = file.filename;


    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Query INSERT ke tabel
        const result = await Blog.create({
            title: title,
            content: content,
            imageurl: imageurl,
            createdAt: convertTime(new Date(), "days")
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


    try {
        // Query UPDATE ke tabel
        const blog = await db.Blog.findByPk(id);
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
    const { id } = req.params;

    try {
        const blog = await db.Blog.findByPk(id);
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
    blogs,
    blogDetail,
    blogForm,
    blogEdit
}

module.exports = blogController;
