import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import LogoTransparent from '../assets/images/LogoMSH_Transparent.png';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import instance from './api/api_instance';


function RestrictedAppBar() {
  const logoStyle = {
    paddingBottom: 10,
    paddingTop: 10,
  };

  // adding in effect for getting the token from local storage
  useEffect(() => {
    if(localStorage.getItem('token') != null){
      instance.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
    }
  },[])

  return (
    <AppBar position="static" sx={{backgroundColor:'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={logoStyle}>
            <img src={LogoTransparent} className="App-logo" alt="logo" width={50} />
          </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/login"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MaSH
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default RestrictedAppBar;