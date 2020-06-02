import React, { useRef, useState, ReactNode } from 'react';
import { Box, Button, Drop, Anchor, Text } from 'grommet';

type Props = { children: ReactNode; title: string; href: string };

export const SidebarItem = ({ children, title, href }: Props) => {
  const [over, setOver] = useState(false);
  const ref = useRef<any>();

  return (
    <Box width="100%">
      <Button
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        fill="horizontal"
        hoverIndicator="accent-1"
        plain
      >
        <Box pad="medium" align="center">
          <Anchor href={href} label={children} a11yTitle={title} />
        </Box>
      </Button>
      {ref.current && over && (
        <Drop align={{ left: 'right' }} target={ref.current} plain>
          <Box
            animation="slideRight"
            pad="medium"
            background="accent-1"
            height={ref.current.height}
            round={{ size: 'small', corner: 'right' }}
          >
            <Text size="large">{title}</Text>
          </Box>
        </Drop>
      )}
    </Box>
  );
};
