const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const sessionMiddleware = session({
  name: "my-session",
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Melindungi cookie dari akses JavaScript
    secure: process.env.NODE_ENV === "production", // Gunakan secure=true hanya untuk HTTPS
    sameSite: "strict" // Membatasi pengiriman cookie ke domain yang sama
  }
});

module.exports = sessionMiddleware;
