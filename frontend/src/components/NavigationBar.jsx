import './../assets/styles/global.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Old code to be replaced */

export default function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active" exact>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="active" exact>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/loading" activeClassName="active" exact>
            Loading
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
