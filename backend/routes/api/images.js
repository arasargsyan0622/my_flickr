const express = require('express')
const router = express()
const asyncHandler = require('express-async-handler')
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')

const db = require("../../db/models")

router.get('/', asyncHandler(async(req, res, next)=>{
    // console.log("why is it in get route?")
    const images = await db.Image.findAll();

    res.json({images})
}))

router.post('/', singleMulterUpload("image"), asyncHandler(async(req, res)=>{
    const { title, content, userId } = req.body
    // console.log("fjuwerfhuerheru", req.body)
    const imageUrl = await singlePublicFileUpload(req.file);
    const newImage = { title, imageUrl, content, userId }
    // console.log("this is new image ===============", newImage)
    const image = await db.Image.build(newImage)
    await image.save();
    res.json(image)
}));

router.put('/editimage/:id', asyncHandler(async(req, res) => {
    // console.log("hell from put route")
    const imageId = req.params.id
    const { title, content, userId } = req.body
    const editImage = await db.Image.findByPk(imageId)
    await editImage.update({ title, content })
    res.json(editImage)
}))

router.delete('/:id', asyncHandler(async(req, res) => {
    console.log("this is inside of the router")
    const imageId = req.params.id
    const deleteImage = await db.Image.findByPk(imageId)
    if (deleteImage !== undefined) {
        await deleteImage.destroy()
    }
    res.json({ message: "successfully deleted" })
}))


module.exports = router
