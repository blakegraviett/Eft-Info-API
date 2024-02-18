// * IMPORTS * //
const router = require("express").Router()
const { registerUser, loginUser} = require("../controllers/auth.controller");

// * ROUTER * //
// LOGIN
router.post('/login', loginUser)

router.post('/register', registerUser)


// * EXPORTS * //
module.exports = router