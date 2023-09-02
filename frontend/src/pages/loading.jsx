import React from 'react';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../components/loading-screen/loadingAnimation';
import NavigationBar from '../components/NavigationBar';

export default function Loading() {
  return (
    <div className='container'>
      <NavigationBar />
      <div className="App">
        <div className='App-header'>
          <div className='White-circle'>
            <LoadingAnimation />
          </div>
        </div>
      </div>
    </div>
  );
}