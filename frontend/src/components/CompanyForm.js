import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AxiosInstance from '../utils/Axios';
import {Container,TextField,Button,Typography, Box,} from '@mui/material';


const CompanyForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await AxiosInstance.post('/companies/', data);
      setMessage('Company created successfully');
      console.log(response.data);
      reset(); // Reset the form after successful submission
    } catch (error) {
      setMessage('Failed to create company');
      console.error(error);
    }
  };

  return (
  
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Company
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
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
            name="registration_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Registration Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="registration_number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Registration Number"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
            )}
          />
          <Controller
            name="contact_person"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Person"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="number_of_employees"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Number of Employees"
                type="number"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="contact_phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Phone"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="email_address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {message && (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default CompanyForm;
