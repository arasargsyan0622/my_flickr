import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postImage } from '../../store/images';
import "./upload.css";

function CreateImage(){
    const [ image, setImage ] = useState()
    const [ content, setContent ] = useState("")
    const [ title, setTitle ] = useState("")
    const [ errors, setErrors ] = useState([]);
    const user = useSelector(state => state.session.user);
    const userId = user.id
    const dispatch = useDispatch();
    const history = useHistory()

    const submit = async(event) =>{
        event.preventDefault()
        setErrors([])
        const data = {image, content , userId, title}
        const newImage = await dispatch(postImage(data))
        .catch(
            async err => {
                const error = await err.json();
                if(error && error.errors) {
                    setErrors(error.errors);
                }
            }
        )
        if(newImage) history.push("/images")
    }

    const selected = event => {
        const image = event.target.files[0]
        setImage(image)
    }


    return (
        <div className='images-page'>
                <h1 className='add-h1'>Add an image</h1>
                <form className='images-page-container' onSubmit ={submit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <input className="file" onChange={selected} type="file" accept="image/*" name="image"></input>
                    <input className="add-title" value={title} onChange={e=> setTitle(e.target.value)} type="text" placeholder='title'></input>
                    <input className="add-content" value={content} onChange={e=> setContent(e.target.value)} type="text" placeholder='content'></input>
                    <button className="add-submit" type="submit">Submit</button>
                    <Link to={`/images`}><button className="add-cancel">Cancel</button></Link>
                </form>
        </div>
    )
}

export default CreateImage;
