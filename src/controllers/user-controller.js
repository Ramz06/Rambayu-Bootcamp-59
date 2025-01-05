const bcrypt = require('bcrypt');
const db = require('../../models'); // Import the models index
const User = db.User;
const { validationResult } = require('express-validator');

const registerPage = (req, res) => {
  res.render("register")
}

const loginPage = (req, res) => {
  if (req.session.user) {
      return res.redirect("/");
  }
  console.log(req.session.user)

  res.render("login")
}

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
    return res.redirect("/users/login");
  }

  const login = async (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }

    const errors = validationResult(req);
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

    const { password, ...userWithoutPassword } = user.dataValues;
    
    req.session.user = userWithoutPassword;
    return res.redirect("/");
};

const editEmail = (req, res) => {
  if (req.session.user) {
    req.session = null;
    return res.status(200).json({ message: "Logout successful" });
  }
  return res.status(401).json({ message: "Unauthorized" });
}

const editPassword = (req, res) => {
  if (req.session.user) {
    req.session = null;
    return res.status(200).json({ message: "Logout successful" });
  }
  return res.status(401).json({ message: "Unauthorized" });
}

const logout = (req, res) => {
  if (req.session.user) {
    // Hancurkan session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }

      // Hapus cookie session dari browser
      res.clearCookie('my-session', { path: '/' }); // Nama default cookie adalah 'connect.sid'
      return res.status(200).json({ message: "Logout successful" });
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};



const userController = {
  register,
  login,
  logout,
  editEmail,
  editPassword,
  registerPage,
  loginPage
}

module.exports = userController;
