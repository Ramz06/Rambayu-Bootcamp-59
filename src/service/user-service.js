const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../../models'); // Import the models index
const User = db.User;

const register = async (req, res) => {
    try {
        const duplicateUser = await User.findOne({ where: { username: req.body.username } });
        if (duplicateUser) {
            return res.status(400).render("register", {
                errors: [{ msg: "Username sudah digunakan." }]
            });
        }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).render("register", {
          errors: errors.array()
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Terjadi kesalahan pada server.");
    }
  
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPassword });
    console.log(user);
    return res.redirect("/login");
  }


const userService = {
  register
}

module.exports = userService;
