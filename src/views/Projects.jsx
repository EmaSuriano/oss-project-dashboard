import React from 'react';
import { Card, CardHeader, Container, CardBody, Row } from 'reactstrap';
import Header from 'components/Projects/Header.jsx';
import Table from 'components/Projects/Table.jsx';
import getProjectList from '../queries/getProjectList';

const Projects = () => {
  const { error, projects } = getProjectList();

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
                <CardBody>
                  {error && (
                    <h4>Something happened ...${JSON.stringify(error)}</h4>
                  )}
                </CardBody>
              ) : (
                <Table projects={projects} />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Projects;
