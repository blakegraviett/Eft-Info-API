// * IMPORTS * //
const router = require("express").Router()
const { registerUser, loginUser} = require("../controllers/auth.controllers");

// * ROUTER * //
// LOGIN
router.post('/login', loginUser)

router.post('/register', registerUser)


// * EXPORTS * //
module.exports = router