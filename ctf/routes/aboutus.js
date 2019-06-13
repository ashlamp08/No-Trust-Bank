const express = require("express");
const people = require("./people.json");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("aboutus", {
    title: "About Us",
    people: people.profiles
  });
});

router.get("/", (req, res) => {
  const person = people.profiles.find(p => p.id === req.query.id);
  res.render("profile", {
    title: `About ${person.firstname} ${person.lastname}`,
    person
  });
});

router.get("/blog",(req,res)=> {
    res.render("blog", {
        title: "Travel Blog"
    })
});

module.exports = router;