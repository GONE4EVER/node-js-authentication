const router = require('express').Router();
const bcrypt = require('bcryptjs');

// Import models
const User = require('@/models/user');

// Validation middlewares
const {
  requestValidation,
  checkIfExists,
} = require('@/validation');

const HASH_SALT = 10;


router.post(
  '/register',
  requestValidation,
  checkIfExists,
  async (req, res) => {
    const { data } = req;

    try {
      const salt = await bcrypt.genSalt(HASH_SALT);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const user = new User({
        ...data,
        password: hashedPassword,
      });

      const { _id } = await user.save();

      return res.send({ userID: _id });
    } catch (error) {
      return res
        .status(400)
        .send({ error });
    }
  }
);


module.exports = router;
