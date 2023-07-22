import React, { useState } from "react";
import { Modal as MuiModal, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const Modal = ({ onSave, collection }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(collection.title);
    const [desc, setDesc] = useState(collection.desc);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        onSave({ title, desc });
        handleClose();
    };

    return (
        <div>
            <Button variant="text" color="primary" onClick={handleOpen}>
                Edit
            </Button>
            <MuiModal open={open} onClose={handleClose}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Collection</DialogTitle>
                    <DialogContent>
                        <TextField style={{marginTop: "15px"}} value={title} onChange={(e) => setTitle(e.target.value)}  label="Title" fullWidth />
                        <TextField multiline rows={4} value={desc} style={{marginTop: "15px"}} onChange={(e) => setDesc(e.target.value)} label="Description" fullWidth />
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

export default Modal;