import React, { useContext } from 'react';

import { Layout, Content } from '../components/Layout';
import { Button, Text, Anchor, Heading, Box, ResponsiveContext } from 'grommet';
import { Analytics } from 'grommet-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import useGistNameQuery from '../hooks/useGistNameQuery';
import useGistQuery from '../hooks/useGistQuery';
import { errorsFromQueries, loadingFromQueries } from '../utils/queries';
import validateSettings from '../types/Settings.validator';
import { GIST_NOT_FOUND_ERROR, PARSING_GIST_ERROR } from '../utils/error';
import { PROJECT_FILE_NAME } from '../utils/constant';
import { ApolloError } from 'apollo-boost';
import { Notification } from '../components/Notification';
import styled from 'styled-components';

const isValidSettings = (obj: Object) => {
  try {
    validateSettings(obj);
    return true;
  } catch (error) {
    return false;
  }
};

const syntaxStyle = {
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

  const information =
    (error && error.message) ||
    (loading && 'Loading your Settings ...') ||
    `Your Settings seems to be ${validSettings ? 'valid 😎' : 'invalid 😕'}`;

  const recommendation = !loading && getRecommendation(error, validSettings);
  const gistLink =
    gistNameQuery.output && `https://gist.github.com/${gistNameQuery.output}`;

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
          <Box width={isMobile ? '100%' : '500px'} gap="medium">
            <Text size="large">{information}</Text>

            {recommendation && (
              <Notification
                closable
                title="Action to Take"
                message={recommendation}
                status="ok"
              />
            )}
            <Text>
              For more information about configuring this project, please refer
              to the official documentation inside the{' '}
              <Anchor href="https://github.com/EmaSuriano/oss-project-dashboard">
                Github Repository
              </Anchor>
              .
            </Text>
          </Box>

          {!loading && (
            <Box animation="fadeIn" fill="horizontal">
              <SyntaxHighlighter language="json" customStyle={syntaxStyle}>
                {JSON.stringify(settingsQuery.output, null, 2)}
              </SyntaxHighlighter>
              {gistLink && (
                <FloatingAnchor
                  margin={{ top: 'medium', right: 'large' }}
                  href={gistLink}
                >
                  Edit in Gist
                </FloatingAnchor>
              )}
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

const getRecommendation = (
  error: ApolloError | undefined,
  isValid: boolean,
) => {
  if (error?.message === GIST_NOT_FOUND_ERROR)
    return (
      <Text>
        Please create a Gist file inside{' '}
        <Anchor href="https://gist.github.com/">Github Gist</Anchor> with the
        name of "{PROJECT_FILE_NAME}".
      </Text>
    );
  if (error?.message === PARSING_GIST_ERROR)
    return (
      <Text>
        Invalid content inside "{PROJECT_FILE_NAME}", please check the JSON
        Structure is a valid one.
      </Text>
    );

  if (!isValid)
    return (
      <Text>
        Please check the structure of the configuration is following the{' '}
        <Anchor href="https://github.com/EmaSuriano/oss-project-dashboard">
          Official Documentation
        </Anchor>
        .
      </Text>
    );
};

const FloatingAnchor = styled(Anchor)`
  position: absolute;
  right: 0;
`;

export default Settings;
