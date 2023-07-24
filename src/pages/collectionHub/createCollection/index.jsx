import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {createCollection, uploadImage} from "../../../redux/slices/collectionsSlice";
import {Alert, Button, TextField, Box} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import styles from './CreateCollection.module.css'

const CreateCollection = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const token = useSelector(state => state.user.token);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const imgUrl = useSelector(state => state.collections.imgUrl)



    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        const imgData = new FormData()
        imgData.append('image', file)
        await dispatch(uploadImage({imgData, token}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (token) {
            const newCollection = {
                title,
                desc,
                imageUrl: imgUrl
            }
            dispatch(createCollection({newCollection, token})).then(()=> navigate('/'))
        } else {
            setShowAlert(true);
        }
    }

    return (
        <form className={styles.container}
              onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Collection Title"
                name="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <input type="file" onChange={handleFileChange}/>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
            >
                Create Collection
            </Button>
            <div className={styles.alertContainer}>
                {showAlert && (
                    <Alert severity="info">Register or login to create a collection</Alert>
                )}
            </div>
        </form>
    )
}

export default CreateCollection;