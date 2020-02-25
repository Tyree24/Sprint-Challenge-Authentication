/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/


const users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");


module.exports = (req, res, next) => {
  res.status(401).json({ you: 'shall not pass!' });

  const { username, password } = req.headers;

  // validate that they exist ... we didn't have this part in class...
  if (!(username && password)) {
    res.status(401).json({ message: "invalid credentials" });
  } else {

    users
      .findBy({ username })
      .first()
      .then(_user => {
        if (_user && bcrypt.compareSync(password, _user.password)) {
          next();
        } else {
          res.status(401).json({ messege: "Invalid Credentials" });
        }
      })

      .catch(err => {
        res.status(500).json({ messege: err });
      });
  }


};
