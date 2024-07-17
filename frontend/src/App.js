import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import NavBar from './components/NavBar';
import SideDrawer from './components/SideDrawer';
import Home from './components/Home';
import UserForm from './components/UserForm';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeSearchForm from './components/EmployeeSearchForm';
import DepartmentForm from './components/DepartmentForm';
import FileUpload from './components/FileUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 240, // Width of the sidebar
  },
}));

function App() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={classes.root}>
      <NavBar onMenuClick={handleDrawerToggle} />
      <SideDrawer open={drawerOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/add-company" element={<CompanyForm />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<EmployeeForm />} />
          <Route path="/search-employee" element={<EmployeeSearchForm />} />
          <Route path="/add-department" element={<DepartmentForm />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
