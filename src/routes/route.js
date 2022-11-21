const express = require('express');
const router = express.Router();
 const InternController = require("../Controllers/internController")
const CollegeController = require("../Controllers/CollegeController")




router.post("/functionup/colleges",CollegeController.CreateCollege )

router.post("/functionup/interns",InternController.CreateIntern)

router.get("/functionup/collegeDetails",CollegeController.getCollegeData)






module.exports = router;