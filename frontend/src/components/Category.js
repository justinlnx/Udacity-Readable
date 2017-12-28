import React, { Component } from 'react';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import PostItem from './PostItem';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import sortBy from 'sort-by';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: 'Most Favorite'
    }
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    switch (value) {
      case 'Most Favorite':
        return this.props.posts.sort(sortBy('-voteScore'));
      case 'Least Favorite': 
        return this.props.posts.sort(sortBy('voteScore'));
      case 'Most Recent':
        return this.props.posts.sort(sortBy('timestamp'));
      case 'Least Recent':
        return this.props.posts.sort(sortBy('-timestamp'));
      default:
        return this.props.posts;
    }
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarTitle text='Sort Options' />
          <DropDownMenu value={this.state.sortOption} onChange={this.handleChange} >
            <MenuItem value={'Most Favorite'} primaryText='Most Favorite' />
            <MenuItem value={'Least Favorite'} primaryText='Least Favorite' />
            <MenuItem value={'Most Recent'} primaryText='Most Recent' />
            <MenuItem value={'Least Recent'} primaryText='Least Recent' />
          </DropDownMenu>
        </Toolbar>
        <List>
          {this.props.posts && this.props.posts.map((post) => (
            <ListItem key={post.id}>
              <PostItem
                {...post}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default Category;
