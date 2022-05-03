import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postImage } from '../../store/images';

function CreateImage(){
    const [image,setImage] = useState()
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const user = useSelector(state => state.session.user);
    const userId = user.id
    const dispatch = useDispatch();
    const history = useHistory()

    const submit = async(event) =>{
        event.preventDefault()
        const data = {image, content , userId, title}
        await dispatch(postImage(data))
        history.push("/images")
        setContent("")
        setTitle("")
        setImage()
    }

    const selected = event => {
        const image = event.target.files[0]
        setImage(image)
    }


    return (
        <div>
            <div>Add an image</div>
            <form onSubmit ={submit}>
                <input onChange={selected} type="file" accept="image/*" name="image"></input>
                <input value={title} onChange={e=> setTitle(e.target.value)} type="text" placeholder='title'></input>
                <input value={content} onChange={e=> setContent(e.target.value)} type="text" placeholder='content'></input>

                <button type="submit">Submit</button>
            </form>
            <Link to={`/api/images`}><button>Cancel</button></Link>
        </div>
    )
}

export default CreateImage;
