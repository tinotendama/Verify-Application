import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AxiosInstance from '../utils/Axios';

const EmployeeForm = () => {
    const { handleSubmit, control, reset } = useForm();
    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // Fetch companies and departments from the backend to populate the select menus
        AxiosInstance.get('/companies/')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('Error fetching companies', error);
            });

        AxiosInstance.get('/departments/')
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments', error);
            });
    }, []);

    const onSubmit = (data) => {
        AxiosInstance.post('/employees/', data)
            .then(response => {
                console.log(response.data);
                reset();
            })
            .catch(error => {
                console.error('There was an error creating the employee!', error);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add Employee
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
                <Controller
                    name="employee_id"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Employee ID"
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
                <FormControl fullWidth margin="normal">
                    <InputLabel id="department-label">Department</InputLabel>
                    <Controller
                        name="department"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="department-label"
                                label="Department"
                            >
                                {departments.map((department) => (
                                    <MenuItem key={department.id} value={department.id}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
                <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Role"
                            fullWidth
                            margin="normal"
                            required
                        />
                    )}
                />
                <Controller
                    name="date_started"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Date Started"
                            type="date"
                            fullWidth
                            margin="normal"
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    )}
                />
                <Controller
                    name="date_left"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Date Left"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                    )}
                />
                <Controller
                    name="duties"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Duties"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            required
                        />
                    )}
                />
                <Controller
                    name="contact_details_encrypted"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Contact Details Encrypted"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            required
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default EmployeeForm;
