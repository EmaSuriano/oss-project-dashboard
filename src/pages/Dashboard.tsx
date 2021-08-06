import { Box } from '@primer/components';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TopWrapper } from '../components/TopWrapper';
import { Summary } from '../components/Summary';
import { AllProjectList } from '../components/AllProjectList';
import { WorkInProgress as WIP } from '../components/WorkInProgress';
import { Route, Switch } from 'react-router-dom';
import { VIEWS } from '../constants';

export const Dashboard = () => {
  return (
    <TopWrapper>
      <Header />
      <Box maxWidth="large" mx="auto" p={4}>
        <Summary />
        <Box mt={3} />
        <Switch>
          <Route path={VIEWS.pullRequests} component={WIP} exact></Route>
          <Route path={VIEWS.vulnerabilityAlerts} component={WIP} exact></Route>
          <Route path={VIEWS.issues} exact component={WIP}></Route>
          <Route path={VIEWS.all} component={AllProjectList}></Route>
        </Switch>
      </Box>
      <Box bg="border.primary" height="1px" my={2} />
      <Footer />
    </TopWrapper>
  );
};
