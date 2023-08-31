import React from 'react';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Loading from '../pages/loading';
import NotFound from '../pages/notFound';

export default function Root() {
  /* Unsure if this section here is needed but going to keep it for now */
  const routes = [
    { path: '/', name: 'Home', Component: Home, exact: true },
    { path: '/login', name: 'Login', Component: Login, exact: false },
    { path: '/loading', name: 'Loading', Component: Loading, exact: false },
    { path: '/register', name: 'Register', Component: Register, exact: false },
    { path: '*', name: 'No Match', Component: NotFound, exact: false },
  ];

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}
