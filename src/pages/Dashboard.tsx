import React from 'react';

import { Box, Button } from 'grommet';
import { PageHeader } from '../components/PageHeader';
import { Notification } from '../components/Notification';
import { VirtualMachinesCard } from '../components/VirtualMachinesCard';
import { hardware, utilization, vms, notification } from './data';
import { Hardware1, Hardware2 } from '../components/Hardware';
import { UtilizationCard } from '../components/UtlizationCard';
import { Configure } from 'grommet-icons';

export const Dashboard = () => {
  return (
    <Box pad="medium">
      <PageHeader
        name="Dashboard"
        action={<Button label="Manage" primary={true} icon={<Configure />} />}
      />
      <Box>
        <Box flex={false} direction="row-responsive" wrap>
          <Box gap="medium" flex="grow" margin="small">
            <Notification {...notification} />
            <VirtualMachinesCard {...vms} />
          </Box>
          <Box gap="medium" flex="grow" margin="small">
            {utilization.map((data) => (
              <UtilizationCard key={data.name} data={data} />
            ))}
          </Box>
          <Box gap="medium" flex="grow" margin="small">
            <Hardware1 {...hardware.Hardware} />
            <Hardware2 {...hardware.Hypervisor} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
