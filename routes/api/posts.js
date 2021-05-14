const express = require('express');
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Posts");
const { check, validationResult } = require("express-validator/check");


const router = express.Router();

// @route   Post api/posts/
// @desc    create a post
// @access  private
router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    const post = await new Post(newPost);
    await post.save()
    res.json(post)


  } catch (er) {
    console.log(er.message);
    console.log(e.message);
    res.status(500).send("server errorr");
  }
});

// @route   Get api/posts/
// @desc    get all post
// @access  private
router.get('/', auth, async (req, res) => {
  try {

    let posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (er) {
    console.log(er.message);
    res.status(500).send("server errorr");
  }

})
// @route   Get api/posts/:postid
// @desc    get post by post-id
// @access  private
router.get('/:postid', auth, async (req, res) => {
  try {

    let post = await Post.findById(req.params.postid)
    if (!post) {
      return res.status(404).json({ msg: "post not found" })
    }
    res.json(post)

  } catch (er) {
    if (er.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" })
    }
    console.log(er.message);
    res.status(500).send("server errorr");
  }

})

// @route   Delete api/posts/:postid
// @desc    delete post by id
// @access  private
router.delete('/:postid', auth, async (req, res) => {
  try {

    let post = await Post.findById(req.params.postid)
    if (!post) {
      return res.status(404).json({ msg: "post not found" })
    }
    console.log(post.user)
    console.log(typeof post.user.toString())
    console.log(typeof req.user.id)

    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized user" })
    }
    await post.remove()
    res.json({ msg: "post removed" })


  } catch (er) {
    if (er.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" })
    }
    console.log(er.message);
    res.status(500).send("server errorr");
  }

})
// @route   Put api/posts/like/:post_id
// @desc    like a post
// @access  private
router.put('/like/:post_id',auth,async(req,res) =>{
  try {
    const post = await  Post.findById(req.params.post_id);
    //check if the post is already been like

    if(post.likes.filter(item => (item.user.toString() === req.user.id)).length > 0){
      console.log('possssst')
      return res.status(400).json({msg : "post has already been liked"})

    }
    post.likes.unshift({user : req.user.id})
    await post.save();
    res.json(post.likes)
  } catch (er) {
    console.log(er.message);
    res.status(500).send("server errorr");
  }
})

// @route   Put api/posts/unlike/:post_id
// @desc    like a post
// @access  private
router.put('/unlike/:post_id',auth,async(req,res) =>{
  try {
    const post = await  Post.findById(req.params.post_id);
    // check if the post is already been like
    if(post.likes.filter(item => item.user.toString() === req.user.id).length === 0){
      return res.status(400).json({msg : "post has not been liked"})

    }
  
    const index = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
    post.likes.splice(index,1)
    await post.save();
    res.json(post.likes)
  } catch (er) {
    console.log(er.message);
    res.status(500).send("server errorr");
  }
})





// @route   Post api/posts/comment/:id
// @desc    comment on a post
// @access  private
router.post('/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id)
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment);
     await post.save()
     res.json(post.comments)


  } catch (er) {
    console.log(er.message);
    console.log(e.message);
    res.status(500).send("server errorr");
  }
});

module.exports = router;
