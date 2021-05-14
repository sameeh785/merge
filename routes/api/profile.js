const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Post = require("../../models/Posts");
const User = require("../../models/User");
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const { response } = require("express");
const { post } = require("./posts");

// @route   GET api/profile/me
// @desc    get current user profile
// @access  private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("server errorr");
  }
});
// @route   POST api/profile/
// @desc    create user profile
// @access  private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skill is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills
        .split(",")
        .map((item) => item.trim());
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      console.log("sami");
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = await new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("server error");
    }
  }
);
// @route   GET api/profile/
// @desc    get all profile
// @access  public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profiles);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("server error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    get profile of a user by id
// @access  public
router.get("/user/:user_id", async (req, res) => {
  try {
    console.log("1212121");
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.send(profile);
  } catch (e) {
    console.log(e.message);
    if (e.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(500).send("server error");
  }
});
// @route   DELETE api/profile/user/
// @desc    delete user profile ,user
// @access  private
router.delete("/", auth, async (req, res) => {
  try {
    // remove user profile
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "user has deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("server error");
  }
});
// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("server error");
    }
  }
);
// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience from profile
// @access  private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    console.log("sami");
    const profile = await Profile.One({ user: req.user.id });
    //get remove index
    const index = profile.experience
      .map((item) => item._id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(index, 1);
    await profile.save();
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),

      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save(res.json(profile));
    } catch (e) {
      console.log(e.message);
      res.status(500).send("server error");
    }
  }
);
// @route   DELETE api/profile/education/:edu_id
// @desc    delete education from profile
// @access  private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.One({ user: req.user.id });
    //get remove index
    const index = profile.education
      .map((item) => item._id)
      .indexOf(req.params.exp_id);
    profile.education.splice(index, 1);
    await profile.save();
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("server error");
  }
});
// @route   GET api/profile/github/:username
// @desc    get current user repository from github
// @access  private
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github user profile found" });
      }
      console.log(JSON.parse(body));
      res.json(JSON.parse(body));
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
