import { useState } from 'react';
import { BorderBox, Flex, Link } from '@primer/components';
import styled from 'styled-components';
import { useProjectsQuery } from '../queries/useProjectsQuery';
import { Project, Countable } from '../types';

const TableRow = styled(Flex).attrs({ as: 'tr', p: 3 })<{
  header: boolean;
  sorted: boolean;
}>`
  background: ${({ theme, header }) =>
    header ? theme.colors.bg.secondary : theme.colors.bg.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  cursor: pointer;

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
  color: ${({ sorted, theme }) => sorted && theme.colors.label.info.text};
`;

function isCountable(prop: any): prop is Countable {
  return prop.totalCount !== undefined;
}

enum Order {
  ASC,
  DESC,
}

const sortProject =
  (sort: keyof Project | undefined, asc: Order) => (a: Project, b: Project) => {
    if (!sort) return 1;

    const valA = a[sort];
    const valB = b[sort];

    if (isCountable(valA) && isCountable(valB)) {
      return asc === Order.ASC
        ? valB.totalCount - valA.totalCount
        : valA.totalCount - valB.totalCount;
    }

    return asc === Order.ASC
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  };

export const AllProjectList = () => {
  const projectsQuery = useProjectsQuery();
  const [sort, setSort] = useState<keyof Project>();
  const [order, setOrder] = useState(Order.ASC);

  const onSort = (newSort: keyof Project) => {
    const newOrder =
      newSort === sort && order === Order.ASC ? Order.DESC : Order.ASC;

    if (newOrder !== order) setOrder(newOrder);
    if (newSort !== sort) setSort(newSort);
  };

  return (
    <BorderBox mt={3} as="table" width="100%">
      <thead>
        <TableRow header>
          <TableItem
            flexGrow={2}
            as="th"
            onClick={() => onSort('name')}
            sorted={sort === 'name'}
          >
            Name
          </TableItem>
          <TableItem
            as="th"
            onClick={() => onSort('issues')}
            sorted={sort === 'issues'}
          >
            Issues
          </TableItem>
          <TableItem
            as="th"
            onClick={() => onSort('vulnerabilityAlerts')}
            sorted={sort === 'vulnerabilityAlerts'}
          >
            Vulnerabilities
          </TableItem>
          <TableItem
            as="th"
            onClick={() => onSort('pullRequests')}
            sorted={sort === 'pullRequests'}
          >
            Pulls
          </TableItem>
          <TableItem
            as="th"
            onClick={() => onSort('stargazers')}
            sorted={sort === 'stargazers'}
          >
            Stargazers
          </TableItem>
        </TableRow>
      </thead>
      <tbody>
        {projectsQuery.data?.sort(sortProject(sort, order)).map((project) => (
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
      </tbody>
    </BorderBox>
  );
};
