const express = require ("express")

const router = express.Router();

router.get("/", (req,res) => res.send("<p>Members</p>"))

router.get("/:memberId", (req,res) => res.send("<p>Member</p>"))

router.patch("/:memberId", (req,res) => res.send("<p>Member update</p>"))

router.post("/", (req,res) => res.send("<p>Member creation</p>"))

router.delete("/:memberId", (req,res) => res.send("<p>Member deletion</p>"))

module.exports = router;