const express = require("express");
const app = express();
const path = require("path");
const pool = require('./application/database'); 
const hbs = require("hbs");
const multer = require("multer");
const port = 3000;

app.set("views", path.join(__dirname, 'public', 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, 'public', 'views', 'partials')); 

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from uploads directory
app.use(express.json()); // Untuk menangani request JSON

// Multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/assets/uploads'); // Folder tempat file disimpan
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });

// get method
app.get("/", home)
app.get("/contact", contact)
app.get("/blog", blog)
app.get("/testimonial", testimonial)
app.get("/blog-detail/:id", blogDetail);

/// post method
app.post("/blog", upload.single('imageurl'), blogPost);

// get function
function home(req, res) {
    res.render("index")
}
function contact(req, res) {
    res.render("contact")
}
async function blog(req, res) {
    try {
        const result = await pool.query('SELECT * FROM blog_form'); // Query ke tabel Anda
        const blogs = result.rows;
        res.render("blog", { blogs })
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}
function testimonial(req, res) {
    res.render("testimonial")
}
async function blogDetail(req, res) {
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

// post function
async function blogPost(req, res) {
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
          console.log({result});
          console.log("data added");
          res.redirect("/blog");
        }
    catch (err){
        console.log(err.message);
      }

  }

app.use("/", function(req,res) {
    res.send("404 page not found");
})


app.listen(port, () => {
    console.log(`server listening in port http://localhost:${port}`);
})