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

// GET Celebrity Details

router.get("/:celebId/details", async (req, res, next) => {
  const {celebId} = req.params

  try {
    const eachCelebrity = await Celebrity.findById(celebId)
    res.render("celebrities/celebrity-details.hbs", {eachCelebrity})
  } catch (err) {
    next(err)
  }
})

// GET/POST CELEBRITY EDIT

router.get("/:celebId/edit", async (req, res, next) => {
  const {celebId} = req.params
  try {
    const eachCelebrity = await Celebrity.findById(celebId)
    res.render("celebrities/edit-celebrity.hbs", {eachCelebrity})
  } catch (err) {
    next(err)
  }
})

router.post("/:celebId/edit", async (req, res, next) => {
  const {celebId} = req.params
  const {name, occupation, catchPhrase} = req.body

  try {
    await Celebrity.findByIdAndUpdate(celebId, {name, occupation, catchPhrase})
    res.redirect(`/celebrities/${celebId}/details`)
  } catch (err) {
    next(err)
  }
})

// POST DELETE CELEBRITY "/celebrities/:celebId/delete"

router.post("/:celebId/delete", async (req, res, next) => {
  const {celebId} = req.params

  try {
    
    await Celebrity.findByIdAndRemove(celebId)
    res.redirect("/celebrities")

  } catch (err) {
    next(err)
  }
}) 