import React, { useContext } from 'react';
import { Box, ResponsiveContext, BoxProps, Menu, Text } from 'grommet';
import { Analytics, Github, Configure } from 'grommet-icons';
import { SidebarItem } from './SidebarItem';

export const Sidebar = (props: BoxProps) => {
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
      <UserMenu />
    </Box>
  );
};

type UserMenuProps = {
  items?: { label: string }[];
};

const UserMenu = ({ items = [] }: UserMenuProps) => (
  <Menu
    dropAlign={{ top: 'bottom', right: 'right' }}
    icon={false}
    items={items.map((item) => ({
      ...item,
      label: <Text size="small">{item.label}</Text>,
      onClick: () => alert(`clicked on ${item.label}`), // no-op
    }))}
    label={
      <Box
        alignContent="center"
        a11yTitle="Avatar Logo"
        height="avatar"
        width="avatar"
        round="full"
        background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
      />
    }
    alignSelf="center"
  />
);

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
