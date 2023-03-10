import React from 'react'
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1 style={{margin: '20px'}}>Page not found!</h1>
      <Link to={'../'} className='button button--link'>Go to main page</Link>
    </>
  );
};

export default NotFoundPage;
