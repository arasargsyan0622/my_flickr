import { useDispatch, useSelector }from "react-redux"

function ImageCard({image}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);

    return(
        <div>
            <h1>{image.title}</h1>
            <div>{image.userId}</div>
            <div>{image.id}</div>
        </div>
    )
}

export default ImageCard
