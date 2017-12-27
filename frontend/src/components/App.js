import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './material_ui_raw_theme';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Category from './Category';
import { Route, Link, withRouter } from 'react-router-dom';
import * as API from '../apis';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar, getAllPosts } from '../actions';

class App extends Component {
  state = {
    categories: null,
    value: 'all'
  }

  componentDidMount = () => {
    this.props.history.push('/all');
    API.getCategories().then(categories => {
      this.setState({ categories });
    });
    var allPosts = this.props.getAllPosts();
    console.log(allPosts);
  }

  changeTab = (value) => {
    this.setState({
      value: value
    });
    this.props.history.push(value);    
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="App">
          <Tabs value={this.state.value} onChange={this.changeTab} >
            <Tab label="All" value='all'>
              <Route path='/all' render={() => (
                <Category 
                  title='All'
                  author='Post author'
                  timestamp='2017-01-01 01:00:00'
                  body='Everyone says so after all.'
                  />
              )} />
            </Tab>
            {this.state.categories !== null && this.state.categories.map(category => (
              <Tab label={category.name} value={category.name} key={category.name}>
                <Route path={`/${category.path}`} render={() => (
                  <Category 
                    title='Redux Post Title'
                    author='Post author'
                    timestamp='2017-01-01 01:00:00'
                    body='Everyone says so after all.'
                    />
                )} />
              </Tab>  
            ))}
            {/* <Tab label="React" value='react'>
              <Route path='/react' render={() => (
                <Category 
                  title='react'
                  author='react author'
                  timestamp='2017-01-01 01:00:00'
                  body='Everyone says so after all.'
                  />
              )} />
            </Tab>
            <Tab label="Redux" value='redux'>
              <Route path='/redux' render={() => (
                <Category 
                  title='Redux Post Title'
                  author='Post author'
                  timestamp='2017-01-01 01:00:00'
                  body='Everyone says so after all.'
                  />
              )} />
            </Tab>
            <Tab label="Udacity" value='udacity'>
              <Route path='/udacity' render={() => (
                <Category 
                  title='Udacity Post Title'
                  author='Post author'
                  timestamp='2017-01-01 01:00:00'
                  body='Everyone says so after all.'
                  />
              )} />
            </Tab> */}
          </Tabs>
          <div className='add-button'>
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps ({ calendar, food }) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal] ? food[calendar[day][meal]] : null

        return meals;
      }, {})
    }))
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data)),
    getAllPosts: (data) => dispatch(getAllPosts(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
