import React from 'react'
import {
  Badge,
  Media,
  Table,
  Spinner,
  UncontrolledTooltip
} from "reactstrap";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const ProjectInfo = `
  id
  pullRequests(first: 99, states:OPEN){
    totalCount
  }
  issues(first: 100, states:OPEN) {
    totalCount
  }
  homepageUrl
  url
  name
  stargazers(first:5) {
    totalCount
    nodes {
      id
      name
      avatarUrl
    }
  }
`;

const buildRepositoriesQuery = projects => {
  const projectQueries = projects.map(name => {
    const key = name.replace(/-/g, '')
    return `${key}: repository(name: "${name}") {
      ${ProjectInfo}
    }`;
  });


  return gql`
  query { 
    viewer { 
      ${projectQueries.join('\n')}
    }
  }
`
}

const BadgeCount = ({ count }) => {
  const color = count >= 6 && 'danger' || count >= 3 && 'warning' || 'success'; //eslint-disable-line

  return (<Badge color="" className="badge-dot badge-md mr-4">
    <i className={`bg-${color}`} />
    {count}
  </Badge>)
}

const GithubTable = ({ projects }) => {
  const { error, loading, data } = useQuery(buildRepositoriesQuery(projects))
  if (loading) return <Spinner size="sm" color="primary" />;
  if (error) return <h3>Something happen ...</h3>

  const projectsData = projects.map(name => data.viewer[name.replace(/-/g, '')]).filter(Boolean);
  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Project</th>
          <th scope="col">Issues</th>
          <th scope="col">Pull Requests</th>
          <th scope="col">Stargazers</th>
        </tr>
      </thead>
      <tbody>
        {projectsData.map(project => (
          <tr key={project.id}>
            <th scope="row">
              <Media className="align-items-center">
                <a className="mb-0 text-sm" href={project.url}>
                  {project.name}
                </a>
              </Media>
            </th>
            <td><BadgeCount count={project.issues.totalCount} /></td>
            <td>
              <BadgeCount count={project.pullRequests.totalCount} />
            </td>
            <td>
              <Media className="align-items-center">
                <span className="avatar-group">
                  {project.stargazers.nodes.map((user, i) => (
                    [
                      <a
                        className="avatar avatar-sm"
                        href="#pablo"
                        id={`tooltip_${i}`}
                        onClick={e => e.preventDefault()}
                      >
                        <img
                          alt={user.name}
                          className="rounded-circle"
                          src={user.avatarUrl}
                        />
                      </a>,
                      <UncontrolledTooltip
                        delay={0}
                        target={`tooltip_${i}`}
                      >
                        {user.name}
                      </UncontrolledTooltip>
                    ]))}
                </span>

                {project.stargazers.totalCount - project.stargazers.nodes.length > 0 &&
                  <span className="mb-0 text-sm">
                    + {project.stargazers.totalCount - project.stargazers.nodes.length}
                  </span>
                }
              </Media>
            </td>
          </tr>
        ))}

      </tbody>
    </Table>

  )
}


export default GithubTable