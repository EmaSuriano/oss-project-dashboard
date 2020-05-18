import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Grid, Grommet } from 'grommet';
import { Sidebar } from './components';
import { theme } from './theme';
import { Dashboard } from './pages/Dashboard';

export const App = () => (
  <Router>
    <Grommet theme={theme} full>
      <Grid
        fill
        rows={['auto']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'sidebar', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}
      >
        <Sidebar gridArea="sidebar" />
        <Box gridArea="main" overflow="auto" fill background="light-2">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            {/* The following are placeholders for future pages */}
            {/* <Route path="/stakeholders" component={Stakeholders} />
                <Route path="/calculator" component={Calculator} /> */}
          </Switch>
        </Box>
      </Grid>
    </Grommet>
  </Router>
);
