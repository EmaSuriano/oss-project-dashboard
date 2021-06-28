import { Box } from '@primer/components';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TopWrapper } from '../components/TopWrapper';
import { Summary } from '../components/Summary';
import { AllProjectList } from '../components/AllProjectList';
import { useLocation } from 'react-router-dom';
import { VIEWS } from '../constants';

export const Dashboard = () => {
  const { hash, ...rest } = useLocation();
  console.log(hash, rest);
  return (
    <TopWrapper>
      <Header />
      <Box maxWidth="large" mx="auto" p={4}>
        <Summary />
        {hash === VIEWS.all && <AllProjectList />}
      </Box>
      <Box bg="border.primary" height="1px" my={2} />
      <Footer />
    </TopWrapper>
  );
};
