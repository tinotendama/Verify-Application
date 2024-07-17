import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Business, Person, Group, UploadFile, Apartment } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: '64px', // Adjust this value based on the height of your top bar
    zIndex: 0,   // Ensure it's behind the top bar
  },
  toolbar: theme.mixins.toolbar,
}));

const SideDrawer = ({ open }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/companies">
          <ListItemIcon><Business /></ListItemIcon>
          <ListItemText primary="Company List" />
        </ListItem>
        <ListItem button component={Link} to="/add-company">
          <ListItemIcon><Business /></ListItemIcon>
          <ListItemText primary="Add Company" />
        </ListItem>
        <ListItem button component={Link} to="/employees">
          <ListItemIcon><Group /></ListItemIcon>
          <ListItemText primary="Employee List" />
        </ListItem>
        <ListItem button component={Link} to="/add-employee">
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Add Employee" />
        </ListItem>
        <ListItem button component={Link} to="/search-employee">
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Search Employee" />
        </ListItem>
        <ListItem button component={Link} to="/add-department">
          <ListItemIcon><Apartment /></ListItemIcon>
          <ListItemText primary="Add Department" />
        </ListItem>
        <ListItem button component={Link} to="/upload">
          <ListItemIcon><UploadFile /></ListItemIcon>
          <ListItemText primary="File Upload" />
        </ListItem>
        <ListItem button component={Link} to="/add-user">
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
