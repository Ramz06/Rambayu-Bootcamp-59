const { convertTime } = require("../application/days-count");
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
            let result = await Blog.update({
                imageurl: imageurl
            }, {
                where: {
                    id: id
                }
            })
            console.log("image updated");
        }
        result = await Blog.update({
            title: title,
            content: content,
        }, {
            where: {
                id: id
            }
        })
        res.redirect("/blogs");
        console.log("data updated");
    }
    catch (err) {
        console.log(err.message);
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Blog.destroy({
            where: { id }, // Hapus berdasarkan ID
        });

        if (result === 0) {
            throw new Error('Blog not found or already deleted');
        }
        console.log("data deleted");
        res.redirect("/blogs");
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
