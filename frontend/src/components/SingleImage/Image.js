import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getImages } from "../../store/images";
import "./image.css"
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../store/comments";

const SingleImagePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const imageId = parseInt(id);
  const user = useSelector((state) => state.session.user);
  const images = Object.values(useSelector((state) => state.images));
  // const comments = Object.values(useSelector((state) => state.comments.comments))
  // console.log("comments", comments)
  const myImage = images.filter(image => {return image.id === +imageId})[0]

  useEffect(() => {
    dispatch(getImages())
      // .then(() => dispatch(getComments(imageId)))
  }, [dispatch]);

    return (
      <div className="single-image-container">
      <h1>{` hello from ${myImage?.id} page `}</h1>
      <h1>{myImage?.title}</h1>
      <img src={myImage?.imageUrl} className="single-image" alt=""></img>
      </div>
    )

};

export default SingleImagePage;
