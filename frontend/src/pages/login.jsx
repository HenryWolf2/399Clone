import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

// You'll need this <3
// import TextField from '@mui/material/TextField';

export default function Login() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="App">
        <div className='App-header'>
          <div className='White-circle'>
            <h2 style={{ color: '#000000' }}>Login to Mass Spectrometry Hub</h2>
            {/* Add MUI stuff here, for example */}
            {/* <TextField id="outlined-basic" label="Email" variant="outlined" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}