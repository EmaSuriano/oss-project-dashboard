import React, { useMemo } from 'react';
import { Box, Text, Heading } from 'grommet';
import Project from '../types/Project';
import { Threshold } from '../types/Settings';
import Section, { Props as SectionProps } from './Section';
import { EMPTY_THRESHOLD } from '../utils/constant';
import { limitToStatus } from '../utils/status';

type Props = Omit<SectionProps, 'title' | 'children'> & {
  projects: Project[];
  threshold?: Threshold;
};

const Summary = ({ projects, threshold = EMPTY_THRESHOLD, ...rest }: Props) => {
  const issuesCount = projects.reduce(
    (acc, { issues }) => acc + issues.totalCount,
    0,
  );

  const pullsCount = projects.reduce(
    (acc, { pullRequests }) => acc + pullRequests.totalCount,
    0,
  );

  return (
    <Section title="Summary" {...rest}>
      <Info title="Projects" count={projects.length} />
      <Info title="Issues" count={issuesCount} limit={threshold.issues} />
      <Info title="Pulls" count={pullsCount} limit={threshold.pullRequests} />
    </Section>
  );
};

type InfoProps = {
  title: string;
  count: number;
  limit?: number;
};

const Info = ({ title, count, limit }: InfoProps) => {
  const color = `status-${limitToStatus(count, limit)}`;
  return (
    <Box>
      <Heading level="3" margin="none" size="small">
        {title}
      </Heading>
      <Text size="90px" weight="bold" color={color}>
        {count}
      </Text>
    </Box>
  );
};

export default Summary;
