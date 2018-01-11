import React, { Component } from 'react';

const ErrorMessage = (props) => {
  return (
    <div>
      <h2>404 Page not Found...</h2>
      <p>{`${props.message}`}</p>
      <img src="https://kottke.org/plus/misc/images/failwhale.jpg
      " style={{width: 75 + '%'}} />
    </div>
  )
}

export default ErrorMessage;



