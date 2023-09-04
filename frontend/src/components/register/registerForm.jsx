import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import instance from '../api/api_instance';
import Grid from '@mui/material/Grid';
import { Container, FormControlLabel, Stack } from '@mui/material';
import {Checkbox} from '@mui/material';



const RegisterForm = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [userName,setUserName] = useState("")

    const [emailError,setEmailError] = useState(false)
    const [userNameError,setUserNameError] = useState(false) 
    const [passwordError, setPasswordError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailError(false);
        setEmailError(false);
        setEmailError(false);

        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }
        if (userName == '') {
            setUserNameError(true)
        }
        else{
            // add in the checking conditions of email and username etc here

            let data = {
                "username": userName,
                "email": email,
                "password": password,
            }
            console.log(data);
            try{
            await instance({
                url: "/register/",
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
                console.log(e.response.data);

                
            }
        }
    }
    // add in the set errors that will be triggered if user input is not correct
    // these could include not having enough case letters - or the user already existing 


    return(
        <Container>
        <React.Fragment>
        <form onSubmit ={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row">
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={firstName}
                    label="First Name"
                    name="firstName"
                    autoComplete="firstname"
                    autoFocus
                    onChange={e => setFirstName(e.target.value)}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={lastName}
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastname"
                    autoFocus
                    onChange={e => setLastName(e.target.value)}
                    />
                </Stack>
                <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error = {emailError}
                onChange={e => setEmail(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                value={userName}
                label="UserName"
                name="userName"
                autoComplete="username"
                autoFocus
                error = {userNameError}
                onChange={e => setUserName(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                error={passwordError}
                autoComplete="new-password"
                onChange={e => setPassword(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Re-Enter Password"
                type="password"
                value= {rePassword}
                onChange={e => setRePassword(e.target.value)}
                />
                <FormControlLabel
                sx={{ color: 'black' }}
                control={<Checkbox value="accept" color="primary" />}
                label="I accept the Terms and Conditions"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="/login" variant="body2" color='#000000'>
                        {"Have an account? Sign In here"}
                        </Link>
                    </Grid>
                </Grid>
        </form>
        </React.Fragment>
        </Container>
    )
}
export default RegisterForm;