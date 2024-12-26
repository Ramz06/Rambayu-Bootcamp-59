const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const pool = require('./application/database');
const uploadFile = require("./middlewares/upload-file")
const view = require("./route/views")
const userValidation = require("./validation/user-validation")
const userService = require("./service/user-service")
const port = 3000;

app.set("views", path.join(__dirname, '..', 'public', 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '..', 'public', 'views', 'partials'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files from uploads directory
app.use(express.json()); // Untuk menangani request JSON

// get method
app.get("/", view.index)
app.get("/contact", view.contact)
app.get("/blogs", view.blogs)
app.get("/testimonial", view.testimonial)
app.get("/blog-detail/:id", view.blogDetail)
app.get("/blog-form", view.blogForm)
app.get("/users/register", view.register)
app.get("/users/login", view.login)

/// post method
app.post("/api/blogs", uploadFile.single('imageurl'), async (req, res) => {
  const { title, startdate, enddate, description } = req.body;
  console.log(req.body)
  const file = req.file;
  const imageurl = file.filename;


  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Query INSERT ke tabel
    const result = await pool.query(
      `INSERT INTO blog_form (title, startdate, enddate, description, imageurl) 
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, startdate, enddate, description, imageurl] // Parameter query
    )
    console.log({ result });
    console.log("data added");
    res.redirect("/blogs");
  }
  catch (err) {
    console.log(err.message);
  }

}
);


// Validasi untuk /users/register
app.post("/users/register", userValidation ,userService.register);


// post function
app.use("/", function (req, res) {
  res.send("404 page not found");
})

app.listen(port, () => {
  console.log(`server listening in port http://localhost:${port}`);
})
