import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import instance from '../api/api_instance';
import Grid from '@mui/material/Grid';
import { Container, FormControlLabel, Stack } from '@mui/material';
import {Checkbox} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const userRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [userName,setUserName] = useState("")

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
            first_name: firstName,
            last_name: lastName
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
            
            if(e.response.status === 400){
                if(e.response.data.email){
                    setErrorMessage(e.response.data.email)
                }else if (e.response.data.username){
                    setErrorMessage(e.response.data.username)
                }
            }else{
                setErrorMessage("Internal Server Error")
            }
            
            

                
        }
    } 


    return(
        <Container maxWidth= "sm">
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
                onChange={e => setEmail(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                ref = {userRef}
                label="Username"
                name="userName"
                autoComplete="off"
                onChange={e => setUserName(e.target.value)}
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
                <br/>
                <Button
                type="submit"
                size = "large"
                variant="contained"
                sx={{ backgroundColor: '#02AEEC' }}
                >
                Create Account
                </Button>
                <Grid 
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                >
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