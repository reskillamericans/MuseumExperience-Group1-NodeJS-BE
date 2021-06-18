const express = require("express");
const router = express.Router();
const { fetchExhibits, fetchSingleExhibit } = require("./../controllers/exhibitController");

router.get("/exhibits", fetchExhibits);
router.get("/exhibits/:id", fetchSingleExhibit);

exports.exhibitRoutes = router;
