const { body } = require("express-validator");

const registerUserValidation = [
    body("username")
    .isLength({ min: 5, max: 30 }).withMessage("Username harus memiliki panjang 5-30 karakter.")
    .matches(/^[^\s]+$/).withMessage("Username tidak boleh mengandung spasi."),
  body("email")
    .isEmail().withMessage("Email harus valid.")
    .isLength({ max: 30 }).withMessage("Email tidak boleh lebih dari 30 karakter."),
  body("password")
    .isLength({ min: 5, max: 30 }).withMessage("Password harus memiliki panjang 5-30 karakter.")
    .matches(/^[^\s]+$/).withMessage("Password tidak boleh mengandung spasi.")
];

const loginUserValidation = [
    body("username")
    .isLength({ min: 5, max: 30 }).withMessage("Username harus memiliki panjang 5-30 karakter.")
    .matches(/^[^\s]+$/).withMessage("Username tidak boleh mengandung spasi."),
  body("password")
    .isLength({ min: 5, max: 30 }).withMessage("Password harus memiliki panjang 5-30 karakter.")
    .matches(/^[^\s]+$/).withMessage("Password tidak boleh mengandung spasi.")
];

module.exports = { registerUserValidation, loginUserValidation };
