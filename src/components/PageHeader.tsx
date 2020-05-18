import React, { ReactNode } from 'react';

import { Box, Heading, BoxProps } from 'grommet';

type PageHeaderProps = BoxProps & {
  name: string;
  action?: ReactNode;
};

export const PageHeader = ({ name, action, ...rest }: PageHeaderProps) => (
  <Box justify="between" direction="row" {...rest}>
    <Heading level={1}>{name}</Heading>
    {action && <Box alignSelf="center">{action}</Box>}
  </Box>
);
