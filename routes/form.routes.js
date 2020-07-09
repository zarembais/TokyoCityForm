const { Router } = require('express')
const Feedback = require('../models/Feedback')
const router = Router()

router.post('/todb', async (req, res) => {
  try {
    const newInterests = await req.body.interests.map(el => el.value)
    const newFeedback = new Feedback({
      name: req.body.name.value, email: req.body.email, about: req.body.about, interests: newInterests, info: req.body.info
    })
    await newFeedback.save()
    res.status(404).json('Link not found! ')
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in redirect" })
  }
})

module.exports = router
