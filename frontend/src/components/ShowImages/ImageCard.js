import { useDispatch, useSelector }from "react-redux"
import "./images.css"

function ImageCard({image}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);

    return(
        <div>
            <h1>{image.title}</h1>
            <img src={`${image.imageUrl}`} alt="" className="images"></img>
        </div>
    )
}

export default ImageCard
