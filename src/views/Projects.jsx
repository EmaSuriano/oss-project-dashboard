import React from 'react';
import { Card, CardHeader, Container, CardBody, Row } from 'reactstrap';
import Header from 'components/Projects/Header.jsx';
import Table from 'components/Projects/Table.jsx';
import getProjects from '../queries/getProjects';

const Error = ({ error }) => (
  <CardBody>
    <h4>Something happened ...</h4>
    <code>{typeof error === 'string' ? error : JSON.stringify(error)}</code>
  </CardBody>
);

const Projects = () => {
  const { error, loading, data: projects } = getProjects();

  return (
    <>
      <Header projects={projects} />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Project List</h3>
              </CardHeader>
              {error ? (
                <Error error={error} />
              ) : (
                <Table projects={projects} loading={loading} />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Projects;
