import { getImages } from '../../store/images';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { NavLink, useHistory  } from 'react-router-dom';
import { imageDelete } from '../../store/images';
import { getUserImages } from '../../store/images';
import { getComments, createComment, deleteComment, updateComment } from '../../store/comments';

const Image = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { imageId } = useParams();
  const image = useSelector(state => state.image[imageId]);

  const user = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments.comments);

  const [newComment, setNewComment] = useState('');
  const [edit, setEdit] = useState('');

  useEffect(() => {
    dispatch(getImages(imageId));
    dispatch(getComments(imageId));

  },[dispatch, imageId])

  const submitComment = async(e) => {
    e.preventDefault();
    if(!user) return;
    const addComment = {
      userId: user.id,
      imageId: imageId,
      comment: newComment
    };
    await dispatch(createComment(addComment)).then(setNewComment(''));
  }


  const deleteAComment = async(e, commentId) => {
    e.preventDefault();
    await dispatch(deleteComment(imageId, commentId));

  }

  const submitEdit = (commentId) => {
    const payload = {
      comment: edit
    };
    dispatch(updateComment(payload, commentId, +imageId)).then(() => dispatch(getComments(imageId)));
  }

  const removeImage = (e) => {
    e.preventDefault();

    dispatch(imageDelete(imageId)).then(() => dispatch(getUserImages(user.id)));
    history.push('/');
  }

  return (
    <div>
    <div className='singleImageBackground'> </div>
    <div className='singleImageBackgroundBottom'></div>
    <div className='imageContainer2'>
      <div className='singleImageComponent'>
        <h1 className='singleImageName'>{image?.name}</h1>
        <img src={image?.imageUrl} alt="image" className='Image' ></img>
        <div className='buttonContainer'>
          <NavLink to={`/profile/${image?.User.id}`}> <button className='back'>Back</button> </NavLink>
        {image?.User.id === user?.id && (
          <button onClick={removeImage} className='delete'>Delete</button>
          )}
        </div>

        <div className='descriptionContainer'>
          <p className='singleCarDescription'>{image?.description}</p>
        </div>
        <div className='addCommentContainer'>
          <div className='addCommentBox'>

            <form className='addCommentForm' onSubmit={submitComment}>
              <input className='commentInput' placeholder='Leave a comment' value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              >
              </input>
              <button className='addCommentSubmit' type='submit'>Comment</button>
            </form>
            <h2 className='commentsTitle'>Comments</h2>
            {
              comments?.map((comment) => {
        return <div className={`commentBox ${comment.id}`} id={comment.id} key={comment.id}>
                  <div className='allCommentsContainer'>
                    <div
                      className={`comment${comment.id}`}
                    >
                  <div className='COMMENT'>
                    {/* <NavLink to ={`/profile/${comment.User?.id}`} ><img src={comment.User?.profilePicUrl} alt="image" className='userCommentProfilePic'></img> </NavLink> */}
                    <NavLink to ={`/profile/${comment.User?.id}`} className='profileCommentName'><h3>{comment.User?.username}</h3> </NavLink>
                    {comment.comment}
                  </div>

                    </div>
                    <div className={`hidden input${comment.id}`}>
                    <textarea
                      className='editCommentInput'
                      onChange={(e) => setEdit(e.target.value)}
                      value={edit}
                    />
                    <button className= 'submitEditButton'onClick={() => submitEdit(comment.id)}>Submit Changes</button>

                    </div>
                  </div>
              {comment.userId === user?.id && (
                <div>
                  <button className='deleteCommentButton' onClick={(e) => deleteAComment(e, comment.id)} >Delete</button>
                </div>
              )}

                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Image;
