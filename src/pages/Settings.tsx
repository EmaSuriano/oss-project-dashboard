import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from 'grommet';
import { Analytics } from 'grommet-icons';

const Settings = () => {
  return (
    <Layout name="Settings" action={DashboardButton}>
      Fill me with love!
    </Layout>
  );
};

const DashboardButton = (
  <Button label="Dashboard" primary icon={<Analytics />} href="/" />
);

export default Settings;
