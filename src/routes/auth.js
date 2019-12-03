const router = require('express').Router();

// Import models
const User = require('@/models/user');

// Validation
const { validationMiddleware } = require('@/validation');


router.post('/register',
  validationMiddleware,
  async (req, res) => {
    const { data } = req;

    try {
      const user = new User(data);
      const savedUser = await user.save();

      return res.send(savedUser);
    } catch (error) {
      return res
        .status(400)
        .send({ error });
    }
  });


module.exports = router;
