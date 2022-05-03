const express = require('express')
const router = express()
const asyncHandler = require('express-async-handler')


const db = require("../../db/models")

router.get('/', asyncHandler(async(req, res, next)=>{

    const images = await db.Image.findAll({});

    res.json({images})
}))

router.post('/', asyncHandler(async(req, res)=>{
    const { title, content, userId } = req.body
    console.log("fjuwerfhuerheru", req.body)
    const newImage = { title, content, userId }
    console.log("this is new image ===============", newImage)
    const image = await db.Image.build(newImage)
    await image.save();
    res.json(image)
}));


// router.post(
//   "/",
//   singleMulterUpload("image"),
//   validateSignup,
//   asyncHandler(async (req, res) => {
//     const { email, password, username } = req.body;
//     const profileImageUrl = await singlePublicFileUpload(req.file);
//     const user = await User.signup({
//       username,
//       email,
//       password,
//       profileImageUrl,
//     });

//     setTokenCookie(res, user);

//     return res.json({
//       user,
//     });
//   })
// );

module.exports = router
