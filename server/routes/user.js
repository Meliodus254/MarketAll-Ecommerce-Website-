const express = require("express");

const router = express.Router();



const { authCheck } = require('../middlewares/auth');  // Import the auth middleware
const { createOrUpdateUser} = require('../controllers/auth');  // Import the controller

// Route for creating or updating the user
router.post('/create-or-update-user', authCheck, createOrUpdateUser);



router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit user API endpoint",
  });
});




module.exports = router;