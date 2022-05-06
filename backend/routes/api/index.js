const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images.js')


router.use('/session', sessionRouter);
router.use('/images', imagesRouter)
router.use('/users', usersRouter);


// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
