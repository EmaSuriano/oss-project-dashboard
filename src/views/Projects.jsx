import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Projects/Header.jsx";
import Table from "components/Projects/Table.jsx";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import projects from '../projects.js';

const ProjectInfo = `
  id
  url
  name
  pullRequests(first: 1, states:OPEN){
    totalCount
  }
  vulnerabilityAlerts(first: 1) {
    totalCount
  }
  issues(first: 1, states:OPEN) {
    totalCount
  }
  stargazers(first:5) {
    totalCount
    nodes {
      id
      name
      avatarUrl
    }
  }
`;

const REPOSITORIES_QUERY = gql`
query { 
  viewer { 
    ${projects.list.map(name => `${name.replace(/-/g, '')}: repository(name: "${name}") {
      ${ProjectInfo}
    }`).join('\n')}
  }
}
`

const Projects = () => {
  const { error, loading, data } = useQuery(REPOSITORIES_QUERY)

  const projectsData = projects.list
    .map(name => !(error || loading) && data.viewer[name.replace(/-/g, '')])
    .filter(Boolean);

  return (
    <>
      <Header projects={projectsData} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Project List</h3>
              </CardHeader>
              <Table projects={projectsData} loading={loading} />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Projects;
