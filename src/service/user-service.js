const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { registerUserValidation, loginUserValidation } = require('../validation/user-validation');

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

      const errors = registerUserValidation(req);

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

const login = async (req, res) => {
    const errors = loginUserValidation(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("login", {
            errors: errors.array()
        });
    }

    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
        return res.status(400).render("login", {
            errors: [{ msg: "Username atau password salah." }]
        });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(400).render("login", {
            errors: [{ msg: "Username atau password salah." }]
        });
    }

    const token = uuid().toString();
    const result = await User.update({ token }, { where: { username: req.body.username } });
    console.log(result);
    return res.redirect("/");
}

const userService = {
  register,
  login
}

module.exports = userService;
