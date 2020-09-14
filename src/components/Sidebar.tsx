import React, { useContext } from 'react';
import { Box, ResponsiveContext, BoxProps } from 'grommet';
import { Analytics, Configure } from 'grommet-icons';
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
