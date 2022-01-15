const router = require("express").Router();
//Require the User Schema
const User = require("../models/User");

//Require the sujet Schema

const Sujet = require("../models/Sujet");
// Require Authentification middlewares

const isAuth = require("../middlewares/isAuth");

// Add sujet
// acces private

router.post("/sujets", async (req, res) => {
  const { description, title } = req.body;
  try {
    // const user = await User.findById(_id).select("-password");
    const newsujet = {
      title,
      description,
    };
    const sujet = await new sujet(newsujet).save();
    res.json({ msg: "sujet added", sujet });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error !");
  }
});

router.post("/", isAuth, async (req, res) => {
  const { description, title } = req.body;
  console.log(req);
  try {
    console.log(req.user);
    const user = await User.findById(req.user._id).select("-password");
    const newsujet = {
      title,
      description,

      by: user.email,
    };
    const sujet = await new Sujet(newsujet).save();
    res.json({ msg: "sujet added", sujet });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error !");
  }
});

// Get sujets
// acces public
router.get("/", async (req, res) => {
  try {
    const sujets = await Sujet.find();
    res.json({ msg: "All sujets", sujets });
  } catch (error) {
    console.log(error);
  }
});
// get sujet by type
// public acces
router.get("/sujet/type", async (req, res) => {
  const { type } = req.body;
  try {
    const sujet = await sujet.findOne(type);
    res.json({ msg: "sujet", sujet });
  } catch (error) {
    console.log(error);
  }
});
// get sujet by user
// public acces
router.get("/sujet/user", async (req, res) => {
  const { user } = req.body;
  try {
    const sujet = await sujet.findOne({ name: user });
    res.json({ msg: "sujet", sujet });
  } catch (error) {
    console.log(error);
  }
});

// Get one sujet
// acces public
router.get("/onesujet/:id", async (req, res) => {
  const { _id } = req.params;
  try {
    const sujet = await sujet.findOne(_id);
    res.json({ msg: "sujet", sujet });
  } catch (error) {
    console.log(error);
  }
});

// Edit his sujet
// acces private
router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const sujet = await sujet.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { new: true }
    );
    res.json({ msg: "sujet edited", sujet });
  } catch (error) {
    console.log(error);
  }
});

// Delete his sujet
// acces private
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sujet = await sujet.findOneAndDelete({ _id: id });
    res.json({ msg: "sujet deleted", sujet });
  } catch (error) {
    console.log(error);
  }
});

// Comment an sujet
// acces private
// router.post("/newcomment/:index", isAuth, async (req, res) => {
//   const { index } = req.params;
//   try {
//     const sujet = await sujet.findById(index);
//     const user = await User.findById(req.user.id);
//     const newComment = {
//       user: user.id,
//       name: user.name,
//       commentaire: req.body.commentaire,

//       date: Date.now(),
//     };

//     sujet.comments.unshift(newComment);
//     await sujet.save();
//     res.json(sujet);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Reclamer sujet
// // acces private
// router.post("/reclamation/:_id/", isAuth, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(req.user._id);
//     const sujet = await sujet.findOne(id);

//     const newReclamtion = {
//       user: user.id,
//       reclamation: req.body.reclamation,
//       name: user.name,
//       date: Date.now(),
//     };
//     sujet.reclamsujets.unshift(newReclamtion);

//     await sujet.save();
//     res.json(sujet.reclamsujets);
//   } catch (error) {
//     res.status(500).send("Server Error !");
//   }
// });

// //Delete comment
// // acces private
// router.delete("/deletecomment/:_id/:index/", isAuth, async (req, res) => {
//   const { _id } = req.params;

//   const { index } = req.params;
//   try {
//     const sujet = await sujet.findById(_id);
//     const comment = sujet.comments.find((comment) => comment.id === index);
//     if (!comment) {
//       return res.status(404).json({ msg: "Comment does not exist" });
//     }
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "User not authorized" });
//     }
//     const removeIndex = sujet.comments
//       .map((comment) => comment.user.toString())
//       .indexOf(req.user._id);

//     sujet.comments.splice(removeIndex, 1);
//     await sujet.save();
//     res.json(comment);
//   } catch (error) {
//     res.status(500).send("Server Error !");
//   } //{ $pull: { results: { score: 8 , item: "B" } } }
// });

// //edit a comment
// // private acces
// router.put("/editcomment/:_id/:index", isAuth, async (req, res) => {
//   const { _id } = req.params;
//   const { index } = req.params;
//   const { userId } = req.user._id;
//   const { commentaire } = req.body;
//   try {
//     const sujet = await sujet.updateOne(
//       { _id, "comments._id": index, "comments.user": userId },
//       { $set: { "comments.$.commentaire": commentaire } }
//     );

//     res.json(sujet);
//   } catch (error) {
//     res.status(500).send("Server Error !");
//   }
// });

module.exports = router;
