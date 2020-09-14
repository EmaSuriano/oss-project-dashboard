import React, { ReactNode, useContext } from 'react';
import { Box, ResponsiveContext, BoxProps } from 'grommet';
import { PageHeader } from './PageHeader';
import { Footer, Props as FooterProps } from './Footer';

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
    <Box gap="small" flex="grow" margin="small">
      {children}
    </Box>
  );
};

type LayoutProps = {
  name: string;
  action?: ReactNode;
  children: ReactNode;
} & FooterProps &
  BoxProps;

export const Layout = ({
  name,
  action,
  children,
  withTime,
  ...rest
}: LayoutProps) => {
  return (
    <Box pad="medium">
      <PageHeader name={name} action={action} />
      <Box>
        <Box flex={false} direction="row-responsive" wrap {...rest}>
          {children}
        </Box>
        <Footer withTime={withTime} />
      </Box>
    </Box>
  );
};
