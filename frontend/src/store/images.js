import { csrfFetch } from "./csrf";
import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_IMAGES = 'images/LOAD_IMAGES'
const ADD_IMAGE = 'images/ADD_IMAGE'
const EDIT_IMAGE = 'images/EDIT_IMAGE'
const DELETE_IMAGE = 'images/DELETE_IMAGE'

export const loadImages = images => {
    return {
        type: LOAD_IMAGES,
        images
    }
}

export const addImage = image => {
    return {
        type: ADD_IMAGE,
        image
    }
}

export const editImage = image => {
    return {
        type: EDIT_IMAGE,
        image
    }
}

export const deleteImage = id => {
    return {
        type: DELETE_IMAGE,
        id
    }
}

export const getImages = () => async dispatch => {
    const response = await csrfFetch('/api/images')
    // console.log("wuefhweghfuiwe ====" , response)
    if(response.ok) {
        const images = await response.json()
        dispatch(loadImages(images))
    }
}

export const getUserImages = (userId) => async(dispatch) => {
  const response = await fetch(`/api/images/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const images = await response.json();
  dispatch(loadImages(images, userId))
}

export const postImage = (data) => async dispatch =>{
    const formData = new FormData();
    formData.append("image", data.image)
    formData.append("description", data.description)
    formData.append("userId", data.userId)
    formData.append("title", data.title)
    const response = await csrfFetch('/api/images',{
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })

    if(response.ok){
        const newImage = await response.json();
        dispatch(addImage(newImage))
    }
}

export const imageUpdate = data => async dispatch => {
    // console.log("data-------------", data)
    const response = await csrfFetch(`/api/images/editimage/${data.imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if(response.ok) {
        const updateImage = await response.json()
        dispatch(editImage(updateImage))
    }
    return response
}

export const imageDelete = id => async dispatch => {
    // console.log("is this thign working? ")
    // console.log(id)
    const response = await csrfFetch(`/api/images/${id}`, {
        method: "DELETE"
    })
    if(response.ok) {
        dispatch(deleteImage(id))
    }
    return response
}

const initialState = {}

const imageReducer = (state = initialState, action) => {
    const newState = clone(state)
    switch(action.type) {
        case LOAD_IMAGES:
            const images = action.images
            images.images.forEach(image => {
                newState[image.id] = image
            })
        return newState
        case ADD_IMAGE:
            newState[action.image.id]=action.image
            return newState
        case EDIT_IMAGE:
            delete(newState[action.image.id])
            newState[action.image.id] = action.image
            return newState
        case DELETE_IMAGE:
            delete(newState[action.id])
            return newState
        default:
            return newState
    }
}

export default imageReducer
