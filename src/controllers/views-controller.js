const path = require("path")
const fs = require("fs")
const authValidation = require("../validation/auth-validation")

const index  = async (req, res) => {
    const user = await authValidation(req.session.user)
    if (user) {
        res.render("index", {user : user.username, activePage: 'home'})
    } else {
        res.render("index", {activePage: 'home'})
    }
}

const contact = async (req, res) => {
    const user = await authValidation(req.session.user)
    if (user) {
        res.render("contact", {user : user.username, activePage: 'contact'})
    } else {
        res.render("contact", {activePage: 'contact'})
    }
}

const testimonial = async (req, res) => {
    const user = await authValidation(req.session.user)
    const filePath = path.join(__dirname, '..', '..', 'public/assets/js/data/clients.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read JSON file' });
        } else {
            const clients = JSON.parse(data)

            if (user) {
                res.render("testimonial", {user : user.username, activePage: 'testimonial', clients})
            } else {
                res.render("testimonial", {activePage: 'testimonial', clients})
            }
        }
    });
    
}
const getDataTestimonial = async (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'public/assets/js/data/clients.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read JSON file' });
        } else {
            const clients = JSON.parse(data)

            return res.json(clients);
        }
    });
    
}

const view = {
    index,
    contact,
    testimonial,
    getDataTestimonial
}

module.exports = view