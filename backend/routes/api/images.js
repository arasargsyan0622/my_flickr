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

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const image = await db.Image.findAll({
      where: { userId },
      include: User
  })
  return res.json({ image })
}));

router.get('/image/:id', asyncHandler(async(req, res) => {

  const id = parseInt(req.params.id, 10);

  const image = await db.Image.findByPk(id, {include: User})
  return res.json({ image })
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

router.put('/editimage/', asyncHandler(async(req, res) => {
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


/* comments */

router.get('/image/:id/comments', asyncHandler(async(req, res, next)=>{
    // console.log("this is inside of the router")
    const imageId = parseInt(req.params.id, 10)
    const comments = await db.Comment.findAll({
        where: {
            imageId,
        }
    });
    // console.log("this is comments", comments)
    res.json({ comments })
}))

router.post("/image/:id/comment", asyncHandler(async(req, res) => {
  const { userId, imageId, comment } = req.body;
  const newComment = await db.Comment.build({ userId, imageId, comment });
    await newComment.save();
    const comments = await db.Comment.findAll({
      where: { imageId },
      include: db.User
    });
    return res.json(comments);
}));


router.put('/image/:imageId/comment/:commentId/edit', asyncHandler(async(req, res) => {
  const imageId = parseInt(req.params.imageId, 10);
  const commentId = parseInt(req.params.commentId, 10);

  const prevComment = await db.Comment.findByPk(commentId);
  await prevComment.update(req.body);
  const comments = await db.Comment.findAll({
    where: {
      imageId
    }
  })
  return res.json(comments);

}))

router.delete('/image/:imageId/comment/:commentId/delete', asyncHandler(async(req, res) => {
  const imageId = parseInt(req.params.imageId, 10);
  const commentId = parseInt(req.params.commentId, 10);

  const comment = await db.Comment.findByPk(commentId);
  await comment.destroy();

  const comments = await db.Comment.findAll({
    where: {
      imageId
    },
    include: db.User
  });

  return res.json(comments)
}))

module.exports = router
