import { BorderBox, Flex, Link } from '@primer/components';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { VIEWS } from '../constants';
import { useProjectsQuery } from '../queries/useProjectsQuery';

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

export const ViewList = () => {
  const { hash } = useLocation();
  const projectsQuery = useProjectsQuery();

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
          {projectsQuery.data?.map((project) => (
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
