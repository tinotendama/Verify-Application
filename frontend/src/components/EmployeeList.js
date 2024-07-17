import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import AxiosInstance from '../utils/Axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employees from the backend
        AxiosInstance.get('/employees/')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees', error);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Employee List
            </Typography>
            <List>
                {employees.map((employee, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={employee.name}
                            secondary={`Department: ${employee.department}, Role: ${employee.role}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default EmployeeList;
