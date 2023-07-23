import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

function MyDropzone({ onDrop, multiple, accept }) {
    const onDropAccepted = useCallback(acceptedFiles => {
        onDrop(acceptedFiles);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: onDropAccepted, multiple, accept});

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default MyDropzone;
