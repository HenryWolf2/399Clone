import React from 'react';
import NavigationBar from '../components/NavigationBar';
import MobileOverlay from '../components/MobileOverlay';

export default function NotFound() {
  return (
    <div className="container">
      <MobileOverlay />
      <NavigationBar />
      404 Page Not Found!
    </div>
  );
}
