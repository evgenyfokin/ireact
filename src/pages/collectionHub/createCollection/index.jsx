import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {createCollection} from "../../../redux/slices/collectionsSlice";
import {Alert, Button, TextField, Box} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import {postImg} from "../../../api/auth";
import styles from './CreateCollection.module.css'
import DragAndDrop from "../../../components/dragAndDrop";

const CreateCollection = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const token = useSelector(state => state.user.token);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const onDrop = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('image', file);
            const {data} = await postImg(formData, token);
            setImageUrl(data.image_url);
        } catch (err) {
            console.warn(err);
            alert('Error');
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (token) {
            const newCollection = {title, desc};
            if (imageUrl) newCollection.imageUrl = imageUrl;
            dispatch(createCollection({newCollection, token})).then(() => navigate('/'));
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
            <DragAndDrop onImageUpload={setImageUrl} token={token} />
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