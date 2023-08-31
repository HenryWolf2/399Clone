import logo from '../../assets/images/msh-loading.gif';
import '../../assets/styles/global.css';
import React, { Component } from "react";

export default class LoadingAnimation extends Component {
  render() {
    return (
      <img src={logo} className="App-logo" alt="logo" />
    )
  };
}
