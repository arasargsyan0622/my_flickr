import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
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
  const history = useHistory();

  const { userId } = useParams();
  const { id } = useParams();
  const imageId = parseInt(id);

  const user = useSelector((state) => state.session.user);
  const images = Object.values(useSelector((state) => state.images));

  const comments =  Object.values(useSelector((state) => state.comments))
  // console.log("comments", comments)
  const myImage = images.filter(image => {return image.id === +imageId})[0]
  // console.log("myImage", myImage)

  const [newComment, setNewComment] = useState('');
  const [edit, setEdit] = useState('')

  /* show comments*/

  useEffect(() => {
    dispatch(getImages())
      .then(() => dispatch(getComments(imageId)))
  }, [dispatch]);

  /* post a comment */

  const postComment = async(e) => {
    e.preventDefault();
    if(!user) {
      alert("You must be logged in to comment")
      return
    }
    const addComment = {
      userId: user.id,
      imageId: myImage.id,
      comment: newComment
    }
    await dispatch(createComment(addComment))
      .then(setNewComment(''))
  }

  /* delete a comment */

  const removeComment = async(e) => {
    e.preventDefault();

    await dispatch(deleteComment(myImage.id, e.target.id))
  }


    return (
      <div className="single-image-container">
        <h1>{myImage?.title}</h1>
        <img src={myImage?.imageUrl} className="single-image" alt=""></img>

        <form onSubmit={postComment}>
          <input className="comment-input" value={newComment} onChange={(e) => setNewComment(e.target.value)} required></input>
          <button className="comment-button" type="submit">Comment</button>
        </form>

        {comments && comments.map((comment) => {
          return (
            <div className="comments-container">
              <h3>{comment.comment}</h3>
              {comment.userId === user?.id && (
                <button className="delete-button" id={comment.id} onClick={removeComment}>Delete</button>
              )}
            </div>
          )
        })}

      </div>
    )
}
export default SingleImagePage;
