import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { imageUpdate } from '../../store/images';
import "./update.css"

function UpdateImage(){
    const { imageId } = useParams()
    const image = useSelector(state=> state.images[imageId])
    // console.log("image: =======", image)
    // const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState(image.title)
    const [content, setContent] = useState(image.content)
    const [ errors, setErrors ] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()

    const submit = async(event)=>{
        console.log("is submit wokring ?")
        event.preventDefault();
        const data = { title, content, imageId }
        const updateImage = await dispatch(imageUpdate(data))
        .catch(
            async err => {
            const error = await err.json();
                if(error && error.errors) {
                    setErrors(error.errors);
                }
            }
         )
        if(updateImage) history.push('/images')
    }



    return (
        <div className='update-page'>
            <div className='update-h1'>Edit Your Image</div>
            <form className='update-page-container' onSubmit={submit}>
              <ul className='errors'>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
             </ul>
                <input className="update-title" value={title} onChange={e=> setTitle(e.target.value)} placeholder='title'></input>
                <input className="update-content" value={content} onChange={e=> setContent(e.target.value)} placeholder='content'></input>
                <div className='update-btns-container'>
                    <button className="update-btn" type="submit"><i class="fas fa-edit"></i></button>
                    <NavLink to={`/images`}><button className="update-trash"><i class="fa fa-trash"></i></button></NavLink>
                </div>
             </form>
        </div>
    )
}

export default UpdateImage
