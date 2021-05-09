const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User'); const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check')



// @route   GET api/auth
// @desc     Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  }
  catch (e) {
    res.status(500).send('server error')
 
  }
});
// @route   post api/users/login
// @desc    login user
// @access  Public
router.post('/', [
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const error = validationResult(req)
  const { email, password } = req.body
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  }
  try {

    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(400).json({ error: [{ msg: "Invalid credential" }] });
    }
  
    const isMatch = bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: [{ msg: "Invalid credential" }] });

    }
    console.log("samiii121")
   
    const payload = {
      user: { id: user._id }
    }
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '7d'
    }, (err, token) => {
      if (err) throw err

      res.json({ token })
    })

  }

  catch (e) {
    res.status(500).send('Server error')
  }
}
);

module.exports = router;
