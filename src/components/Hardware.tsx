import React from 'react';
import { Anchor, Box, Text, Heading, BoxProps } from 'grommet';
import { Update } from 'grommet-icons';

type Props = BoxProps & {
  name: string;
  hardware: string;
};

export const Hardware1 = ({ name, hardware, ...rest }: Props) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Box gap="small">
      <Heading level="2" margin="none" size="small">
        {name}
      </Heading>
      <Box direction="row" justify="between">
        <Text color="gray" size="small">
          {hardware}
        </Text>
        <Box direction="row" align="center">
          <Box pad={{ horizontal: 'small' }}>
            <Anchor href="" label="Update" />
          </Box>
          <Update size="small" color="brand" />
        </Box>
      </Box>
      <Text color="gray"> </Text>
    </Box>
  </Box>
);

export const Hardware2 = ({ name, hardware, ...rest }: Props) => (
  <Box
    round
    pad="medium"
    direction="column"
    background="white"
    justify="between"
    gap="small"
    {...rest}
  >
    <Box>
      <Box gap="small">
        <Heading level="2" margin="none" size="small">
          {name}
        </Heading>
        <Text color="gray" size="small">
          {' '}
          {hardware}{' '}
        </Text>
      </Box>
    </Box>
    <Box direction="row" wrap>
      <Box
        flex={false}
        round="small"
        margin="xsmall"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        border={{ side: 'all', color: 'accent-4', size: 'small' }}
      >
        4 Hosts
      </Box>
      <Box
        flex={false}
        round="small"
        margin="xsmall"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        border={{ side: 'all', color: 'accent-2', size: 'small' }}
      >
        2 Nodes
      </Box>
    </Box>
  </Box>
);
