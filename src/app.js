const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const cron = require("node-cron");
const userController = require("./controllers/user-controller")
const blogController = require("./controllers/blog-controller")
const viewController = require("./controllers/views-controller")
const uploadFile = require("./middlewares/upload-middleware")
const sessionMiddleware = require("./middlewares/session-middleware")
const {registerUserValidation, loginUserValidation} = require("./validation/user-validation")
const blogService = require("./service/blog-service")
const port = 3000;

app.set("views", path.join(__dirname, '..', 'public', 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '..', 'public', 'views', 'partials'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json()); 
app.use(sessionMiddleware);


//route
app.get("/", viewController.index)
app.get("/contact", viewController.contact)
app.get("/testimonial", viewController.testimonial)

cron.schedule("*/60 * * * * *", () => {
    blogService.updateBlogTimers();
});

app.get("/blog-detail/:id", blogController.blogDetail)
app.get("/blog-form", blogController.blogForm)
app.get("/blogs", blogController.blogs)
app.get("/blog-edit/:id", blogController.blogEdit)
app.post("/api/blogs", uploadFile.single('imageurl'), blogController.addBlog);
app.put('/blog-edit/:id', uploadFile.single('imageurl'), blogController.updateBlog);
app.delete('/blog-delete/:id', blogController.deleteBlog);

app.get("/users/register", userController.registerPage)
app.get("/users/login", userController.loginPage)
app.post("/users/register", registerUserValidation , userController.register);
app.post("/users/login", loginUserValidation, userController.login);
app.patch("/users/edit-email", userController.editEmail);
app.patch("/users/edit-password", userController.editPassword);
app.delete("/users/logout", userController.logout);

app.use("/", function (req, res) {
  res.send("404 page not found");
})

app.listen(port, () => {
  console.log(`server listening in port http://localhost:${port}`);
})
