const { validateLogin } = require("../services/user");

async function login(req, res, next) {
    const { body: {
        username,
        password,
    } } = req;

    try {

        if (!username || !password) {
            res.status(400).json({
                error: 'username & password is required'
            });
            return next();
        }

        const token = await validateLogin(username, password);

        res.status(200).json({
            success: true,
            token: token
        });
    } catch (error) {
        console.log("ERROR :: ", error);
        res.status(500).json({
            error: error.message
        });
    }
    return next();
}

module.exports = {
    login
};  