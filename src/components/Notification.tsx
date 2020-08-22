import React, { useState } from 'react';
import { Box, Button, Text, BoxProps } from 'grommet';
import { FormClose } from 'grommet-icons';

type NotificationProps = BoxProps & {
  title: string;
  message: string;
  closable?: boolean;
  status?: 'error' | 'warning' | 'ok' | 'unknown' | 'disabled';
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
    <Box round direction="column" background={`status-${status}`} {...rest}>
      <Box direction="row" justify="between" pad="medium">
        <Box direction="column" gap="small">
          <Text color="white" size="large" weight="bold">
            {title}
          </Text>
          <Text color="white">{message}</Text>
        </Box>
        {closable && (
          <Box>
            <Button
              plain
              icon={<FormClose color="white" size="large" />}
              onClick={() => setVisible(false)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
