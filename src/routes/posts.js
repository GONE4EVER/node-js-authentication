const router = require('express').Router();

// Middlewares
const verifyToken = require('@/middlewares/verifyToken');


router.get(
  '/',
  verifyToken,
  (req, res) => {
    res.send({ content: 'posts' });
  }
);


module.exports = router;

