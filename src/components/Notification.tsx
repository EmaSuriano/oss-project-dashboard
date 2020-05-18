import React from 'react';
import { Box, Button, Text, BoxProps } from 'grommet';
import { FormClose } from 'grommet-icons';

type NotificationProps = BoxProps & {
  message: string;
  date: string;
};

export const Notification = ({ message, date, ...rest }: NotificationProps) => (
  <Box
    round
    pad={{ horizontal: 'small' }}
    direction="column"
    background="status-critical"
    {...rest}
  >
    <Box direction="row" justify="between" pad={{ vertical: 'small' }}>
      <Box direction="column" gap="small" pad={{ vertical: 'small' }}>
        <Text
          color="white"
          size="medium"
          weight="bold"
          margin={{ horizontal: 'small' }}
        >
          {message}
        </Text>
        <Text size="small" color="white" margin={{ horizontal: 'small' }}>
          {date}
        </Text>
      </Box>
      <Box>
        <Button plain icon={<FormClose color="white" />} onClick={() => {}} />
      </Box>
    </Box>
  </Box>
);
