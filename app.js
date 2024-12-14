const express = require("express");
const app = express();
const port = 3000;
const pool = require('./db'); 
const hbs = require("hbs");

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials'); // Daftarkan folder partials

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from uploads directory
app.use(express.json()); // Untuk menangani request JSON

app.get("/", home)
app.get("/contact", contact)
app.get("/blog", blog)
app.get("/testimonial", testimonial)
app.get('/data', dbQuery); // Endpoint: Mendapatkan semua data dari tabel

function home(req, res) {
    res.render("index")
}
function contact(req, res) {
    res.render("contact")
}
function blog(req, res) {
    res.render("blog")
}
function testimonial(req, res) {
    res.render("testimonial")
}
async function dbQuery(req, res) {
        try {
          const result = await pool.query('SELECT * FROM blog_form'); // Query ke tabel Anda
          res.json(result.rows);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
}

app.use("/", function(req,res) {
    res.send("404 page not found");
})


app.listen(port, () => {
    console.log(`server listening in port http://localhost:${port}`);
})