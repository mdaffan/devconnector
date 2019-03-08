const express = require('express')
const router = express.Router()
//@route GET api/Posts/test
// @desc Tests Posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Posts work' }))
module.exports = router
