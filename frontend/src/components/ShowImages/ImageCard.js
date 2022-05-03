import { useDispatch, useSelector }from "react-redux"
import "./images.css"
import {Link, useHistory} from "react-router-dom"

function ImageCard({image}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);

    const redirect = ()=>{
        history.push("/images")
    }

    return(
        <div className="images-container">
            <h1>{image.title}</h1>
            <img src={`${image.imageUrl}`} alt="" className="images"></img>
            { (user.id === image.userId) ? <Link to={`/editimage/${image.id}`}><button>Edit</button></Link> : <div></div> }
        </div>
    )
}

export default ImageCard
