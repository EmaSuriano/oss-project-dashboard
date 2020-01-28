import React from 'react'
import {
  Badge,
  Media,
  Table,
  UncontrolledTooltip
} from "reactstrap";

const Loader = () => <div className="loading" />

const BadgeCount = ({ count }) => {
  const color = count >= 6 && 'danger' || count >= 3 && 'warning' || 'success'; //eslint-disable-line

  return (<Badge color="" className="badge-dot badge-md mr-4">
    <i className={`bg-${color}`} />
    {count}
  </Badge>)
}

const GithubTable = ({ projects, loading }) => {

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Issues</th>
          <th scope="col">Vulnerabilities</th>
          <th scope="col">Pull Requests</th>
          <th scope="col">Stargazers</th>
        </tr>
      </thead>
      <tbody>
        {loading && <tr >
          <td colspan="5">
            <Media className="align-items-center" style={{ justifyContent: 'center' }}>
              <Loader />
            </Media>
          </td>
        </tr>}
        {projects.map(project => (
          <tr key={project.id}>
            <th scope="row">
              <Media className="align-items-center">
                <a className="mb-0 text-sm" href={project.url}>
                  {project.name}
                </a>
              </Media>
            </th>
            <td><BadgeCount count={project.issues.totalCount} /></td>
            <td><BadgeCount count={project.vulnerabilityAlerts.totalCount} /></td>
            <td>
              <BadgeCount count={project.pullRequests.totalCount} />
            </td>
            <td>
              <Media className="align-items-center">
                <span className="avatar-group">
                  {project.stargazers.nodes.map((user, i) => (
                    <React.Fragment key={user.id}>
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
                      </a>
                      <UncontrolledTooltip
                        delay={0}
                        target={`tooltip_${i}`}
                      >
                        {user.name}
                      </UncontrolledTooltip>
                    </React.Fragment>
                  ))}
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