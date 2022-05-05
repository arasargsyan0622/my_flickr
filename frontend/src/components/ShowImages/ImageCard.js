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
        <div className="images-container">
            <h2 className="image-title">{image.title}</h2>
            <h3>{image.content}</h3>
            <Link to={`/images/${image.id}`}><img src={`${image.imageUrl}`} alt="" className="images"></img></Link>
            { (user.id === image.userId) ? <Link to={`/editimage/${image.id}`}><button>Edit</button></Link> : <div></div> }
            { (user.id === image.userId) ? <button onClick={deleteImage}>Delete</button> : <div></div> }
        </div>
    )
}

export default ImageCard
