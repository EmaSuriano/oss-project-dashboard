import React, { useState, useEffect, ReactNode } from 'react';
import {
  ThemeProvider,
  Header,
  Avatar,
  Text,
  StyledOcticon,
  Dropdown,
  Box,
  SubNav,
  Flex,
  BaseStyles,
  Label,
  BorderBox,
  Link,
} from '@primer/components';
import { useLocation } from 'react-router-dom';

import { MarkGithubIcon } from '@primer/octicons-react';
import Apollo from '../components/Apollo';
import useProjectsQuery from '../hooks/useProjectsQuery';
import Project from '../types/Project';
import Settings, { Threshold } from '../types/Settings';
import styled from 'styled-components';
import { Octokit } from '@octokit/core';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { Endpoints } from '@octokit/types';
import { PROJECT_FILE_NAME } from '../utils/constant';
import { GIST_NOT_FOUND_ERROR } from '../utils/error';
import { DataTable } from 'grommet';
import { responsePathAsArray } from 'graphql';
import validateSettings from '../types/Settings.validator';

type TabId = keyof Threshold | 'all';

const VIEWS: Record<TabId, string> = {
  all: '#',
  issues: '#issues',
  vulnerabilityAlerts: '#vulnerabilities',
  pullRequests: '#pull-requests',
};

const queryClient = new QueryClient();

const Separator = () => <Box bg="border.primary" height="1px" my={2} />;

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN,
});

const requests = {
  getUser: () =>
    octokit
      .request('/user')
      .then(({ data }) => data as Endpoints['GET /user']['response']['data']),

  getSettings: async () => {
    const gists = await octokit
      .request('/gists')
      .then(({ data }) => data as Endpoints['GET /gists']['response']['data']);

    const gist = gists.find(({ files }) => files[PROJECT_FILE_NAME]);

    if (!gist) throw Error(GIST_NOT_FOUND_ERROR);

    const gistContent = await fetch(
      gist.files[PROJECT_FILE_NAME]!.raw_url!,
    ).then((response) => response.json());

    return validateSettings(gistContent);
  },
  getThreshold: async () => {
    const settings = await requests.getSettings();

    return settings.threshold;
  },
};

const AppHeader = () => {
  const { data } = useQuery(['user'], requests.getUser);

  return (
    <>
      <Header>
        <Header.Item>
          <Header.Link href="/" fontSize={2}>
            <StyledOcticon icon={MarkGithubIcon} size={32} mr={2} />
            <span>Open Source Dashboard</span>
          </Header.Link>
        </Header.Item>
        <Header.Item full />
        <Header.Item mr={0}>
          <Dropdown css={{}}>
            <Box as="summary" sx={{ cursor: 'pointer' }}>
              <Avatar src={data?.avatar_url} alt={data?.login} />
              <Dropdown.Caret />
            </Box>
            <Dropdown.Menu direction="sw" mt={2}>
              <Box as="li" color="text.primary" px={3}>
                Signed in as <br />
                <b>{data?.login}</b>
              </Box>
              <Separator />
              <Dropdown.Item>
                <a href={data?.url}>Your Profile</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href="/logout">Sign out</a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Header.Item>
      </Header>
    </>
  );
};

enum ThresholdStatus {
  None,
  Ok,
  Warn,
  Bad,
}

const STATUS_TO_COLOR = {
  [ThresholdStatus.None]: 'label.primary.border',
  [ThresholdStatus.Ok]: 'label.success.border',
  [ThresholdStatus.Warn]: 'label.warning.border',
  [ThresholdStatus.Bad]: 'label.danger.border',
};

export const limitToStatus = (count: number, limit?: number) => {
  if (!limit) return ThresholdStatus.None;
  if (count >= limit) return ThresholdStatus.Bad;
  return count > limit - limit / 4 ? ThresholdStatus.Warn : ThresholdStatus.Ok;
};

type TabProps = {
  type: TabId;
  projects: Project[];
  threshold?: Threshold;
};

