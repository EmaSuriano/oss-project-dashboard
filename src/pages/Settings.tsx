import React from 'react';
import { Layout, Content } from '../components/Layout';
import { Button, Text, Anchor, Heading } from 'grommet';
import { Analytics } from 'grommet-icons';
import Gist from 'react-gist';
import useGistNameQuery from '../hooks/useGistNameQuery';

const Settings = () => {
  const { output: id } = useGistNameQuery();

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

        <Gist id={id} />

        <Text size="large">
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
