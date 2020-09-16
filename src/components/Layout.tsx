import React, { ReactNode, useContext } from 'react';
import { Box, ResponsiveContext, BoxProps, Grid } from 'grommet';
import { PageHeader } from './PageHeader';
import { Sidebar } from './Sidebar';
import { Footer, Props as FooterProps } from './Footer';
import { Fixed } from './Fixed';

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

type LayoutProps = FooterProps &
  BoxProps & {
    name: string;
    action?: ReactNode;
    children: ReactNode;
  };

export const Layout = ({
  name,
  action,
  children,
  withTime,
  ...rest
}: LayoutProps) => {
  const size = useContext(ResponsiveContext);
  const isMobile = size === 'small';

  const areas = isMobile
    ? [
        { name: 'sidebar', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [0, 0], end: [0, 0] },
      ]
    : [
        { name: 'sidebar', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [1, 0], end: [1, 0] },
      ];

  const full = ['auto', 'flex'];
  const single = ['auto'];

  return (
    <Grid
      fill
      rows={isMobile ? full : single}
      columns={isMobile ? single : full}
      areas={areas}
    >
      <Fixed position="bottom">
        <Sidebar />
      </Fixed>
      <Box gridArea="main" overflow="auto" fill background="light-2">
        <Box pad="medium">
          <PageHeader name={name} action={action} />
          <Box>
            <Box flex={false} direction="row-responsive" wrap {...rest}>
              {children}
              <Footer withTime={withTime} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
