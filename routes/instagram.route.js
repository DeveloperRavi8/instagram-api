const {Router} = require('express');
const {getInstagramUserProfileData} = require('../controller/instagram.controller.js');

const router = Router();


router.get('/getUserProfileData/:InstagramId', getInstagramUserProfileData)

module.exports = router