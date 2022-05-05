import { csrfFetch } from "./csrf";
import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'
const ADD_COMMENT = 'comments/ADD_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

export const loadComments = comment => {
    return {
        type: LOAD_COMMENTS,
        comment
    }
}

export const addComment = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const editComment = comment => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export const commentDelete = comment => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const getComments = (imageId) => async dispatch => {
    const response = await csrfFetch(`/api/images/image/${imageId}/comments`, {
        method: "GET"
    })
    if(response.ok) {
        const data = await response.json()
        dispatch(loadComments(data))
    }
}

export const createComment = newComment => async dispatch => {
    const { userId, imageId, comment } = newComment

    const response = await csrfFetch(`/api/images/image/${imageId}/comment`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, imageId, comment })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(data))
    }
}

export const updateComment = (data, commentId, imageId) => async dispatch => {
    const response = await csrfFetch(`api/images/image/${imageId}/comment/${commentId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    const comment = await response.json()
    dispatch(editComment(comment))
    return comment
}

export const deleteComment = (imageId, commentId) => async dispatch => {
  const response = await csrfFetch(`/api/images/image/${imageId}/comment/${commentId}/delete`, {
    method: 'DELETE'
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(commentDelete(data));
  }
    return response;
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
    const newState = clone(state)
    switch(action.type) {
        case LOAD_COMMENTS:
            const comments = action.comments
            comments.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState;
        case ADD_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case EDIT_COMMENT:
            delete(newState[action.comment.id])
            newState[action.comment.id] = action.comment
            return newState;
        case DELETE_COMMENT:
            delete(newState[action.id])
            return newState
        default:
            return newState
    }

}

export default commentReducer
