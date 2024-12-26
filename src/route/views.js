const index  = (req, res) => {
    res.render("index")
}

const contact = (req, res) => {
    res.render("contact")
}

const blogs = async (req, res) => {   
    try {
        const result = await pool.query('SELECT * FROM blog_form'); // Query ke tabel Anda
        const blogs = result.rows;
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
    const result = await pool.query('SELECT * FROM blog_form WHERE id = ' + id); // Query ke tabel Anda
    const blog = result.rows;
    res.render("blog-detail", {blog});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const blogForm = (req, res) => {
    res.render("blog-form")
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
    login
}

module.exports = view