import React, {useState} from "react";
import {Modal as MuiModal, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import DragAndDrop from "../dragAndDrop";
import {useSelector} from "react-redux";

const CollectionUpdateModal = ({onSave, collection}) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(collection.title);
    const [desc, setDesc] = useState(collection.desc);
    const token = useSelector(state => state.user.token)
    const url = useSelector(state => state.collections.collection.imageUrl)
    const [imageUrl, setImageUrl] = useState(url);
    console.log(imageUrl)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        onSave({title, desc});
        handleClose();
    };

    const handleRemove = () => {

    }


    return (
        <div>
            <Button variant="text" color="primary" onClick={handleOpen}>
                Edit
            </Button>
            <MuiModal open={open} onClose={handleClose}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Collection</DialogTitle>
                    <DialogContent>
                        <TextField style={{marginTop: "15px"}} value={title} onChange={(e) => setTitle(e.target.value)}
                                   label="Title" fullWidth/>
                        <TextField multiline rows={4} value={desc} style={{marginTop: "15px"}}
                                   onChange={(e) => setDesc(e.target.value)} label="Description" fullWidth/>
                        {imageUrl ? <Button onClick={handleRemove}>Remove image</Button> :
                            <DragAndDrop onImageUpload={setImageUrl} token={token}/>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiModal>
        </div>
    );
};

export default CollectionUpdateModal;