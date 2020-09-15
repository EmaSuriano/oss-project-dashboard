import React, { ReactNode, useContext } from 'react';

import { Box, Heading, BoxProps, ResponsiveContext } from 'grommet';

type PageHeaderProps = BoxProps & {
  name: string;
  action?: ReactNode;
};

export const PageHeader = ({ name, action, ...rest }: PageHeaderProps) => {
  const size = useContext(ResponsiveContext);
  const isMobile = size === 'small';

  return (
    <Box
      justify="between"
      direction="row"
      align="center"
      margin={{ horizontal: 'small' }}
      {...rest}
    >
      <Heading level={1}>{name}</Heading>
      {action && !isMobile && <Box alignSelf="center">{action}</Box>}
    </Box>
  );
};
