import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import LoginForm from '../components/login/loginForm';
import RestrictedNavigationBar from '../components/restrictedNavigationBar'

export default function Login() {
  return (
    <div className="container">
      <RestrictedNavigationBar/>
      <div className="App">
        <div className='App-header'>
          <div className='White-circle'>
            <h2 style={{ color: '#000000', width: "350px" }}>Login to Mass Spectrometry Hub</h2>
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  );
}