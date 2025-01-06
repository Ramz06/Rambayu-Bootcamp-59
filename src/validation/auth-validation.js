const db = require("../../models")
const User = db.User

async function authValidation(user) {
    if (!user) {
        return false
    } else {
        const result = await User.findOne({ where: { username: user.username } });
        if (!result) {
            return false
        } else {
            return result
        }
    }

}

module.exports = authValidation