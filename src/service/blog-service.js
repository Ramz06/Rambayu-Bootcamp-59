const { convertTime } = require("../application/days-count");
const path = require("path");
const fs = require("fs");

const db = require("../../models");
const Blog = db.Blog;

const addBlog = async (req, res) => {
    const { title, content } = req.body;
    console.log(req.body)
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
        console.log({ result });
        console.log("data added");
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

const blogService = {
    addBlog,
    updateBlog,
    deleteBlog
}

module.exports = blogService;
