const index  = (req, res) => {
    res.render("index")
}

const contact = (req, res) => {
    res.render("contact")
}

const testimonial = (req, res) => {
    res.render("testimonial")
}

const view = {
    index,
    contact,
    testimonial
}

module.exports = view