const express = require('express')
const router = express()
const asyncHandler = require('express-async-handler')
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')

const db = require("../../db/models")

router.get('/', asyncHandler(async(req, res, next)=>{

    const images = await db.Image.findAll({});

    res.json({images})
}))

router.post('/', singleMulterUpload("image"), asyncHandler(async(req, res)=>{
    const { title, content, userId } = req.body
    // console.log("fjuwerfhuerheru", req.body)
    const imageUrl = await singlePublicFileUpload(req.file);
    const newImage = { title, imageUrl, content, userId }
    console.log("this is new image ===============", newImage)
    const image = await db.Image.build(newImage)
    await image.save();
    res.json(image)
}));


module.exports = router
