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
  hello: 'Hi! How can I help you today?',
  hi: 'Hi! How can I help you today?',
  howareyou: 'Hi! I am good How can I help you today?',
  goodbye: 'Goodbye! Have a great day!',
  thanks: 'You’re welcome! Anything else you need?',
  greetings: 'Greetings! How can I assist you today?',
  events:
    'There are many exciting events happening on campus this week! Check out our website for more information. Here is the link to our website: https://rkgit.edu.in/ ',
  courses:
    'We provide various courses in our college B.Tech., B.Pharma, MBA. Please follow this link for more : https://rkgit.edu.in/Departments/courses/ ',
  'academic calendar':
    'Here is the link to our academic calendar : https://rkgit.edu.in/upload/AcademicCalendarODDsemester2022.pdf ',
  library:
    'Our library has a vast collection of books, journals, and other resources for our students! Please visit our library for more information.',
  admissions:
    'If you’re interested in applying to our college, please visit our admissions website for more information : https://rkgit.edu.in/ ',
  'virtual tour':
    'Follow the link to our virtual tour : https://rkgit.edu.in/virtual-tour/virtual-tour/ ',
  placements:
    'The data can be available through this link : https://rkgit.edu.in/Training-and-Placements/ ',
  academics:
    'We have the following academics scenario for this session. Click on this link to get full information page: https://rkgit.edu.in/academics/ ',
  'Contact details':
    'Phone : 0120-2788273, 2788409  Email : registrar@rkgit.edu.in  ',
  'Tollfree number': '1800120777755',
  clubs:
    'We have a wide variety of clubs and organizations on campus! You can find a full list on our website. Some are listed : Literary Club, Science Club, Music Club…',
  sports:
    'Our sports teams are doing great this season! Check out the schedule on our website.',
  'alumni info':
    'Thank you for your interest in our alumni! Our alumni network is a valuable resource for students like you. Our alumni have gone on to achieve great things in various fields, and they are often willing to connect with current students. Follow the given link : https://rkgit.edu.in/Alumni/ ',

  'financial-aid':
    'We offer a variety of financial aid options for our students! Please visit our financial aid website for more information.',
  housing:
    'Our on-campus housing options are comfortable and convenient! Please visit our housing website for more information.',
  dining:
    'We have a wide variety of dining options on campus! Check out our dining website for menus and hours of operation.',

  'health-services':
    'We offer a variety of health services for our students, including counseling and medical care. Please visit our health services website for more information.',
  'career-services':
    'Our career services office can help you with job searches, resumes, and interviews! Please visit our career services website for more information.',
  'student-life':
    'Our college has a vibrant student life community! Check out our website for more information on clubs, events, and activities.',
  academics:
    'We offer a wide variety of academic programs, including majors, minors, and certificates. Please visit our academic programs website for more information.',
  'study-abroad':
    'We offer a variety of study abroad programs for our students! Please visit our study abroad website for more information.',
  research:
    'Our faculty and students are engaged in a wide range of research activities! Please visit our research website for more information.',
  technology:
    'We have state-of-the-art technology resources available to our students! Please visit our technology website for more information.',
  transportation:
    'Our campus is easily accessible by public transportation! Please visit our transportation website for more information.',
  sustainability:
    'We’re committed to sustainability and reducing our carbon footprint! Please visit our sustainability website for more information.',
  diversity:
    'We value diversity and inclusivity on our campus! Please visit our diversity website for more information.',
  security:
    'We take the safety and security of our students seriously! Please visit our security website for more information.',
  emergency:
    'In case of an emergency, please dial 911 or visit our emergency website for more information.',
}
// GET ALL POST
// router.get('/fetch/:stringParam', async (req, res) => {
//   try {
//     const stringParam = req.params.stringParam
//     const mappedString = stringMap[stringParam] || 'No mapping found'
//     res.send(mappedString)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })
router.get('/fetch/:stringParam', async (req, res) => {
  try {
    const stringParam = req.params.stringParam.toLowerCase() // convert input to lowercase
    let mappedString = 'Sorry! I dont know about that'

    // Iterate over the keys in stringMap
    for (const key in stringMap) {
      // Check if the input string includes the key or vice versa
      if (stringParam.includes(key) || key.includes(stringParam)) {
        mappedString = stringMap[key] // assign the mapped value
        break // exit the loop once a match is found
      }
    }

    res.send(mappedString)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
