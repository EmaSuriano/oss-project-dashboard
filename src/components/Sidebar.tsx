import React, { useContext } from 'react';
import { Box, ResponsiveContext, BoxProps, Menu, Text } from 'grommet';
import { Analytics, Github, Configure } from 'grommet-icons';
import { SidebarItem } from './SidebarItem';
import UserMenu from './UserMenu';
import useUserQuery from '../hooks/useUserQuery';

export const Sidebar = (props: BoxProps) => {
  const { loading, error, output } = useUserQuery();
  const ready = !loading && !error;

  const size = useContext(ResponsiveContext);
  const spacing = size === 'small' ? 'medium' : 'small';

  return (
    <Box
      align="center"
      fill="vertical"
      pad={{ vertical: spacing }}
      gap={spacing}
      width="sidebar"
      background="brand"
      {...props}
    >
      <GradientGithub />
      <SidebarItem title="Dashboard" href="/">
        <Analytics size="large" />
      </SidebarItem>
      <SidebarItem title="Settings" href="/settings">
        <Configure size="large" />
      </SidebarItem>
      <Box flex />
      {ready && <UserMenu user={output!} />}
    </Box>
  );
};

export const GradientGithub = () => (
  <Box
    background="linear-gradient(#6FFFB0 0%, #7D4CDB 100%)"
    border={{ color: 'white', size: 'small' }}
    margin={{ vertical: 'medium' }}
    pad="xsmall"
    round="small"
  >
    <Github color="white" size="large" />
  </Box>
);
