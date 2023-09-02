import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import IndividualPost from '../components/individual-posts/post';

export default function Post() {
  return (
    <div className="container">
      <NavigationBar />
      <h1> POST TEST PAGE </h1>
      <IndividualPost />
    </div>
  );
}