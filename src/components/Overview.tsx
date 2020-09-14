import React from 'react';

import Table from './Table';
import Project from '../types/Project';
import Section, { Props as SectionProps } from './Section';
import { Anchor, Text, Stack, Avatar, Box } from 'grommet';

type Props = Omit<SectionProps, 'title' | 'children'> & {
  projects: Project[];
};

const Overview = ({ projects, ...rest }: Props) => {
  const config = [
    { title: 'Name', render: NameRenderer, size: 'small' },
    {
      title: 'Issues',
      render: IssueRenderer,
      size: 'xsmall',
    },
    {
      title: 'Vulnerabilities',
      render: VulnerabilityRenderer,
      size: 'xsmall',
    },
    {
      title: 'Pulls',
      render: PullRequestRenderer,
      size: 'xsmall',
    },
    { title: 'Stargazers', render: StargazerRenderer, size: 'small' },
  ];

  return (
    <Section title="Overview" {...rest}>
      <Table data={projects} config={config} />
    </Section>
  );
};

const NameRenderer = ({ name, url }: Project) => (
  <Anchor href={url}>{name}</Anchor>
);

const IssueRenderer = ({ issues }: Project) => (
  <Text textAlign="center">{issues.totalCount}</Text>
);

const VulnerabilityRenderer = ({ vulnerabilityAlerts }: Project) => (
  <Text textAlign="center">{vulnerabilityAlerts.totalCount}</Text>
);

const PullRequestRenderer = ({ pullRequests }: Project) => (
  <Text textAlign="center">{pullRequests.totalCount}</Text>
);

const StargazerRenderer = ({ stargazers }: Project) => {
  let margin = 0;
  const rest = stargazers.totalCount - stargazers.nodes.length;

  const calcMargin = (mod = 0) => {
    const INCREMENT = 30;
    margin += INCREMENT;
    return `${margin + mod}px`;
  };

  return (
    <Box justify="center">
      <Stack anchor="left">
        {stargazers.nodes.map((avatar) => (
          <Avatar
            src={avatar.avatarUrl}
            key={avatar.id}
            border={{ color: 'white', size: 'small' }}
            margin={{ left: calcMargin() }}
          />
        ))}

        {rest > 0 && (
          <Text weight="bold" margin={{ left: calcMargin(20) }}>
            + {rest}
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default Overview;
