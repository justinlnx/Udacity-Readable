import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './material_ui_raw_theme';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginRight: 24,
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="App">
          <Tabs>
            <Tab label="All" >
            </Tab>
            <Tab label="React" >
            </Tab>
            <Tab label="Redux" >
            </Tab>
            <Tab label="Udacity">
            </Tab>
          </Tabs>
          <div className='add-button'>
            <FloatingActionButton style={style}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
