import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';

const UserForm = () => {
    const { handleSubmit, control, reset, watch, formState: { errors } } = useForm();
    const password = watch('password', '');

    const onSubmit = async (data) => {
        if (data.password !== data.passwordConfirm) {
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/', data);
            console.log('User created:', response.data);
            reset();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create User
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username ? 'Username is required' : ''}
                            />
                        )}
                        rules={{ required: true }}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email ? 'Valid email is required' : ''}
                            />
                        )}
                        rules={{
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                        }}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password ? 'Password is required' : ''}
                            />
                        )}
                        rules={{ required: true }}
                    />
                    <Controller
                        name="passwordConfirm"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.passwordConfirm}
                                helperText={errors.passwordConfirm ? 'Passwords must match' : ''}
                            />
                        )}
                        rules={{
                            validate: value =>
                                value === password || 'Passwords do not match'
                        }}
                    />
                    {errors.passwordConfirm && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.passwordConfirm.message}
                        </Alert>
                    )}
                    <Button type="submit" variant="contained" color="primary">
                        Create User
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default UserForm;
