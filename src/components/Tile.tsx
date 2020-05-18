import React, { ReactNode } from 'react';

import { Box, Button, Heading, BoxProps } from 'grommet';
import { More } from 'grommet-icons';

type TileProps = BoxProps & {
  title: string;
  children: ReactNode;
};

export const Tile = ({ children, title, ...rest }: TileProps) => (
  <Box elevation="medium" fill="vertical" round="small" {...rest}>
    <Box
      tag="header"
      pad={{ horizontal: 'small', top: 'small', bottom: 'medium' }}
      direction="row"
      justify="between"
      align="center"
    >
      <Heading level={3} size="xsmall" margin="none">
        {title}
      </Heading>
      <Button icon={<More color="control" />} />
    </Box>
    {children}
  </Box>
);
