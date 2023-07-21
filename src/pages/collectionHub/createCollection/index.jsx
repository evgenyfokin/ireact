import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {createCollection} from "../../../redux/slices/collectionsSlice";
import {Button, TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import styles from './CreateCollection.module.css'

const CreateCollection = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const token = useSelector(state => state.user.token)
    const navigate = useNavigate()
    const handleSubmit = event => {
        event.preventDefault()
        dispatch(createCollection({newCollection: {title, desc}, token}))
            .then(()=> navigate('/'))
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
                fullWidth
                variant="contained"
                color="primary"
            >
                Create Collection
            </Button>
        </form>
    )
}

export default CreateCollection;