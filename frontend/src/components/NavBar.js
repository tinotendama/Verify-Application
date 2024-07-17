import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1201, // Ensure it's above the sidebar
  },
}));

const NavBar = ({ onMenuClick }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.sticky}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Talent Verify
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
