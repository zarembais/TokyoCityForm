const { Router } = require('express')
const Feedback = require('../models/Feedback')
const router = Router()


router.post('/todb', async (req, res) => {
 
  //console.log(req.body)
  try {
    
    console.log('GOT', req.body)

    const newInterests = await req.body.interests.map(el => el.value)
    const newFeedback = new Feedback({
      name: req.body.name.value, email: req.body.email, about: req.body.about, interests: newInterests, info: req.body.info
    })
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // about: { type: String },
    // interests: [{ type: String }],
    // info: [{ type: String }],

    await newFeedback.save()
    // if (link) {
    //   link.clicks++
    //   await link.save()
    //   return res.redirect(link.from)
    // } 
    res.status(404).json('Link not found! ')
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in redirect" })
  }
})

module.exports = router
