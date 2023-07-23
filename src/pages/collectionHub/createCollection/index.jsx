import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {createCollection, refreshData} from "../../../redux/slices/collectionsSlice";
import {Alert, Button, TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import styles from './CreateCollection.module.css'
import MyDropzone from "../../../components/myDropzone";

const CreateCollection = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const token = useSelector(state => state.user.token)
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)
    const handleSubmit = event => {
        if (token) {
            event.preventDefault()
        dispatch(createCollection({newCollection: {title, desc}, token})).then(()=> navigate('/'))
        } else {
            event.preventDefault()
            setShowAlert(true)
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
            <MyDropzone/>
        </form>
    )
}

export default CreateCollection;