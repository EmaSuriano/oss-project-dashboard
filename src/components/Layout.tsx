import React, { ReactNode } from 'react';
import { Box } from 'grommet';
import { PageHeader } from './PageHeader';

type Props = {
  children: ReactNode;
};

export const Column = ({ children }: Props) => {
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
      </Box>
    </Box>
  );
};
