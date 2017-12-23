import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import { Route, Link } from 'react-router-dom';

class Category extends Component {
  state = {
    posts: [],
  }

  render() {
    const { title, author, timestamp, body, path } = this.props;

    return (
      // <Route path={path} render={() => (
        <div>
          <Toolbar>
            <ToolbarTitle text='Options' />
            <IconButton>
              <i className='material-icons'>sort</i>
            </IconButton>
          </Toolbar>
          <Card>
            <CardTitle title={title} subtitle={`${author} - ${timestamp}`} />
            <CardText>
              <div className='post-body'>
                  {body}
              </div>
            </CardText>
            <CardActions>
              <IconButton>
                <i className='material-icons'>favorite</i>
              </IconButton>
              <IconButton>
                <i className='material-icons'>delete</i>
              </IconButton>
              <IconButton>
                <i className='material-icons'>edit</i>
              </IconButton>
            </CardActions>
          </Card>
        </div>
      // )}/>
    );
  }
}

export default Category;
