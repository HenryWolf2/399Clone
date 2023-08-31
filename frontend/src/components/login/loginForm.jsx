import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import instance from '../api/api_instance';


const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            username: username,
            password: password
        }
        try{
        await instance({
            url: "/login/",
            method: "POST",
            data: data
          }).then((res) => {
            //redirect to profile page
            //save token in axios, add authorization to header
            console.log(res);
          });
        } catch(e){
            //display error message (username or password incorrect)
            //clear the password field
            console.error(e)
        }
    }

    return(
        <React.Fragment>
        <form onSubmit ={handleSubmit} action={<Link to="/login" />}>  
        <Stack spacing={2}>          
                <TextField
                margin="normal"
                required
                size="large"
                value={username}
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={e => setUsername(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                name="password"
                label="Password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={e => setPassword(e.target.value)}
                />
                <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
        </Stack>
        </form>
        </React.Fragment>
    )
}

export default LoginForm;