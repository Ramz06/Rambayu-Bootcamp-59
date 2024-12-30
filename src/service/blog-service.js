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
    const { title, description } = req.body;
    console.log(req.body)
    const file = req.file;
    const imageurl = file.filename;

    try {
        // Query UPDATE ke tabel
        const result = await Blog.update({
          title: title,
          description: description,
          imageurl: imageurl,
          updatedAt: convertTime(new Date(), "days")
        }, {
          where: {
            id: id
          }
        })
        console.log({ result });
        console.log("data updated");
        res.redirect("/blogs");
      }
      catch (err) {
        console.log(err.message);
      }    
}

const blogService = {
    addBlog,
    updateBlog
}

module.exports = blogService;
