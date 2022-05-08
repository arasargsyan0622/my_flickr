import ImageCard from "./ImageCard";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getImages }  from"../../store/images";



const ImageBrowser = ()=>{
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const images = Object.values(useSelector(state => state.images));
    const reverseImages = images.reverse()
    // console.log("images in the i ndex", images)

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])
    // console.log("images --------", images )

    if(!images){
        return null
    }

    return (
        <div className="all-images-container">
                {reverseImages && images.map((image)=>{
                        // console.log("image in index ", image)
                    return(
                        <div className="image-container">
                            <ImageCard className="single-image" image={image}></ImageCard>
                        </div>
                    )
                    })
                }
        </div>
    )
}

export default ImageBrowser;
