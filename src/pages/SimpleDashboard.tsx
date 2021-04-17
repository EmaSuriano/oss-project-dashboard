import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  Header,
  Avatar,
  Text,
  Popover,
  StyledOcticon,
  Dropdown,
  Box,
  Heading,
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
import useUserQuery from '../hooks/useUserQuery';
import useProjectsQuery from '../hooks/useProjectsQuery';
import Project from '../types/Project';
import { Threshold } from '../types/Settings';
import styled from 'styled-components';

const VIEWS = {
  ALL: '#',
  ISSUES: '#issues',
  VULNERABILITIES: '#vulnerabilities',
  PULL_REQUESTS: '#pull-requests',
};

const Separator = () => <Box bg="border.primary" height="1px" my={2} />;

const AppHeader = () => {
  const user = useUserQuery();

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
              <Avatar
                src={user.data?.viewer.avatarUrl}
                alt={user.data?.viewer.login}
              />
              <Dropdown.Caret />
            </Box>
            <Dropdown.Menu direction="sw" mt={2}>
              <Box as="li" color="text.primary" px={3}>
                Signed in as <br />
                <b>{user.data?.viewer.login}</b>
              </Box>
              <Separator />
              <Dropdown.Item>
                <a href={user.data?.viewer.url}>Your Profile</a>
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

export const limitToStatus = (count: number, limit?: number) => {
  if (!limit) return 'label.primary.border';
  if (count >= limit) return 'label.danger.border';
  return count > limit - limit / 4
    ? 'label.warning.border'
    : 'label.success.border';
};

const Summary = ({
  projects = [],
  threshold,
}: {
  projects: Project[];
  threshold?: Threshold;
}) => {
  const { hash } = useLocation();

  const issuesCount = projects.reduce(
    (acc, { issues }) => acc + issues.totalCount,
    0,
  );

  const pullsCount = projects.reduce(
    (acc, { pullRequests }) => acc + pullRequests.totalCount,
    0,
  );

  const vulnerabilitiesCount = projects.reduce(
    (acc, { vulnerabilityAlerts }) => acc + vulnerabilityAlerts.totalCount,
    0,
  );

  return (
    <SubNav aria-label="Main">
      <SubNav.Links>
        <SubNav.Link href={VIEWS.ALL} selected={!hash}>
          All
        </SubNav.Link>
        <SubNav.Link href={VIEWS.ISSUES} selected={hash === VIEWS.ISSUES}>
          Issues
          <Label ml={1} bg={limitToStatus(issuesCount, threshold?.issues)}>
            {issuesCount}
          </Label>
        </SubNav.Link>
        <SubNav.Link
          href={VIEWS.VULNERABILITIES}
          selected={hash === VIEWS.VULNERABILITIES}
        >
          Vulnerabilities
          <Label
            ml={1}
            bg={limitToStatus(vulnerabilitiesCount, threshold?.vulnerabilities)}
          >
            {vulnerabilitiesCount}
          </Label>
        </SubNav.Link>
        <SubNav.Link
          href={VIEWS.PULL_REQUESTS}
          selected={hash === VIEWS.PULL_REQUESTS}
        >
          Pull Requests
          <Label ml={1} bg={limitToStatus(pullsCount, threshold?.pullRequests)}>
            {pullsCount}
          </Label>
        </SubNav.Link>
      </SubNav.Links>
    </SubNav>
  );
};

const TableRow = styled(Flex)<{ header: boolean }>`
  background: ${({ theme, header }) =>
    header ? theme.colors.bg.secondary : theme.colors.bg.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

const ViewList = ({ projects = [] }: { projects: Project[] }) => {
  const { hash } = useLocation();

  switch (hash) {
    case VIEWS.ISSUES:
    case VIEWS.PULL_REQUESTS:
    case VIEWS.VULNERABILITIES:
    default:
      return (
        <BorderBox mt={3}>
          <TableRow flexWrap="nowrap" p={3} header>
            <Box flexGrow={4}>Name</Box>
            <Box flexGrow={1}>Issues</Box>
            <Box flexGrow={1}>Vulnerabilities</Box>
            <Box flexGrow={1}>Pulls</Box>
            <Box flexGrow={1}>Stargazers</Box>
          </TableRow>
          {projects.map((project: Project) => (
            <React.Fragment key={project.id}>
              <Box bg="border.primary" height="1px" />
              <TableRow flexWrap="nowrap" p={3}>
                <Box flexGrow={4}>
                  <Link fontWeight="bold" href={project.url}>
                    {project.name}
                  </Link>
                </Box>
                <Box flexGrow={1}>{project.issues.totalCount}</Box>
                <Box flexGrow={1}>{project.vulnerabilityAlerts.totalCount}</Box>
                <Box flexGrow={1}>{project.pullRequests.totalCount}</Box>
                <Box flexGrow={1}>{project.stargazers.totalCount}</Box>
              </TableRow>
            </React.Fragment>
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
      <BaseStyles>
        <Apollo>
          <AppHeader />
          <Box maxWidth="large" mx="auto" p={4}>
            <Summary
              projects={data.projects}
              threshold={data.settings.threshold}
            />
            <ViewList projects={data.projects} />
          </Box>
          <Footer />
        </Apollo>
      </BaseStyles>
    </ThemeProvider>
  );
};
