import React, { useState, useContext, ReactNode } from 'react';
import { Box, Button, Text, BoxProps, ResponsiveContext } from 'grommet';
import { FormClose } from 'grommet-icons';

type NotificationProps = BoxProps & {
  title: string;
  message: string | ReactNode;
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
  const size = useContext(ResponsiveContext);
  const width = size === 'small' ? '100%' : 'medium';

  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Box
      round
      direction="column"
      background={`status-${status}`}
      animation="fadeIn"
      width={width}
      height="fit-content"
      pad="medium"
      {...rest}
    >
      <Box direction="column" gap="small">
        <Box direction="row" justify="between">
          <Text color="white" size="large" weight="bold">
            {title}
          </Text>
          {closable && (
            <Button
              plain
              icon={<FormClose color="white" size="large" />}
              onClick={() => setVisible(false)}
            />
          )}
        </Box>
        <Text color="white">{message}</Text>
      </Box>
    </Box>
  );
};
