const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const uploadFile = require("./middlewares/upload-file")
const view = require("./route/views")
const { registerUserValidation, loginUserValidation } = require("./validation/user-validation")
const userService = require("./service/user-service")
const blogService = require("./service/blog-service")
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
app.get("/blog-edit/:id", view.blogEdit)

/// post method
app.post("/api/blogs", uploadFile.single('imageurl'), blogService.addBlog);
// Validasi untuk /users/register
app.post("/users/register", registerUserValidation , userService.register);

app.put('/blogs/:id', uploadFile.single('imageurl'), blogService.updateBlog);

// post function
app.use("/", function (req, res) {
  res.send("404 page not found");
})

app.listen(port, () => {
  console.log(`server listening in port http://localhost:${port}`);
})
