import React, { useContext } from 'react';

import { Layout, Content } from '../components/Layout';
import { Button, Text, Anchor, Heading, Box, ResponsiveContext } from 'grommet';
import { Analytics } from 'grommet-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import useGistNameQuery from '../hooks/useGistNameQuery';
import useGistQuery from '../hooks/useGistQuery';
import { errorsFromQueries, loadingFromQueries } from '../utils/queries';
import validateSettings from '../types/Settings.validator';

const isValidSettings = (obj: Object) => {
  try {
    validateSettings(obj);
    return true;
  } catch (error) {
    return false;
  }
};

const syntaxStyle = {
  margin: 0,
  backgroundColor: 'white',
  borderRadius: '10px',
};

const Settings = () => {
  const gistNameQuery = useGistNameQuery();
  const settingsQuery = useGistQuery(gistNameQuery.output);
  const size = useContext(ResponsiveContext);
  const isMobile = size === 'small';

  const error = errorsFromQueries(gistNameQuery, settingsQuery);
  const loading = loadingFromQueries(gistNameQuery, settingsQuery);
  const validSettings = isValidSettings(settingsQuery.output);
  const ready = !error && !loading;

  return (
    <Layout name="Settings" action={DashboardButton}>
      <Content>
        <Text size="large">
          All the Settings for this application are stored inside{' '}
          <Anchor href="https://gist.github.com/">Github Gist</Anchor>. The
          changes will be automatically reflected once the changes have been
          applied.
        </Text>

        <Heading level={2}>Your Configuration</Heading>

        <Box direction={isMobile ? 'column' : 'row'} gap="medium">
          <Box width={isMobile ? '100%' : 'medium'} gap="medium">
            <Text size="large">
              {(error && error.message) ||
                (loading && 'Loading your Settings ...') ||
                `Your Settings seems to be 
            ${validSettings ? 'valid 😎' : 'invalid 😕'}`}
            </Text>
            <Text>
              For more information about configuring this project, please refer
              to the official documentation inside the{' '}
              <Anchor href="https://github.com/EmaSuriano/oss-project-dashboard">
                Github Repository
              </Anchor>
              .
            </Text>
          </Box>

          {ready && (
            <Box animation="fadeIn" fill="horizontal">
              <SyntaxHighlighter language="json" customStyle={syntaxStyle}>
                {JSON.stringify(settingsQuery.output, null, 2)}
              </SyntaxHighlighter>
            </Box>
          )}
        </Box>
      </Content>
    </Layout>
  );
};

const DashboardButton = (
  <Button label="Dashboard" primary icon={<Analytics />} href="/" />
);

export default Settings;
