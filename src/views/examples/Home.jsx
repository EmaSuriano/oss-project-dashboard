import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Projects/Header.jsx";
import Table from "components/Projects/Table.jsx";
import projects from '../../projects';

const Tables = () => {
  return (
    <>
      <Header projects={projects.list} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Project List</h3>
              </CardHeader>
              <Table projects={projects.list} />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Tables;
