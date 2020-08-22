import React, { ReactNode, useContext } from 'react';
import { Box, ResponsiveContext, Text, Anchor } from 'grommet';
import { PageHeader } from './PageHeader';

type Props = {
  children: ReactNode;
  side?: boolean;
};

export const Column = ({ children, side }: Props) => {
  const size = useContext(ResponsiveContext);
  console.log(size);
  return (
    <Box
      gap="medium"
      flex={side ? 'shrink' : 'grow'}
      margin="small"
      width={side ? (size === 'large' ? 'medium' : 'large') : 'inherit'}
    >
      {children}
    </Box>
  );
};

type LayoutProps = {
  name: string;
  action?: ReactNode;
  children: ReactNode;
};

export const Layout = ({ name, action, children }: LayoutProps) => {
  return (
    <Box pad="medium">
      <PageHeader name={name} action={action} />
      <Box>
        <Box flex={false} direction="row-responsive" wrap>
          {children}
        </Box>
        <Text textAlign="end" margin="small">
          Develop with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>{' '}
          by <Anchor href="http://emasuriano.com/">Ema Suriano</Anchor>
        </Text>
      </Box>
    </Box>
  );
};
