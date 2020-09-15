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
    <Section title="Projects Overview" {...rest}>
      <Table data={projects} config={config} minWidth="700px" />
    </Section>
  );
};

const NameRenderer = ({ name, url }: Project) => (
  <Text weight="bold">
    <Anchor href={url}>{name}</Anchor>
  </Text>
);

const IssueRenderer = ({ issues, url }: Project) => (
  <Text textAlign="center">
    {issues.totalCount > 0 ? (
      <Anchor href={`${url}/issues`}>{issues.totalCount}</Anchor>
    ) : (
      issues.totalCount
    )}
  </Text>
);

const VulnerabilityRenderer = ({ vulnerabilityAlerts, url }: Project) => (
  <Text textAlign="center">
    {vulnerabilityAlerts.totalCount > 0 ? (
      <Anchor href={`${url}/network/alerts`}>
        {vulnerabilityAlerts.totalCount}
      </Anchor>
    ) : (
      vulnerabilityAlerts.totalCount
    )}
  </Text>
);

const PullRequestRenderer = ({ pullRequests, url }: Project) => (
  <Text textAlign="center">
    {pullRequests.totalCount > 0 ? (
      <Anchor href={`${url}/pulls`}>{pullRequests.totalCount}</Anchor>
    ) : (
      pullRequests.totalCount
    )}
  </Text>
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
    <Box justify="center" width="200px">
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
