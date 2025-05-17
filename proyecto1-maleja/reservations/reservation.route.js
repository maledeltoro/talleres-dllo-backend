const express = require('express')
const router = express.Router();
const { GetBookReservations, GetUserReservations, PostReservation } = require("./reservation.controller.js");
const verifyToken = require("../auth/auth.jwt.js");


router.get("/BookReservation/", GetBookReservations);
router.get("/UserReservation/", GetUserReservations);
router.post("/", verifyToken, PostReservation);


module.exports = router;