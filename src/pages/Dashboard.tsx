import React from 'react';

import { Button } from 'grommet';
import { Notification } from '../components/Notification';
import { VirtualMachinesCard } from '../components/VirtualMachinesCard';
import { hardware, utilization, vms, notification } from './data';
import { Hardware1, Hardware2 } from '../components/Hardware';
import { UtilizationCard } from '../components/UtlizationCard';
import { Configure } from 'grommet-icons';
import { Layout, Column } from '../components/Layout';

export const Dashboard = () => {
  return (
    <Layout
      name="Dashboard"
      action={<Button label="Manage" primary={true} icon={<Configure />} />}
    >
      <Column>
        <Notification {...notification} />
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
    </Layout>
  );
};
