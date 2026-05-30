const express = require("express");

const router = express.Router();

const employeeController =
require("../controllers/employeeController");

const verifyToken =
require("../middleware/authMiddleware");

router.post(
    "/login",
    employeeController.loginEmployee
);

router.post(
    "/store-sim",
    verifyToken,
    employeeController.storeSim
);

router.get(
    "/profile",
    verifyToken,
    employeeController.getProfile
);

module.exports = router;