import React, {useState} from "react";
import {useDropzone} from "react-dropzone";
import {postImg} from "../../api/auth";
import {Box, Typography, Paper} from "@mui/material";
import styles from './imageDropzone.module.css'

const DragAndDrop = ({onImageUpload, token}) => {
    const [previewSrc, setPreviewSrc] = useState(null);

    const onDrop = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            setPreviewSrc(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append("image", file);
            const {data} = await postImg(formData, token);
            onImageUpload(data.image_url);
        } catch (err) {
            console.warn(err);
            alert("Error");
        }
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });

    return (
        <Paper {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            {previewSrc ? <div className={styles.miniImgContainer}>
                <img className={styles.miniIMG} src={previewSrc} alt="Preview"/>
                <p>👌</p>
            </div> : (
                <Typography variant="body1">
                    {isDragActive ? "Drop the files here ..." : "Drag 'n' drop some files here, or click to select files"}
                </Typography>
            )}
        </Paper>
    );
};

export default DragAndDrop;