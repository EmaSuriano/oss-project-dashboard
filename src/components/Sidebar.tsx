import React, { useRef, useState, useContext } from 'react';
import {
  Box,
  ResponsiveContext,
  Button,
  Drop,
  BoxProps,
  Menu,
  Text,
} from 'grommet';
import { Analytics, Calculator, Stakeholder, Gremlin } from 'grommet-icons';

export const Sidebar = (props: BoxProps) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box background="brand" overflow="auto" {...props}>
      <Box align="center" pad={{ vertical: 'small' }}>
        <GradientGremlin />
      </Box>
      <Box align="center" gap={size === 'small' ? 'medium' : 'small'}>
        {['Analytics', 'Stakeholder', 'Calculator'].map((iconName, index) => (
          <TooltipButton key={iconName} iconName={iconName} index={index} />
        ))}
      </Box>
      <Box flex />
      <Box pad={{ vertical: 'small' }}>
        <UserMenu />
      </Box>
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
      onClick: () => {}, // no-op
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

const TooltipButton = ({
  iconName,
  index,
}: {
  iconName: string;
  index: number;
}) => {
  const [over, setOver] = useState(false);
  const iconsMap = (color: string) => [
    <Analytics color={color} />,
    <Stakeholder color={color} />,
    <Calculator color={color} />,
  ];

  const tooltipColor = { color: 'accent-1', opacity: 0.9 };
  const ref = useRef<any>();

  return (
    <Box width="100%">
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <Button
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        fill="horizontal"
        hoverIndicator={tooltipColor}
        plain
      >
        {({ hover }: { hover: boolean }) => (
          <Box pad={{ vertical: 'small' }} align="center">
            {iconsMap(hover ? 'black' : 'white')[index]}
          </Box>
        )}
      </Button>
      {ref.current && over && (
        <Drop align={{ left: 'right' }} target={ref.current} plain>
          <Box
            animation="slideRight"
            margin="xsmall"
            pad="small"
            background={tooltipColor}
            round={{ size: 'medium', corner: 'right' }}
          >
            {iconName}
          </Box>
        </Drop>
      )}
    </Box>
  );
};

export const GradientGremlin = () => (
  <Box
    background="linear-gradient(#6FFFB0 0%, #7D4CDB 100%)"
    border={{ color: 'white', size: 'small' }}
    margin={{ bottom: 'medium' }}
    pad="xsmall"
    round="small"
  >
    <Gremlin color="white" />
  </Box>
);
