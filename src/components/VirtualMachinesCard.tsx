import React from 'react';
import { Box, Text, Heading, BoxProps } from 'grommet';

type Status = 'Off' | 'Suspended' | 'On';

const statusColors: { [key in Status]: string } = {
  Off: 'status-critical',
  Suspended: 'status-warning',
  On: 'status-ok',
};

type Props = BoxProps & {
  name: string;
  count: number;
  status: { [key in Status]: number };
};

export const keys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];

export const VirtualMachinesCard = ({
  name,
  count,
  status,
  ...rest
}: Props) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Heading level="2" margin="none" size="small">
      {name}
    </Heading>
    <Text size="90px" weight="bold">
      {count}
    </Text>
    <Box gap="medium" pad={{ vertical: 'small' }}>
      {keys(status).map((state) => (
        <Box direction="row" align="center" key={state}>
          <StatusBadge size="xlarge" background={statusColors[state]} />
          <Box pad="xsmall">
            <Text size="small" color="dark-1" margin={{ left: 'xsmall' }}>
              {state} ({status[state]})
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const StatusBadge = ({ background = 'status-unknown', ...rest }) => (
  <Box
    width="12px"
    height="12px"
    round="small"
    background={background}
    {...rest}
  />
);
