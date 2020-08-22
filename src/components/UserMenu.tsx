import React, { useMemo } from 'react';
import User from '../types/User';
import { Menu, Box, Image } from 'grommet';
import { Mail, Github, Logout } from 'grommet-icons';
import { GradientGithub } from './Sidebar';

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
      // items={[].map((item) => ({
      //   ...item,
      //   label: <Text size="small">{item.label}</Text>,
      //   onClick: () => alert(`clicked on ${item.label}`), // no-op
      // }))}
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

const buildItems = (user: User) => [
  {
    label: 'Github Profile',
    icon: <Github />,
    gap: 'small',
    onClick: () => window.open(user.url),
  },
  {
    label: 'Contact me!',
    icon: <Mail />,
    gap: 'small',
    onClick: () => {
      window.location.href = `mailto:${user.email}`;
    },
  },
  {
    label: 'Logout',
    icon: <Logout />,
    gap: 'small',
    onClick: () => window.location.replace('/logout'),
  },
];

export default UserMenu;
