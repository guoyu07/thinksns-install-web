import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';

let App = React.createClass({
  getInitialState() {
    return {
      stepIndex: 0,
    };
  },

  render() {
    return (
      <MuiThemeProvider mui={getMuiTheme(darkBaseTheme)}>
        <Stepper
          activeStep={this.state.stepIndex}
          linear={false}
          orientation={'vertical'}
        >
          <Step>
            <StepLabel>第一步</StepLabel>
            <StepContent>
              1
            </StepContent>
          </Step>
          <Step>
            <StepLabel>第二步</StepLabel>
            <StepContent>1</StepContent>
          </Step>
        </Stepper>
      </MuiThemeProvider>
    );
  }
});

export default App;