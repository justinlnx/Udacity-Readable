import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import Snackbar from 'material-ui/Snackbar';

class CommentView extends Component {
  constructor(props) {
    super(props);
    if(this.props.mode === 'Create') {
      this.state = {
        author: '',
        body: '',
        snackbarOpen: false,
      }
    } else if (this.props.mode === 'Edit') {
      this.state = {
        title: this.props.post.title,
        author: this.props.post.author,
        body: this.props.post.body,
        snackbarOpen: false,
      }
    }
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

  submitForm = () => {
    if (this.hasError()) {
      this.setState({ snackbarOpen: true });
    } else if (this.isEditing()) {
      // this.props.submitForm(this.props.post.id, this.state.title, this.state.body);
    } else {
      // this.props.submitForm(this.state.title, this.state.author, this.state.body, this.state.category.toLowerCase());
    }
  }

  isEditing = () => {
    return this.props.mode === 'Edit';
  }

  hasError = () => {
    return !this.state.author || !this.state.body;
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
          title={`${this.props.mode} Comment`}
          iconElementLeft={<Link className='close-search' to={`/${this.props.tab}`}></Link>}
          iconElementRight={<IconButton><NavigationCheck onClick={this.submitForm} /></IconButton>}
        />
        <Paper zDepth={2}>
          <TextField
            hintText='Author'
            className='form-item'
            underlineShow={false}
            value={this.state.author}
            disabled={this.isEditing()}
            onChange={this.updateAuthor} />
          <Divider />
          <TextField
            hintText='Body'
            className='form-item'
            underlineShow={false}
            value={this.state.body}
            onChange={this.updateBody} />
        </Paper>
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

export default CommentView;
