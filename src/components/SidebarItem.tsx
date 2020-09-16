import React, { useRef, useState, ReactNode } from 'react';
import { Box, BoxProps, Button, Drop, Text } from 'grommet';

type Props = BoxProps & {
  children: ReactNode;
  title: string;
  href: string;
  disableTooltip?: boolean;
};

export const SidebarItem = ({
  children,
  title,
  href,
  disableTooltip,
  ...rest
}: Props) => {
  const [over, setOver] = useState(false);
  const ref = useRef<any>();

  return (
    <>
      <Button
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        hoverIndicator="accent-1"
        href={href}
        plain
        {...rest}
      >
        <Box
          width="80px"
          height="80px"
          a11yTitle={title}
          align="center"
          justify="center"
        >
          {children}
        </Box>
      </Button>
      {ref.current && over && !disableTooltip && (
        <Drop align={{ left: 'right' }} target={ref.current} plain>
          <Box
            animation="slideRight"
            pad="medium"
            background="accent-1"
            height="80px"
            round={{ size: 'small', corner: 'right' }}
          >
            <Text size="large">{title}</Text>
          </Box>
        </Drop>
      )}
    </>
  );
};
