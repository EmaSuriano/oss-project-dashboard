import { useState } from 'react';
import { Box, Link, Avatar } from '@primer/components';
import { useProjectsQuery } from '../queries/useProjectsQuery';
import { Project, Order, PullRequest } from '../types';
import { VIEWS } from '../constants';
import { sortData } from '../helpers/sort';
import { formatDate } from '../helpers/date';
import { TableRow, TableItem, LoadingRow } from './Table';
import { useLocation } from 'react-router-dom';
import { TableHeader, TableHeaderItem } from './TableHeader';
import { usePullRequestsQuery } from '../queries/usePullRequestsQuery';

export const AllProjectList = () => {
  const projectsQuery = useProjectsQuery();
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState(Order.ASC);

  const onChangeSort = (newSort: string, newOrder: Order) => {
    if (newOrder !== order) setOrder(newOrder);
    if (newSort !== sort) setSort(newSort);
  };

  const renderProjectRow = (project: Project) => (
    <TableRow key={project.id}>
      <TableItem flexGrow={2} as="td">
        <Link fontWeight="bold" href={project.url}>
          {project.name}
        </Link>
      </TableItem>
      <TableItem as="td">{project.issues.totalCount}</TableItem>
      <TableItem as="td">{project.vulnerabilityAlerts.totalCount}</TableItem>
      <TableItem as="td">{project.pullRequests.totalCount}</TableItem>
      <TableItem as="td">{project.stargazers.totalCount}</TableItem>
    </TableRow>
  );

  return (
    <Box
      as="table"
      width="100%"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.primary"
      borderRadius={2}
    >
      <thead>
        <TableHeader onChange={onChangeSort} order={order} sort={sort}>
          <TableHeaderItem flexGrow={2} name="name" label="Name" />
          <TableHeaderItem name="issues" label="Issues" />
          <TableHeaderItem name="vulnerabilityAlerts" label="Vulnerabilities" />
          <TableHeaderItem name="pullRequests" label="Pulls" />
          <TableHeaderItem name="stargazers" label="Stars" />
        </TableHeader>
      </thead>
      <tbody>
        {projectsQuery.isFetched ? (
          projectsQuery.data?.sort(sortData(sort, order)).map(renderProjectRow)
        ) : (
          <LoadingRow />
        )}
      </tbody>
    </Box>
  );
};

export const PullRequestList = () => {
  const pullRequestsQuery = usePullRequestsQuery();
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState(Order.ASC);

  const onChangeSort = (newSort: string, newOrder: Order) => {
    if (newOrder !== order) setOrder(newOrder);
    if (newSort !== sort) setSort(newSort);
  };

  const renderPullRequestRow = (pullRequest: PullRequest) => (
    <TableRow key={pullRequest.id}>
      <TableItem flexGrow={2} as="td">
        <Link fontWeight="bold" href={pullRequest.url}>
          {pullRequest.title}
        </Link>
      </TableItem>
      <TableItem as="td">
        <Link fontWeight="bold" href={`${pullRequest.repository.url}/pulls`}>
          {pullRequest.repository.name}
        </Link>
      </TableItem>
      <TableItem as="td">{pullRequest.project}</TableItem>
      <TableItem as="td">{formatDate(pullRequest.createdAt)}</TableItem>
      <TableItem as="td">
        <Avatar
          src={pullRequest.author.avatarUrl}
          alt={pullRequest.author.login}
        />
      </TableItem>
    </TableRow>
  );

  return (
    <Box
      as="table"
      width="100%"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.primary"
      borderRadius={2}
    >
      <thead>
        <TableHeader onChange={onChangeSort} order={order} sort={sort}>
          <TableHeaderItem flexGrow={2} name="title" label="Title" />
          <TableHeaderItem name="repository" label="Repository" />
          <TableHeaderItem name="createdAt" label="Created" />
          <TableHeaderItem name="author" label="Author" />
        </TableHeader>
      </thead>
      <tbody>
        {pullRequestsQuery.isFetched ? (
          pullRequestsQuery.data
            ?.sort(sortData(sort, order))
            .map(renderPullRequestRow)
        ) : (
          <LoadingRow />
        )}
      </tbody>
    </Box>
  );
};

export const ResultTable = () => {
  const location = useLocation();

  switch (location.hash.replace('#', '')) {
    case VIEWS.all:
      return <AllProjectList />;
    case VIEWS.pullRequests:
      return <PullRequestList />;
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
