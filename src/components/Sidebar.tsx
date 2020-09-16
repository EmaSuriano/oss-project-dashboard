import React, { useContext } from 'react';
import { Box, BoxProps, ResponsiveContext } from 'grommet';
import { Analytics, Configure } from 'grommet-icons';
import { SidebarItem } from './SidebarItem';
import UserMenu from './UserMenu';
import useUserQuery from '../hooks/useUserQuery';

type Props = BoxProps;

export const Sidebar = (props: Props) => {
  const { loading, error, output } = useUserQuery();
  const size = useContext(ResponsiveContext);

  const ready = !loading && !error;
  const isMobile = size === 'small';

  return (
    <Box
      align="center"
      style={{ position: 'fixed' }}
      fill={isMobile ? 'horizontal' : 'vertical'}
      direction={isMobile ? 'row' : 'column'}
      pad={{
        vertical: isMobile ? '0' : 'small',
        horizontal: isMobile ? 'small' : '0',
      }}
      gap="medium"
      background="brand"
      {...props}
    >
      <SidebarItem title="Dashboard" href="/" disableTooltip={isMobile}>
        <Analytics size="large" />
      </SidebarItem>
      <SidebarItem title="Settings" href="/settings" disableTooltip={isMobile}>
        <Configure size="large" />
      </SidebarItem>
      <Box flex />
      {ready && <UserMenu user={output!} />}
    </Box>
  );
};
