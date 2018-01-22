import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import Snackbar from 'material-ui/Snackbar';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      body: '',
      category: '',
      snackbarOpen: false,
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
    } else {
      this.props.submitForm(this.state.title, this.state.author, this.state.body, this.state.category.toLowerCase());
    }
  }

  hasError = () => {
    return !this.state.title || !this.state.author || !this.state.body || !this.state.category;
  }

  redirectTo = () => {
    if(this.hasError()) {
      return '/create';
    } else {
      return '/all';
    }
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
          title='Create Post'
          iconElementLeft={<Link className='close-search' to='/'></Link>}
          iconElementRight={<IconButton><NavigationCheck onClick={this.submitForm} /></IconButton>}
        />
        <Paper zDepth={2}>
          <TextField
            hintText='Title'
            className='form-item'
            underlineShow={false}
            value={this.state.title}
            onChange={this.updateTitle} />
          <Divider />
          <TextField
            hintText='Author'
            className='form-item'
            underlineShow={false}
            value={this.state.author}
            onChange={this.updateAuthor} />
          <Divider />
          <TextField
            hintText='Body'
            className='form-item'
            underlineShow={false}
            value={this.state.body}
            onChange={this.updateBody} />
          <Divider />
          <SelectField
            floatingLabelText='Category'
            className='form-item'
            value={this.state.category}
            onChange={this.updateSelectedCategory}
          >
            <MenuItem value={'React'} primaryText='React' />
            <MenuItem value={'Redux'} primaryText='Redux' />
            <MenuItem value={'Udacity'} primaryText='Udacity' />
          </SelectField>
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

export default CreatePost;
