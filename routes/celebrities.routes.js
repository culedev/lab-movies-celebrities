const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET/POST Create new celebrities "/celebrities/create"
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (err) {
    res.render("celebrities/new-celebrity.hbs")
  }
});

// GET List of Celebrities "/celebrities"

router.get("/", async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render("celebrities/celebrities.hbs", {allCelebrities})
    } catch (err) {
        next(err)
    }
})

module.exports = router;