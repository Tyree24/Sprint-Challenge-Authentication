const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration

  let user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

router.post('/login', (req, res) => {
  // implement login

  let { username } = req.headers;
  res.status(200).json({ message: `Welcome ${username}!` });

});

module.exports = router;
