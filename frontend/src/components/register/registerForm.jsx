import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import instance from '../api/api_instance';
import Grid from '@mui/material/Grid';
import { Container, FormControlLabel, Stack } from '@mui/material';
import {Checkbox} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/Alert';
import { Navigate, useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const userRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [userName,setUserName] = useState("")

    const [emailError,setEmailError] = useState(false)
    const [userNameError,setUserNameError] = useState(false) 
    const [passwordMatchError, setPasswordMatchError] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    //effect for validating the password meeting the regex specs and compares with the re-entered password, when one changes other does so both feilds are in sync
    useEffect(() => {
        const match = password === rePassword;
        setPasswordMatchError(!match);
    },[password, rePassword])

    //effect for removing the error message once the user starts editing the textfeilds again
    useEffect(() => {
        setErrorMessage('');
    },[userName, password, rePassword,email])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            username: userName,
            email: email,
            password: password,
        }
        try{
        await instance({
            url: "/register/",
            method: "POST",
            data: data
        }).then((res) => {
            //redirect to login page
            setEmail("");
            setPassword("");
            setUserName("");
            navigate("/login");
        });
        } catch(e){
            //displays error message if registration does not work
            console.log(e.response.data);
            setErrorMessage("There was an error creating your account")

                
        }
    } 


    return(
        <Container>
        <React.Fragment>
        
        {errorMessage ? <Alert severity="error"> {errorMessage} — <strong>please try again!</strong> </Alert> : null}
        <br></br>
        <form onSubmit ={handleSubmit}>
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
                ref = {userRef}
                label="UserName"
                name="userName"
                autoComplete="off"
                autoFocus
                onChange={e => setUserName(e.target.value)}
                aria-invalid = {userNameError ? "false" : "true"}
                aria-describedby='usernameNote'
                />
                {passwordMatchError ? <Alert severity="error" > Passwords do not match</Alert> : null}
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
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
                required
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