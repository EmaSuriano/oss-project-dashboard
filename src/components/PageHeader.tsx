import React from 'react';

import { Box, Heading, BoxProps } from 'grommet';
import { Configure } from 'grommet-icons';

type PageHeaderProps = BoxProps & {
  name: string;
};

export const PageHeader = ({ name, ...rest }: PageHeaderProps) => (
  <Box
    flex={false}
    margin={{ bottom: 'small' }}
    justify="between"
    direction="row"
    border={{ side: 'bottom', color: 'light-4' }}
    {...rest}
  >
    <Heading level={2} size="xsmall">
      {name}
    </Heading>
    <Box alignSelf="center">
      <Configure color="brand" />
    </Box>
  </Box>
);
