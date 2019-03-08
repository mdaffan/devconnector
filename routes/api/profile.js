const express = require('express')
const router = express.Router()
//@route GET api/Profiles/test
// @desc Tests Profiles route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile work' }))
module.exports = router
