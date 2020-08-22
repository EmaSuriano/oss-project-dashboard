import React, { ReactNode, useContext } from 'react';
import { Box, ResponsiveContext, Text, Anchor } from 'grommet';
import { PageHeader } from './PageHeader';

type Props = {
  children: ReactNode;
};

export const Side = ({ children }: Props) => {
  const size = useContext(ResponsiveContext);
  const direction = size === 'medium' ? 'row' : 'column';

  return (
    <Box gap="medium" flex="shrink" margin="small" direction={direction}>
      {children}
    </Box>
  );
};

export const Content = ({ children }: Props) => {
  return (
    <Box gap="medium" flex="grow" margin="small">
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
