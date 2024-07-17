import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AxiosInstance from '../utils/Axios';

const DepartmentForm = () => {
    const { handleSubmit, control, reset } = useForm();
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch companies from the backend to populate the select menu
        AxiosInstance.get('/companies/')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('Error fetching companies', error);
            });
    }, []);

    const onSubmit = (data) => {
        AxiosInstance.post('/departments/', data)
            .then(response => {
                console.log(response.data);
                reset();
            })
            .catch(error => {
                console.error('There was an error creating the department!', error);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add Department
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Name"
                            fullWidth
                            margin="normal"
                            required
                        />
                    )}
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="company-label">Company</InputLabel>
                    <Controller
                        name="company"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="company-label"
                                label="Company"
                            >
                                {companies.map((company) => (
                                    <MenuItem key={company.id} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default DepartmentForm;
