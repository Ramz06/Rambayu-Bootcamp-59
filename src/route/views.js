const db = require("../../models")
const Blog = db.Blog

const index  = (req, res) => {
    res.render("index")
}

const contact = (req, res) => {
    res.render("contact")
}

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

const testimonial = (req, res) => {
    res.render("testimonial")
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

const register = (req, res) => {
    res.render("register")
}

const login = (req, res) => {
    res.render("login")
}

const view = {
    index,
    contact,
    blogs,
    testimonial,
    blogDetail,
    blogForm,
    register,
    login,
    blogEdit
}

module.exports = view