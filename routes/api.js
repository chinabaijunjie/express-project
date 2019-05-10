const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.js")
const positionController = require("../controllers/position.js")
const upload = require("../utils/uploads.js")

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/isLogin', userController.isLogin)
router.get('/logout', userController.logout)

router.post('/addPosition', upload.single('logo'), positionController.addPosition)
router.get('/removePosition', positionController.removePosition)
router.get('/getPositionList', positionController.getPositionList)
router.get('/getPosition', positionController.getPosition)
router.post('/updatePosition', upload.single('logo'), positionController.updatePosition)


module.exports = router;
