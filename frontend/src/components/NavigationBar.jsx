import * as React from 'react';
import AppBar from '@mui/material/AppBar';
/*import Image from 'next/image'; */
import Box from '@mui/material/Box';
import LogoTransparent from '../assets/images/LogoMSH_Transparent.png';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from './api/api_instance';
import { Navigate, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutTokens = async (event) =>{
    localStorage.removeItem("token");
    try{
      await instance({
          url: "/logout/",
          method: "POST",
        }).then((res) => {
          
        });
      } catch(e){
          console.error(e)
      }
    setAnchorElUser(null);
  }

  const logoStyle = {
    paddingBottom: 10,
    paddingTop: 10,
  };

  // adding in effect for getting the token from local storage
  useEffect(() => {
    if(localStorage.getItem('token') != null){
      instance.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
    }else{
      navigate("/login")
    }
  },[])

  return (
    <AppBar position="static" sx={{backgroundColor:'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

                {/* Logo Section */}

          <div style={logoStyle}>
            <img src={LogoTransparent} className="App-logo" alt="logo" width={50} />
          </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            MSH
          </Typography>

                          {/* Section for the link menu on minimised page */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Groups</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Public</Typography>
                </MenuItem>
            </Menu>
          </Box>

            {/* The Navigation Bar Link Section */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                  backgroundColor: 'grey',
                },}}
              > Home
              </Button>
            </NavLink>

            <NavLink to="/groups" style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                  backgroundColor: 'grey',
                },}}
              > Groups
              </Button>
              </NavLink>

              <NavLink to="/public-data" style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                  backgroundColor: 'grey',
                },}}
              > Public
              </Button>
              </NavLink>

                {/* Temporary Links for Testing */}

              {/* <NavLink to="/loading" style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                  backgroundColor: 'grey',
                },}}
              > Loading
              </Button>
              </NavLink>

              <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                  backgroundColor: 'grey',
                },}}
              > Login
              </Button>
              </NavLink>

              <NavLink to="/register" style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                  backgroundColor: 'grey',
                },}}
              > Register
              </Button>
              </NavLink> */}

          </Box>

                                {/* Create Button */}
            <Button sx={{margin:2}} id='create-button' className="custom-button" variant='contained' style={{ backgroundColor: '#02AEEC' }} endIcon={<AddIcon/>} 
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} >Create</Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'create-button',
              }}
            >
              <NavLink to="/create-post" style={{ textDecoration: 'none'}}>
                <MenuItem onClick={handleClose}><Typography textAlign={'center'}>Analysis</Typography></MenuItem>
              </NavLink>
              <NavLink to="/create-group" style={{ textDecoration: 'none'}}>
                <MenuItem onClick={handleClose}><Typography textAlign={'center'}>Group</Typography></MenuItem>
              </NavLink>
            </Menu>
                      {/* The Profile Icon Menu */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <NavLink to="/profile" style={{ textDecoration: 'none'}}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </NavLink>

                <NavLink to="/login" style={{ textDecoration: 'none'}}>
                <MenuItem onClick={handleLogoutTokens}>
                  <Typography textAlign="center">Signout</Typography>
                </MenuItem>
              </NavLink>

            </Menu>
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;