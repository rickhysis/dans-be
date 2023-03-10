const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const SECRET = 'dans-Secr3t';
const ALGORITHM = "HS256";
const EXPIRES_IN = "1d";

async function validateLogin(username, password) {

    try {
        // check if username exists
        const user = await UserModel.findOne({ where: { username } });

        if (user) {
            // Check password
            const validationPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (validationPassword) {
                const authToken = jwt.sign(
                    { username: user.username },
                    SECRET,
                    {
                        algorithm: ALGORITHM,
                        expiresIn: EXPIRES_IN
                    }
                );

                return authToken;
            }else{
                throw Error('Invalid username or password.');
            }
        } else {
            throw Error('Invalid username or password.');
        }

    } catch (error) {
        console.log("ERROR :: ", error);
        throw Error(error.message);
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({
        error: 'Unauthorized'
    });
  
    jwt.verify(token, SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.status(403).json({
        error: 'Unauthorized'
      });
  
      req.user = user
  
      return next(false)
    })
}

module.exports = {
    validateLogin,
    authenticateToken
};  