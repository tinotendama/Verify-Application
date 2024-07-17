import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import UploadIcon from '@mui/icons-material/UploadFile';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const menuItems = [
    { text: 'Home', link: '/', icon: <HomeIcon /> },
    { text: 'Company List', link: '/companies', icon: <BusinessIcon /> },
    { text: 'Add Company', link: '/add-company', icon: <InboxIcon /> },
    { text: 'Employee List', link: '/employees', icon: <PeopleIcon /> },
    { text: 'Add Employee', link: '/add-employee', icon: <PersonAddIcon /> },
    { text: 'Add Department', link: '/add-department', icon: <InboxIcon /> },
    { text: 'File Upload', link: '/upload', icon: <UploadIcon /> },
  ];
    


const ResponsiveDrawer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawer = (
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text}>
                        <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary={item.text} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            {isMobile ? (
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
            ) : (
                menuItems.map((item) => (
                    <Link to={item.link} key={item.text} style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px' }}>
                        {item.text}
                    </Link>
                ))
            )}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
        </>
    );
};

export default ResponsiveDrawer;
