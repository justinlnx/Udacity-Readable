import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './material_ui_raw_theme';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as Helper from '../utils';
import * as AllActions from '../actions';
import PostComponent from './PostComponent';
import Category from './Category';

class App extends Component {
  state = {
    categories: null,
    value: 'all'
  }

  componentDidMount = () => {
    this.props.history.push('/all');
    Helper.getCategories().then(categories => {
      this.setState({ categories });
    });
    this.props.actions.getAllPosts();
  }

  changeTab = (value) => {
    this.setState({
      value: value
    });
    this.props.history.push(value);
    if (value === 'all') {
      this.props.actions.getAllPosts();
    } else {
      this.props.actions.getPostsByCategory(value);
    }
  }

  filterPostsByCategory = (posts, category) => {
    return posts ? null : posts.filter(p => p.category === category);
  }

  notCreateOrEditUrl = () => {
    return this.props.history.location.pathname !== '/create' && !this.props.history.location.pathname.includes('/edit');
  }

  getPostIdFromUrl = () => {
    let id = this.props.location.pathname.slice(6);
    return this.props.posts.find(x => x.id === id);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="App">
          {this.notCreateOrEditUrl() && (
            <Tabs value={this.state.value} onChange={this.changeTab} >
              <Tab label="All" value='all'>
                <Category 
                  posts={this.props.posts}
                  />
              </Tab>
              {this.state.categories && this.state.categories.map(category => (
                <Tab label={category.name} value={category.name} key={category.name}>
                  <Category 
                    posts={this.props.posts}
                  />
                </Tab>  
              ))}
            </Tabs>
          )}
          <div className='add-button'>
            <Link to='/create' className='add-button'></Link>
          </div>
          <Route path='/create' render={() => (
            <PostComponent
              submitForm={(title, author, body, cat) => {
                this.props.actions.CreatePost(title, author, body, cat).then(() => {
                  this.props.history.push(`/${this.state.value}`);
                });
              }}
              mode={'Create'}
              tab={this.state.value}
              post={null}
            />
          )}/>
          <Route path='/edit/:id' render={() => {
            return (
              <PostComponent
                submitForm={(id, title, body) => {
                  this.props.actions.UpdatePost(id, title, body).then(() => {
                    this.props.history.push(`/${this.state.value}`);
                  });
                }}
                mode={'Edit'}
                tab={this.state.value}
                post={this.getPostIdFromUrl()}
              />
            )
          }} />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        AllActions,
      ),
    dispatch
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
