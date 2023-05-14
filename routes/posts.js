const router = require('express').Router()
const Post = require('../models/Post')

// CREATE POST
router.post('/', async (req, res) => {
  const newPost = await Post(req.body)
  try {
    const savePost = await newPost.save()
    res.status(200).json(savePost)
  } catch (err) {
    res.status(400).json(err)
  }
})

//UPDATE POST
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await post.delete()
        res.status(200).json('Post has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})
const stringMap = {
  hello: 'Hi how are you',
  goodbye: 'See you later',
  thanks: 'Thank you very much',
}
// GET ALL POST
router.get('/map/:stringParam', async (req, res) => {
  try {
    const stringParam = req.params.stringParam
    const mappedString = stringMap[stringParam] || 'No mapping found'
    res.send(mappedString)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
