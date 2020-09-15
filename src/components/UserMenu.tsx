import React, { useMemo } from 'react';
import User from '../types/User';
import { Menu, Box, Image } from 'grommet';
import { Mail, Github, Logout } from 'grommet-icons';
import auth from '../utils/auth';

type Props = {
  user: User;
};

const UserMenu = ({ user }: Props) => {
  const items = useMemo(() => buildItems(user), [user]);
  return (
    <Menu
      dropProps={{
        align: { top: 'bottom', left: 'left' },
      }}
      icon={false}
      plain
      items={items}
      alignSelf="center"
      label={
        <Box
          alignContent="center"
          a11yTitle="Avatar Logo"
          height="avatar"
          width="avatar"
        >
          <Image
            src={user.avatarUrl}
            fit="contain"
            style={{ borderRadius: '50%' }}
          />
        </Box>
      }
    />
  );
};

const buildItems = (user: User) => {
  const items = [
    {
      label: 'Github Profile',
      icon: <Github />,
      onClick: () => window.open(user.url),
    },
    {
      label: 'Contact me',
      icon: <Mail />,
      onClick: () => {
        window.location.href = `mailto:${user.email}`;
      },
    },
  ];

  if (!auth.isFixedAuth()) {
    items.push({
      label: 'Logout',
      icon: <Logout />,
      onClick: () => window.location.replace('/logout'),
    });
  }

  return items.map(({ label, icon, ...rest }) => ({
    ...rest,
    gap: 'small',
    label: <Box alignSelf="center">{label}</Box>,
    icon: <Box pad="xsmall">{icon}</Box>,
  }));
};

export default UserMenu;
