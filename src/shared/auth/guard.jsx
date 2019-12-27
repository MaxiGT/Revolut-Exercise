import React from 'react';
import { Route } from 'react-router-dom';

const Guard = (props) => {
  const { component: Component, path, isAuthenticated } = props;

  return (
    <Route exact path={path} render={() => {
      if (!isAuthenticated) {
        //Apply some auth logic
        return <div></div>
      }
      return <Component />
    }} />
  );
}

export default Guard;