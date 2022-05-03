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
            <h1>{image.title}</h1>
            <h3>{image.content}</h3>
            <img src={`${image.imageUrl}`} alt="" className="images"></img>
            { (user.id === image.userId) ? <Link to={`/editimage/${image.id}`}><button>Edit</button></Link> : <div></div> }
            { (user.id === image.userId) ? <button onClick={deleteImage}>Delete</button> : <div></div> }
        </div>
    )
}

export default ImageCard
