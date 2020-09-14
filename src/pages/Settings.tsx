import React from 'react';

import { Layout, Content } from '../components/Layout';
import { Button, Text, Anchor, Heading } from 'grommet';
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

const Settings = () => {
  const gistNameQuery = useGistNameQuery();
  const settingsQuery = useGistQuery(gistNameQuery.output);

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

        <Text size="large">
          {(error && error.message) ||
            (loading && 'Loading your Settings ...') ||
            `Your Settings seems to be 
            ${validSettings ? 'valid 🎉' : 'invalid 😕'}`}
        </Text>

        {ready && (
          <SyntaxHighlighter
            language="json"
            customStyle={{ padding: 0, margin: 0 }}
          >
            {JSON.stringify(settingsQuery.output, null, 2)}
          </SyntaxHighlighter>
        )}

        <Text>
          For more information about configuring this project, please refer to
          the official documentation inside the{' '}
          <Anchor href="https://github.com/EmaSuriano/oss-project-dashboard">
            Github Repository
          </Anchor>
          .
        </Text>
      </Content>
    </Layout>
  );
};

const DashboardButton = (
  <Button label="Dashboard" primary icon={<Analytics />} href="/" />
);

export default Settings;
