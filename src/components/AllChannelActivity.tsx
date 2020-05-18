import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Chart, Stack, Button, Text } from 'grommet';
// @ts-ignore-next-line
import { calcs } from 'grommet/components/Chart/calcs';

import { Tile } from './Tile';
import { processData } from './data/processData';

const shuffelValues = () => processData(true);

export const AllChannelActivity = ({ ...rest }) => {
  const [count, setCount] = useState(120);

  const onRefreshFeedClick = () => {
    setCount(count + 1);
  };
  return (
    <Tile title="All Channel Activity" {...rest}>
      <Box flex />
      <ActivityChart values={shuffelValues()} />
      <Box
        tag="footer"
        background="light-4"
        pad="small"
        round={{ size: 'small', corner: 'bottom' }}
      >
        {/* Footer */}
        <Box
          align="center"
          justify="between"
          direction="row"
          animation={{ size: 'xlarge', type: 'zoomIn' }}
        >
          <Text size="medium" color="brand">
            {count} conversations
          </Text>
          <Button
            label={<Text size="small">Refresh Feed</Text>}
            onClick={onRefreshFeedClick}
          />
        </Box>
      </Box>
    </Tile>
  );
};

const AnimatedStyledBarChart = styled(Chart)`
  path {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: example 2s linear forwards;
  }
`;

const chartSize = {
  width: 'large',
  height: 'medium',
};

const ActivityChart = ({ values }: { values: any[] }) => {
  const { bounds } = calcs(values[0], { coarseness: 5, steps: [3, 3] });
  const barChart = {
    size: chartSize,
    bounds,
  };

  const lineChart = {
    size: chartSize,
    bounds,
    thickness: 'xsmall',
    round: true,
  };

  return (
    <Box alignSelf="center">
      <Stack guidingChild="last">
        <AnimatedStyledBarChart type="bar" {...barChart} values={values[0]} />
        <Chart type="line" {...lineChart} color="accent-2" values={values[1]} />
        <Chart type="line" {...lineChart} color="brand" values={values[2]} />
        <Chart
          type="line"
          {...lineChart}
          color="neutral-1"
          values={values[3]}
        />
      </Stack>
    </Box>
  );
};

export { ActivityChart };
