import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postImage } from '../../store/images';

function CreateImage(){
    const [ image,setImage ] = useState()
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
        // .catch(
        //     async err => {
        //         const error = await err.json();
        //         if(error && error.errors) {
        //             setErrors(error.errors);
        //         }
        //     }
        // )
        if(newImage) {
            history.push("/images")
            setErrors([])
        }
    }

    const selected = event => {
        const image = event.target.files[0]
        setImage(image)
    }


    return (
        <div>
            <div>Add an image</div>
            <form onSubmit ={submit}>
                {/* <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul> */}
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
