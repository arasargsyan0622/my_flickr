import ImageCard from "./ImageCard";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getImages }  from"../../store/images";


const ImageBrowser = ()=>{
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const images = Object.values(useSelector(state => state.images));
    // console.log("images in the i ndex", images)

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])
    // console.log("images --------", images )

    if(!images){
        return null
    }

    return (
        <div>
            {images && images.map((image)=>{
                return(
                    <ImageCard image={image}></ImageCard>
                    )
                })
            }
        </div>
    )
}

export default ImageBrowser;
