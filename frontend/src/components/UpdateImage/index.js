import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { imageUpdate } from '../../store/images';

function UpdateImage(){
    const { imageId } = useParams()
    const image = useSelector(state=> state.images[imageId])
    // console.log("image: =======", image)
    // const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState(image.title)
    const [content, setContent] = useState(image.content)
    const dispatch = useDispatch()
    const history = useHistory()

    const submit = async(event)=>{
        // console.log("is submit wokring ?")
        event.preventDefault();
        const data = { title, content, imageId }
        await dispatch(imageUpdate(data))
        // setTitle("")
        // setContent("")
        history.push("/images")
    }



    return (
        <div>
            <div>Edit Image</div>
            <form onSubmit = {submit}>
                <input value={title} onChange={e=> setTitle(e.target.value)} type="text" placeholder='title'></input>
                <input value={content} onChange={e=> setContent(e.target.value)} type="text" placeholder='content'></input>
                <button type="submit" >Edit</button>
            </form>
            <Link to={`/images`}><button>Cancel</button></Link>
        </div>
    )
}

export default UpdateImage