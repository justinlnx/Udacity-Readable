import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './material_ui_raw_theme';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as Helper from '../utils';
import * as AllActions from '../actions';
import PostView from './PostView';
import Category from './Category';
import CommentView from './CommentView';
import NoContent from './NoContent';

class App extends Component {
  state = {
    categories: null,
    value: 'all'
  }

  componentDidMount = () => {
    if(this.props.history.location.pathname !== '/notfound') {
      this.props.history.push('/all');
    }
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
    let path = this.props.history.location.pathname.toLowerCase();
    return path === '/all' || path === '/react' || path === '/redux' || path === '/udacity';
  }

  getPostFromUrlId = () => {
    let id = this.getIdFromUrl();
      return this.props.posts.find(x => x.id === id);
  }

  getIdFromUrl = () => {
    let path = this.props.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
  }

  getPostViewComponent = () => {
    return (
      <PostView
        submitForm={(id, title, body) => {
          this.props.history.push(`/${this.state.value}`);
        }}
        mode={'View'}
        tab={this.state.value}
        post={this.getPostFromUrlId()}
      />
    );
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
          <Route exact path='/create' render={() => (
            <PostView
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
              <PostView
                submitForm={(id, title, body) => {
                  this.props.actions.UpdatePost(id, title, body).then(() => {
                    this.props.history.push(`/${this.state.value}`);
                  });
                }}
                mode={'Edit'}
                tab={this.state.value}
                post={this.getPostFromUrlId()}
              />
            )
          }} />
          <Route path='/react/:id' render={() => {
            if(this.props.posts) {
              return this.getPostViewComponent();
            }
            this.props.history.push('/notfound');
            return <NoContent />;
          }} />
          <Route path='/redux/:id' render={() => {
            if(this.props.posts) {
              return this.getPostViewComponent();
            }
            this.props.history.push('/notfound');
            return <NoContent />;
          }} />
          <Route path='/udacity/:id' render={() => {
            if(this.props.posts) {
              return this.getPostViewComponent();
            }
            this.props.history.push('/notfound');
            return <NoContent />;
          }} />
          <Route path='/create/:id/comment' render={() => {
            let regex = /\s*\/\s*/;
            let splitStr = this.props.location.pathname.split(regex);
            let postId = splitStr[2];
            return (
              <CommentView
                submitForm={(author, body) => {
                  this.props.actions.CreateComment(postId, author, body).then(() => {
                    this.props.history.push(`/${this.state.value}`);
                  });
                }}
                mode={'Create'}
                comment={null}
                tab={this.state.value}
              />
            );
          }} />
          <Route path='/comment/:id' render={() => {
            let commentId = this.getIdFromUrl();
            return (
              <CommentView
                submitForm={(body) => {
                  this.props.actions.UpdateComment(commentId, body).then(() => {
                    this.props.history.push(`/${this.state.value}`);
                  });
                }}
                mode={'Edit'}
                comment={this.props.comments.find(x => x.id === commentId)}
                tab={this.state.value}
              />
            );
          }} />
          <Route path='/notfound' render={() => (
            <NoContent />
          )} />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts.posts,
    comments: state.comments.comments
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
