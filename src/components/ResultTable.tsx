import { useMemo, FC } from 'react';
import { Box, Link, Avatar, Truncate } from '@primer/components';
import { useProjectsQuery } from '../queries/useProjectsQuery';
import { Project, PullRequest } from '../types';
import { VIEWS } from '../constants';
import { useLocation } from 'react-router-dom';
import { ReactTable } from './ReactTable';
import { usePullRequestsQuery } from '../queries/usePullRequestsQuery';
import { Column } from 'react-table';
import { formatDate } from '../helpers/date';

const CenteredCell: FC<{ value?: any }> = ({ value = null, children }) => (
  <Box display="flex" justifyContent="center">
    {value !== null ? value : children}
  </Box>
);

export const AllProjectTable = () => {
  const projectsQuery = useProjectsQuery();

  const columns: Column<Project>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value, row }) => (
          <Truncate title={value} maxWidth={180}>
            <Link fontWeight="bold" href={row.original.url} target="_blank">
              {value}
            </Link>
          </Truncate>
        ),
      },
      {
        Header: 'Issues',
        accessor: (row) => row.issues.totalCount,
        Cell: CenteredCell,
      },
      {
        Header: 'Vulnerabilities',
        accessor: (row) => row.vulnerabilityAlerts.totalCount,
        Cell: CenteredCell,
      },
      {
        Header: 'Pulls',
        accessor: (row) => row.pullRequests.totalCount,
        Cell: CenteredCell,
      },
      {
        Header: 'Status',
        accessor: 'url',
        Cell: ({ value }) => (
          <CenteredCell>
            <img
              src={`${value}/actions/workflows/master.yml/badge.svg`}
              alt="Build"
            />
          </CenteredCell>
        ),
      },
    ],
    [],
  );

  return (
    <ReactTable
      data={projectsQuery.data || []}
      status={projectsQuery.status}
      columns={columns}
    />
  );
};

export const PullRequestTable = () => {
  const pullRequestsQuery = usePullRequestsQuery();

  const columns: Column<PullRequest>[] = useMemo(
    () => [
      {
        Header: 'Pull Request',
        accessor: 'title',
        Cell: ({ value, row }) => (
          <Truncate title={value} maxWidth={400}>
            <Avatar
              alt={row.original.author.login}
              src={row.original.author.avatarUrl}
            />
            <Link
              ml={2}
              fontWeight="bold"
              href={row.original.url}
              target="_blank"
            >
              {value}
            </Link>
          </Truncate>
        ),
      },
      {
        Header: 'Created Date',
        accessor: (row) => formatDate(row.createdAt),
        Cell: CenteredCell,
      },
    ],
    [],
  );

  return (
    <ReactTable
      data={pullRequestsQuery.data || []}
      status={pullRequestsQuery.status}
      columns={columns}
    />
  );
};

export const ResultTable = () => {
  const location = useLocation();

  switch (location.hash.replace('#', '')) {
    case VIEWS.all:
      return <AllProjectTable />;
    case VIEWS.pullRequests:
      return <PullRequestTable />;
    case VIEWS.issues:
    case VIEWS.vulnerabilityAlerts:
    default:
      return (
        <Box color="text.secondary" bg="bg.tertiary" p={3}>
          This page is currently in progress ...
        </Box>
      );
  }
};
