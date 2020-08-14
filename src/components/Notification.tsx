import React, { useState } from 'react';
import { Box, Button, Text, BoxProps } from 'grommet';
import { FormClose } from 'grommet-icons';

type NotificationProps = BoxProps & {
  title: string;
  message: string;
  closable?: boolean;
  status?: 'critical' | 'error' | 'warning' | 'ok' | 'unknown' | 'disabled';
};

export const Notification = ({
  title,
  message,
  closable,
  status = 'unknown',
  ...rest
}: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Box
      round
      pad={{ horizontal: 'small' }}
      direction="column"
      background={`status-${status}`}
      {...rest}
    >
      <Box direction="row" justify="between" pad={{ vertical: 'small' }}>
        <Box
          direction="column"
          gap="small"
          pad={{ vertical: 'small' }}
          margin={{ horizontal: 'small' }}
        >
          <Text color="white" size="medium" weight="bold">
            {title}
          </Text>
          <Text size="small" color="white">
            {message}
          </Text>
        </Box>
        {closable && (
          <Box>
            <Button
              plain
              icon={<FormClose color="white" />}
              onClick={() => setVisible(false)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
