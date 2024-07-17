import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const EmployeeSearchForm = () => {
    const { handleSubmit, control } = useForm();
    const [results, setResults] = useState([]);

    const onSubmit = async (data) => {
        try {
            const query = new URLSearchParams(data).toString();
            const response = await axios.get(`http://127.0.0.1:8000/employees/?${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching employees:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Employees
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="employeelist"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="EmployeeList"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </form>
                {results.length > 0 && (
                    <Paper sx={{ mt: 5 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>date_started</TableCell>
                                    <TableCell>date_left</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.company}</TableCell>
                                        <TableCell>{employee.role}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.date_started}</TableCell>
                                        <TableCell>{employee.date_left}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                )}
            </Box>
        </Container>
    );
};

export default EmployeeSearchForm;
