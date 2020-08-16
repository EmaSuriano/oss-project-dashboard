import React from 'react';
import { Box, Text, Heading } from 'grommet';
import Project from '../types/Project';
import { Threshold } from '../types/Settings';
import Section, { Props as SectionProps } from './Section';

type Props = Omit<SectionProps, 'title' | 'children'> & {
  projects: Project[];
  threshold?: Threshold;
};

const Summary = ({ projects, threshold, ...rest }: Props) => (
  <Section title="Summary" {...rest}>
    <Info title="Projects" count={projects.length} />
    <Info title="Issues" count={projects.length} limit={threshold?.issues} />
    <Info
      title="Pulls"
      count={projects.length}
      limit={threshold?.pullRequests}
    />
  </Section>
);

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
