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
      sortOption: 'Most Favorite',
      sorted: []
    }
  }

  handleChange = (event, index, sortOption) => {
    this.setState({ sortOption });
    this.sortPosts(sortOption);
  }

  componentDidUpdate() {
    if (this.props.posts && this.state.sorted !== this.props.posts) {
      this.sortPosts(this.state.sortOption);
    }
  }

  componentDidMount() {
    if (this.props.posts && this.state.sorted !== this.props.posts) {
      this.sortPosts(this.state.sortOption);
    }
  }

  sortPosts = (option) => {
    switch (option) {
      case 'Most Favorite':
        this.props.posts.sort(sortBy('-voteScore'));
        this.setState({ sorted: this.props.posts });
        return;
      case 'Least Favorite':
        this.props.posts.sort(sortBy('voteScore'));
        this.setState({ sorted: this.props.posts });
        return;
      case 'Most Recent':
        this.props.posts.sort(sortBy('timestamp'));
        this.setState({ sorted: this.props.posts });
        return;
      case 'Least Recent':
        this.props.posts.sort(sortBy('-timestamp'));
        this.setState({ sorted: this.props.posts });
        return;
      default:
        this.setState({ sorted: this.props.posts });
        return;
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
          {this.state.sorted && this.state.sorted.map((post) => (
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
