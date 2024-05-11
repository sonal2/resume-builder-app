import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const ProfilePhotoComponent = ({onFileUpload }) => {
    const [file, setFile] = useState(null);


    const [existingPhotoUrl, setExistingPhotoUrl] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
        onFileUpload(acceptedFiles[0]);
    }, [onFileUpload]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        const getProfilePhoto = async() => {
            const status = (await fetch('api/profilePhoto')).status

            if(status == 200) {
                setExistingPhotoUrl('api/profilePhoto')
            }
        }

        getProfilePhoto()
    }, [])


    return (
        <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            {file ? (
                <div style={imageContainerStyles}>
                    <img src={URL.createObjectURL(file)} alt="Uploaded" style={imageStyles} />
                </div>
            ) : existingPhotoUrl != null ? (
                <div style={imageContainerStyles}>
                    <img src={existingPhotoUrl} alt="Existing" style={imageStyles} />
                </div>
            ) : (
                <p>Drag 'n' drop a photo here, or click to select one</p>
            )}
        </div>
    );
    
};

const dropzoneStyles = {
    position: 'relative',
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};


const imageContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
};

const imageStyles = {
    maxWidth: '10%',
    maxHeight: '10%',
};

export default ProfilePhotoComponent;
