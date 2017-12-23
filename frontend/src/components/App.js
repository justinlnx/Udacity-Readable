import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './material_ui_raw_theme';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Category from './Category';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  state = {
    categories: null,
    value: 'all'
  }

  initialize = () => {
    const url = '/categories';
    fetch(
      url,
      {
        headers: {
          'Authorization': 'hi'
        }
      }
    ).then(res => {
      console.log(res);
    })
  }

  changeTab = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="App">
          <Tabs value={this.state.value} onChange={this.changeTab} >
            <Tab label="All" value='all'>
              <Category 
                title='All'
                author='Post author'
                timestamp='2017-01-01 01:00:00'
                body='Everyone says so after all.'
                path={this.state.value}
                />
            </Tab>
            <Tab label="React" value='react'>
              <Category 
                title='react'
                author='react author'
                timestamp='2017-01-01 01:00:00'
                body='Everyone says so after all.'
                path={this.state.value}
                />
            </Tab>
            <Tab label="Redux" value='redux'>
              <Category 
                title='Redux Post Title'
                author='Post author'
                timestamp='2017-01-01 01:00:00'
                body='Everyone says so after all.'
                path='/redux'
                />
            </Tab>
            <Tab label="Udacity" value='udacity'>
              <Category 
                title='Udacity Post Title'
                author='Post author'
                timestamp='2017-01-01 01:00:00'
                body='Everyone says so after all.'
                path='/udacity'
                />
            </Tab>
          </Tabs>
          <div className='add-button'>
            <FloatingActionButton onClick={this.initialize}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
