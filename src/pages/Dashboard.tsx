import React from 'react';

import { Button } from 'grommet';
import { Notification } from '../components/Notification';
import Summary from '../components/Summary';
import { hardware, utilization } from './data';
import { Hardware1, Hardware2 } from '../components/Hardware';
import { UtilizationCard } from '../components/UtlizationCard';
import { Configure } from 'grommet-icons';
import { Layout, Column } from '../components/Layout';
import useProjectsQuery from '../hooks/useProjectsQuery';

export const Dashboard = () => {
  const { loading, error, data } = useProjectsQuery();

  const ready = !loading && !error;
  const { projects, settings } = data!;
  return (
    <Layout name="Dashboard" action={SettingsButton}>
      <Column>
        <Summary
          projects={projects}
          threshold={settings.threshold}
          loading={loading}
        />
        {error && (
          <Notification
            title="Something happened"
            message="Super bad error :/"
            status="error"
            closable
          />
        )}
        <Notification
          title="Warning!"
          message="Man you should check your deps ..."
          status="warning"
          closable
        />
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
    </Layout>
  );
};

const SettingsButton = (
  <Button label="Settings" primary icon={<Configure />} href="/settings" />
);
