const {Router} = require('express');
const {registerUserController, loginUserController, logoutUserController} = require('../controllers/auth.controller');

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get('/logout', logoutUserController);

module.exports = router;

