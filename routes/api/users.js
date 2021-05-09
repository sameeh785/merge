const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const config = require('config')

const { check, validationResult } = require('express-validator/check')

// @route   post api/users/
// @desc    register
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'Enter a strong password').isLength({ min: 6 })
], async (req, res) => {
  const error = validationResult(req)
  const { name, email, password } = req.body
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  }
  try {
    console.log('samiiiiiii1212')
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: [{ msg: "user already exit" }] });
    }

    const avatar = gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })

    let user1 = new User({
      name, email, password, avatar
    })
    const salt = await bcrypt.genSalt(10);
    user1.password = await bcrypt.hash(password, salt)
    await user1.save()
    const payload = {
      user: { id: user1._id }
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

});

module.exports = router;
