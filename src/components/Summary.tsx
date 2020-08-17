import React, { useMemo } from 'react';
import { Box, Text, Heading } from 'grommet';
import Project from '../types/Project';
import { Threshold } from '../types/Settings';
import Section, { Props as SectionProps } from './Section';
import { EMPTY_THRESHOLD } from '../utils/constant';

type Props = Omit<SectionProps, 'title' | 'children'> & {
  projects: Project[];
  threshold?: Threshold;
};

const Summary = ({ projects, threshold = EMPTY_THRESHOLD, ...rest }: Props) => {
  const issuesCount = useMemo(
    () => projects.reduce((acc, curr) => acc + curr.issues.totalCount, 0),
    [projects],
  );

  const pullsCount = useMemo(
    () => projects.reduce((acc, curr) => acc + curr.pullRequests.totalCount, 0),
    [projects],
  );

  const { issues: limitIssues, pullRequests: limitPulls } = threshold;

  return (
    <Section title="Summary" {...rest}>
      <Info title="Projects" count={projects.length} />
      <Info title="Issues" count={issuesCount} limit={limitIssues} />
      <Info title="Pulls" count={pullsCount} limit={limitPulls} />
    </Section>
  );
};

type InfoProps = {
  title: string;
  count: number;
  limit?: number;
};

const limitToColor = (count: number, limit?: number) => {
  if (!limit) return 'ok';
  if (count >= limit) return 'error';
  return count > limit - limit / 4 ? 'warning' : 'ok';
};

const Info = ({ title, count, limit }: InfoProps) => {
  const color = `status-${limitToColor(count, limit)}`;

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
