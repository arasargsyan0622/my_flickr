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
  console.log("comments", comments)
  const myImage = images.filter(image => {return image.id === +imageId})[0]
  // console.log("myImage", myImage)

  const [ newComment, setNewComment ] = useState('');
  const [ errors, setErrors ] = useState([]);
  // const [edit, setEdit] = useState('')

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
      .then(() => dispatch(getComments(imageId)))
      .catch(
        async err => {
          const error = await err.json();
          if(error && error.errors) {
            setErrors(error.errors);
          }
        }

      )
  }

  /* delete a comment */

  const removeComment = async(e, commentId) => {
    e.preventDefault();
    // console.log("this is value id", e.target.value.id)
    await dispatch(deleteComment(myImage.id, commentId))
      .then(() => dispatch(getComments(imageId)))
  }


    return (
      <div className="single-image-container">
        <div className="single-image-top">
          <h1 className="single-image-title">{myImage?.title}</h1>
          <p className="image-content">{myImage?.content}</p>
          <img src={myImage?.imageUrl} className="single-image-page" alt=""></img>
        </div>
        <form className="comment-form-container" onSubmit={postComment}>
          <ul className="comment-errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
          </ul>
          <input className="comment-input" placeholder="Leave a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
          <button className="comment-button" type="submit"><i className="fa-regular fa-comments"></i></button>
        </form>

        {comments && comments.map((comment) => {
          return (
            <div className="comments-container">
              <h3 className="single-comment">{comment.comment}</h3>
              {comment.userId === user?.id && (
                <button className="comment-delete-button" onClick={(e) => removeComment(e, comment.id)}><i className="fa fa-trash"></i></button>
              )}
            </div>
          )
        })}

      </div>
    )
}
export default SingleImagePage;
