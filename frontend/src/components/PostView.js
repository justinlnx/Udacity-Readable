import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import Snackbar from 'material-ui/Snackbar';
import { List } from 'material-ui/List';
import CommentItem from './CommentItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AllActions from '../actions';
import FlatButton from 'material-ui/FlatButton';

class PostView extends Component {
  constructor(props) {
    super(props);
    if(this.props.mode === 'Create') {
      this.state = {
        title: '',
        author: '',
        body: '',
        category: '',
        snackbarOpen: false,
      }
    } else {
      this.state = {
        title: this.props.post.title,
        author: this.props.post.author,
        body: this.props.post.body,
        category: this.props.post.category,
        snackbarOpen: false,
      }
    }
  }

  componentDidMount() {
    if(this.props.mode === 'View') {
      this.props.actions.GetCommentsByPost(this.props.post.id);
    }
  }

  updateTitle = (event) => {
    this.setState({ 
      title: event.target.value
    });
  }

  updateAuthor = (event) => {
    this.setState({ 
      author: event.target.value
    });
  }

  updateBody = (event) => {
    this.setState({ 
      body: event.target.value
    });
  }

  updateSelectedCategory = (event, index, category) => {
    this.setState({ category });
  }

  submitForm = () => {
    if (this.hasError()) {
      this.setState({ snackbarOpen: true });
    } else if (this.isEditing()) {
      this.props.submitForm(this.props.post.id, this.state.title, this.state.body);
    } else {
      this.props.submitForm(this.state.title, this.state.author, this.state.body, this.state.category.toLowerCase());
    }
  }

  isEditing = () => {
    return this.props.mode === 'Edit';
  }

  hasError = () => {
    return !this.state.title || !this.state.author || !this.state.body || !this.state.category;
  }

  handleRequestClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  render() {
    return (
      <div>
        <AppBar
          title={`${this.props.mode} Post`}
          iconElementLeft={<Link className='close-search' to={`/${this.props.tab}`}></Link>}
          iconElementRight={<IconButton><NavigationCheck onClick={this.submitForm} /></IconButton>}
        />
        <Paper zDepth={2}>
          <TextField
            hintText='Title'
            className='form-item'
            underlineShow={false}
            value={this.state.title}
            disabled={this.props.mode === 'View'}
            onChange={this.updateTitle} />
          <Divider />
          <TextField
            hintText='Author'
            className='form-item'
            underlineShow={false}
            value={this.state.author}
            disabled={this.isEditing() || this.props.mode === 'View'}
            onChange={this.updateAuthor} />
          <Divider />
          <TextField
            hintText='Body'
            className='form-item'
            underlineShow={false}
            value={this.state.body}
            disabled={this.props.mode === 'View'}
            onChange={this.updateBody} />
          <Divider />
          <SelectField
            floatingLabelText='Category'
            className='form-item'
            value={this.state.category}
            disabled={this.isEditing() || this.props.mode === 'View'}
            onChange={this.updateSelectedCategory}
          >
            <MenuItem value={'react'} primaryText='React' />
            <MenuItem value={'redux'} primaryText='Redux' />
            <MenuItem value={'udacity'} primaryText='Udacity' />
          </SelectField>
        </Paper>
        {this.props.mode === 'View' && (
          <List>
            <Route render={({history}) => (
              <FlatButton
                label="Comments"
                labelPosition="before"        
                icon={<i className='material-icons'>add</i>}
                onClick={() => { history.push(`/create/${this.props.post.id}/comment`) }}
              />
            )} />
            {this.props.comments.length > 0 && this.props.comments.map((comment) => {
              return <CommentItem key={comment.id} cid={comment.id} />
            })}
            <Divider inset={true}/>
          </List>
        )}
        <Snackbar
          open={this.state.snackbarOpen}
          message="Please fill in the form to submit"
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
