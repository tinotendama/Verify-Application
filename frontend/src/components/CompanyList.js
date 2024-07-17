import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import AxiosInstance from '../utils/Axios';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch companies from the backend
        AxiosInstance.get('/companies/')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('Error fetching companies', error);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Company List
            </Typography>
            <List>
                {companies.map((company, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={company.name} secondary={`Registration Number: ${company.registrationNumber}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default CompanyList;
