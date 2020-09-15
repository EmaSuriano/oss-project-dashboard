import React, { useEffect, useState } from 'react';
import { Box, Text, Anchor } from 'grommet';

export type Props = {
  withTime?: boolean;
  background?: boolean;
};

export const Footer = ({ withTime, background }: Props) => {
  const [time] = useState(Date.now());
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setMinutes(minutesDiff(time, Date.now())),
      60 * 1000,
    );
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <Box
      direction="row-reverse"
      justify="between"
      fill="horizontal"
      background={background ? 'white' : 'transparent'}
      style={{ borderRadius: '24px 0 0 0' }}
    >
      <Text textAlign="end" margin="small">
        Develop with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        by <Anchor href="http://emasuriano.com/">Ema Suriano</Anchor>
      </Text>
      {withTime && (
        <Text textAlign="end" margin="small">
          Last Update:{' '}
          <b>{minutes === 0 ? 'Just now' : `${minutes} minutes`}</b>
        </Text>
      )}
    </Box>
  );
};

const minutesDiff = (d1: number, d2: number) => {
  const seconds = Math.floor((d2 - d1) / 1000);
  const minutesDiff = Math.floor(seconds / 60);
  return minutesDiff;
};
