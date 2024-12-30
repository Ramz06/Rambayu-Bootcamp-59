const db = require('../../models');
const User = db.User;

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/login");
    }
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.redirect("/login");
    }
    next();
}

module.exports = authMiddleware;