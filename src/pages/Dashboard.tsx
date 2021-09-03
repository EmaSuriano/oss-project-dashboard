import { Box } from '@primer/components';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TopWrapper } from '../components/TopWrapper';
import { Summary } from '../components/Summary';
import { ResultTable } from '../components/ResultTable';

export const Dashboard = () => {
  return (
    <TopWrapper>
      <Header />
      <Box maxWidth="large" mx="auto" p={4}>
        <Summary />
        <Box mt={3} />
        <ResultTable />
      </Box>
      <Box bg="border.primary" height="1px" my={2} />
      <Footer />
    </TopWrapper>
  );
};
