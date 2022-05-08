import { useDispatch, useSelector }from "react-redux"
import "./images.css"
import {Link, useHistory} from "react-router-dom"
import { imageDelete } from "../../store/images"


function ImageCard({image}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);

    const deleteImage = () => {
        dispatch(imageDelete(image.id))
    }

    const redirect = () => {
        history.push("/images")
    }

    return(
        <>
            <h2 className="image-title">{image.title}</h2>
            <Link to={`/images/${image.id}`}><img src={`${image.imageUrl}`} alt="" className="single-image"></img></Link>

            <div className="image-btns">
                { (user.id === image.userId) ? <Link to={`/editimage/${image.id}`}><button className="edit-btn"><i className="fa fa-edit"></i></button></Link> : <div></div> }
                { (user.id === image.userId) ? <button className="delete-btn" onClick={deleteImage}><i className="fa fa-trash"></i></button> : <div></div> }
            </div>
         </>
    )
}

export default ImageCard