const Tab = ({ type, projects, threshold }: TabProps) => {
  const { hash } = useLocation();

  if (type === 'all') {
    return (
      <SubNav.Link href={VIEWS[type]} selected={!hash}>
        All
      </SubNav.Link>
    );
  }

  const count = projects.reduce((acc, p) => acc + p[type].totalCount, 0);
  const limit = threshold?.[type];
  const color = STATUS_TO_COLOR[limitToStatus(count, limit)];
  const title = VIEWS[type]
    .substring(1)
    .split('-')
    .map((tab) => tab[0].toUpperCase() + tab.substring(1))
    .join(' ');

  return (
    <SubNav.Link href={VIEWS[type]} selected={hash === VIEWS[type]}>
      {title}
      <Label ml={1} bg={color}>
        {count}
      </Label>
    </SubNav.Link>
  );
};

const Summary = ({ projects }: { projects: Project[] }) => {
  const { data: threshold } = useQuery(['threshold'], requests.getThreshold);

  return (
    <SubNav aria-label="Main">
      <SubNav.Links>
        {Object.keys(VIEWS).map((x) => (
          <Tab
            type={x as TabId}
            projects={projects}
            threshold={threshold}
            key={x}
          />
        ))}
      </SubNav.Links>
    </SubNav>
  );
};

const TableRow = styled(Flex).attrs({ as: 'tr', p: 3 })<{ header: boolean }>`
  background: ${({ theme, header }) =>
    header ? theme.colors.bg.secondary : theme.colors.bg.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

const TableItem = styled(Flex)`
  flex-flow: row nowrap;
  flex-grow: ${(props) => props.flexGrow || 1};
  justify-content: ${(props) => (props.flexGrow ? 'left' : 'center')};
  flex-basis: 0;
  word-break: break-word;
`;

const ViewList = ({ projects }: { projects: Project[] }) => {
  const { hash } = useLocation();

  switch (hash) {
    case VIEWS.issues:
    case VIEWS.pullRequests:
    case VIEWS.vulnerabilityAlerts:
    default:
      return (
        <BorderBox mt={3} as="table" width="100%">
          <TableRow header>
            <TableItem flexGrow={2} as="th">
              Name
            </TableItem>
            <TableItem as="th">Issues</TableItem>
            <TableItem as="th">Vulnerabilities</TableItem>
            <TableItem as="th">Pulls</TableItem>
            <TableItem as="th">Stargazers</TableItem>
          </TableRow>
          {projects.map((project: Project) => (
            <TableRow key={project.id}>
              <TableItem flexGrow={2} as="td">
                <Link fontWeight="bold" href={project.url}>
                  {project.name}
                </Link>
              </TableItem>
              <TableItem as="td">{project.issues.totalCount}</TableItem>
              <TableItem as="td">
                {project.vulnerabilityAlerts.totalCount}
              </TableItem>
              <TableItem as="td">{project.pullRequests.totalCount}</TableItem>
              <TableItem as="td">{project.stargazers.totalCount}</TableItem>
            </TableRow>
          ))}
        </BorderBox>
      );
  }
};

const Footer = () => {
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
    <>
      <Separator />
      <Flex mx={3} justifyContent="space-between">
        <Text textAlign="end" margin="small">
          Last Update:{' '}
          <b>{minutes === 0 ? 'Just now' : `${minutes} minutes`}</b>
        </Text>
        <Text as="p">
          Develop with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>{' '}
          by <Link href="http://emasuriano.com/">Ema Suriano</Link>
        </Text>
      </Flex>
    </>
  );
};

export const SimpleDashboard = () => {
  const { loading, error, data } = useProjectsQuery();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BaseStyles>
          <AppHeader />
          <Box maxWidth="large" mx="auto" p={4}>
            <Summary projects={data.projects} />
            <ViewList projects={data.projects} />
          </Box>
          <Footer />
        </BaseStyles>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
