import React from 'react';

import { Button, Grid } from 'grommet';
import { Notification } from '../components/Notification';
import { VirtualMachinesCard } from '../components/VirtualMachinesCard';
import { hardware, utilization, vms, notification } from './data';
import { Hardware1, Hardware2 } from '../components/Hardware';
import { UtilizationCard } from '../components/UtlizationCard';
import { Configure } from 'grommet-icons';
import { Layout, Column } from '../components/Layout';
import useProjectsQuery from '../hooks/useProjectsQuery';
import LoadingSection from '../components/LoadingSection';

export const Dashboard = () => {
  const { loading, error, data } = useProjectsQuery();

  const ready = !loading && !error;
  console.log(data);

  return (
    <Layout name="Dashboard" action={SettingsButton}>
      {loading && 'Loading'}
      {error && 'Something happened ...'}
      {ready && (
        <>
          Loading
          <Grid
            areas={[
              { name: 'nav', start: [0, 0], end: [0, 0] },
              { name: 'main', start: [1, 0], end: [1, 0] },
              { name: 'side', start: [2, 0], end: [2, 0] },
              { name: 'foot', start: [0, 1], end: [2, 1] },
            ]}
            columns={['small', 'flex', 'small']}
            rows={['medium', 'small']}
            gap="small"
          >
            <LoadingSection gridArea="nav" />
            <LoadingSection gridArea="main" />
            <LoadingSection gridArea="side" />
            <LoadingSection gridArea="foot" />
          </Grid>
          <Column>
            <Notification
              title="Something happened"
              message="Super bad error :/"
              status="error"
              closable
            />
            <Notification
              title="Example"
              message="This is the message"
              closable
            />
            <Notification
              title="Warning!"
              message="Man you should check your deps ..."
              status="warning"
              closable
            />
            <VirtualMachinesCard {...vms} />
          </Column>
          <Column>
            {utilization.map((data) => (
              <UtilizationCard key={data.name} data={data} />
            ))}
          </Column>
          <Column>
            <Hardware1 {...hardware.Hardware} />
            <Hardware2 {...hardware.Hypervisor} />
          </Column>
        </>
      )}
    </Layout>
  );
};

const SettingsButton = (
  <Button label="Settings" primary icon={<Configure />} href="/settings" />
);
