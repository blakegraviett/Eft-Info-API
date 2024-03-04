// * IMPORTS * //
const router = require("express").Router()
const {
  registerUser,
  loginUser,
  verfiyEmail,
} = require("../controllers/auth.controller")

// * ROUTER * //
// LOGIN
router.post("/login", loginUser)

router.post("/register", registerUser)

router.post("/verify-email", verfiyEmail)

// * EXPORTS * //
module.exports = router
