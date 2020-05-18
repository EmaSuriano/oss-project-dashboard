import React, { useContext } from 'react';

import { Box, ResponsiveContext } from 'grommet';
import { PageHeader } from '../components/PageHeader';
import { Notification } from '../components/Notification';
import { VirtualMachinesCard } from '../components/VirtualMachinesCard';
import { hardware, utilization, vms, notification } from './data';
import { Hardware } from '../components/Hardware';
import { UtilizationCard } from '../components/UtlizationCard';

// type ResponsiveSize = 'small' | 'medium' | 'large';

// const responsiveRows = {
//   small: ['auto', 'auto', 'auto', 'auto', 'auto'],
//   medium: ['auto', 'auto', 'auto'],
//   large: ['auto', 'auto'],
// };

// const responsiveColumns = {
//   small: ['flex'],
//   medium: ['flex', 'flex', 'flex'],
//   large: ['flex', 'flex', 'flex', 'flex'],
// };

// const responsiveAreas = {
//   small: [
//     { name: 'allChannelActivity', start: [0, 0], end: [0, 0] },
//     { name: 'budget', start: [0, 1], end: [0, 1] },
//     { name: 'campaigns', start: [0, 2], end: [0, 2] },
//     { name: 'conversations', start: [0, 3], end: [0, 3] },
//     { name: 'geo', start: [0, 4], end: [0, 4] },
//   ],
//   medium: [
//     { name: 'allChannelActivity', start: [0, 0], end: [1, 0] },
//     { name: 'budget', start: [2, 0], end: [2, 0] },
//     { name: 'conversations', start: [1, 1], end: [2, 1] },
//     { name: 'campaigns', start: [0, 1], end: [0, 1] },
//     { name: 'geo', start: [0, 2], end: [2, 2] },
//   ],
//   large: [
//     { name: 'allChannelActivity', start: [0, 0], end: [1, 0] },
//     { name: 'budget', start: [2, 0], end: [2, 0] },
//     { name: 'campaigns', start: [3, 0], end: [3, 1] },
//     { name: 'conversations', start: [0, 1], end: [0, 1] },
//     { name: 'geo', start: [1, 1], end: [2, 1] },
//   ],
// };

// export const notification = {
//   action: 'Fix Alert',
//   date: 'June 10, 2018, 4:38 am',
//   message: 'Inconsistent configuration detected on Grommet Eval 6.',
// };

// export const vms = {
//   name: 'Virtual Machines',
//   count: 126,
//   status: {
//     On: 88,
//     Off: 36,
//     Suspended: 2,
//   },
// };

export const Dashboard = () => {
  // const size = useContext(ResponsiveContext) as ResponsiveSize;

  return (
    <Box flex={false} pad="medium">
      <PageHeader name="Dashboard" />
      <Box flex overflow="auto" gap="medium" pad="medium">
        <Box flex={false} direction="row-responsive" wrap>
          <Box gap="large" flex="grow" margin="medium">
            <Notification {...notification} />
            <VirtualMachinesCard {...vms} />
          </Box>
          <Box gap="large" flex="grow" margin="medium">
            {utilization.map((data) => (
              <UtilizationCard key={data.name} data={data} />
            ))}
          </Box>
          <Box flex="grow" margin="medium">
            <Hardware data={hardware} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

{
  /* <Box flex={false} direction="row-responsive" wrap>
        <Box gap="large" flex="grow" margin="medium">
          <Notification {...notification} />
          <VirtualMachinesCard {...vms} />
        </Box>
        <Box gap="large" flex="grow" margin="medium">
          {utilization.map((data) => (
            <UtilizationCard key={data.name} data={data} />
          ))}
        </Box>
        <Box flex="grow" margin="medium">
          <Hardware data={hardware} />
        </Box>
        <Box flex={false}>
          <Grid
            align="center"
            gap="medium"
            rows={responsiveRows[size]}
            columns={responsiveColumns[size]}
            areas={responsiveAreas[size]}
          >
            <AllChannelActivity gridArea="allChannelActivity" />
          </Grid>
        </Box>
      </Box> */
}
