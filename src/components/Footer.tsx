import { useEffect, useState } from 'react';
import { Flex, Link, Text } from '@primer/components';

export const Footer = () => {
  const [time] = useState(Date.now());
  const [minutes, setMinutes] = useState(0);

  const minutesDiff = (d1: number, d2: number) => {
    const seconds = Math.floor((d2 - d1) / 1000);
    const minutesDiff = Math.floor(seconds / 60);
    return minutesDiff;
  };

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
    <Flex mx={3} justifyContent="space-between">
      <Text textAlign="end" margin="small">
        Last Update: <b>{minutes === 0 ? 'Just now' : `${minutes} minutes`}</b>
      </Text>
      <Text as="p">
        Develop with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        by <Link href="http://emasuriano.com/">Ema Suriano</Link>
      </Text>
    </Flex>
  );
};
