import React from 'react';
import { Route } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const NoContent = () => {
  return (
    <div>
      <h3>404: Not Found</h3>
      <Route render={({history}) => (
        <FlatButton
          label='Go back home'
          icon={<i className='material-icons'>explore</i>}
          onClick={() => { history.push(`/all`) }}
        />
      )} />
    </div>
  )
}

export default NoContent;