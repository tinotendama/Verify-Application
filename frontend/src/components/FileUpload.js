import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Button, Container, Typography, Box, TextField } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const FileUpload = () => {
    const { control, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);

        try {
            const response = await axios.post('http://127.0.0.1:8000/uploads/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('File uploaded successfully');
            console.log(response.data);
            reset(); // Reset the form after successful upload
        } catch (error) {
            setMessage('File upload failed');
            console.error(error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Upload File
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={2}>
                    <Controller
                        name="file"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <TextField
                                type="file"
                                onChange={(e) => field.onChange(e.target.files)}
                                inputProps={{ accept: '.csv, .xlsx, .txt' }}
                                fullWidth
                            />
                        )}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUpload />}
                >
                    Upload
                </Button>
            </form>
            {message && <Typography variant="body1" style={{ marginTop: '20px' }}>{message}</Typography>}
        </Container>
    );
};

export default FileUpload;
