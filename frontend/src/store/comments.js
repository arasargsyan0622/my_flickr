import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'users/LOAD_COMMENTS'
const ADD_COMMENT = 'users/ADD_COMMENT'
const EDIT_COMMENT = 'users/EDIT_COMMENT'

export const loadComments = comment => {
    return {
        type: LOAD_COMMENTS,
        payload: comment
    }
}

export const addComment = comment => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

export const editComment = comment => {
    return {
        type: EDIT_COMMENT,
        payload: comment
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

export const updateComment = (payload, commentId, imageId) => async dispatch => {
    const response = await csrfFetch(`api/images/image/${imageId}/comment/${commentId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    const comment = await response.json()
    dispatch(editComment(comment))
    return comment
}

export const deleteComment = (imageId, commentId) => async dispatch => {
  const res = await csrfFetch(`/api/images/image/${imageId}/comment/${commentId}/delete`, {
    method: 'DELETE'
  });

  if(res.ok) {
    const data = await res.json();
    dispatch(getComments(data));
    return res;
  }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case LOAD_COMMENTS:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        case ADD_COMMENT:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        case EDIT_COMMENT:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        default:
        return newState
    }

}

export default commentReducer
