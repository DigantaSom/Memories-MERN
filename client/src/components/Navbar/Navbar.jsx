import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from 'jwt-decode';

import { logout } from '../../actions/auth';

import useStyles from './styles';

import memoriesLogo from '../../images/memories-logo.png';
import memoriesText from '../../images/memories-text.png';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/');
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, handleLogout, user?.token]);

  return (
    <AppBar position='static' color='inherit' className={classes.appBar}>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height='45px' />
        <img
          src={memoriesLogo}
          alt='memories'
          height='40px'
          className={classes.image}
        />
      </Link>
      <Toolbar className={classes.toolBar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.username} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
