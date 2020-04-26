import React from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const CardInfo = ({ label, value, icon, background }) => (
  <Col lg="6" xl="3">
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              {label}
            </CardTitle>
            <span e2e-id={label} className="h2 font-weight-bold mb-0">
              {value}
            </span>
          </div>
          <Col className="col-auto">
            <div
              className={`icon icon-shape bg-${background} text-white rounded-circle shadow`}
            >
              <i className={`fas fa-${icon}`} />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </Col>
);

const reduceAllIssues = (acc, curr) => acc + curr.issues.totalCount;
const reduceAllPullRequests = (acc, curr) => acc + curr.pullRequests.totalCount;

const Header = ({ projects, ready }) => {
  const projectsNumber = ready && projects.length;
  const issuesNumber = ready && projects.reduce(reduceAllIssues, 0);
  const pullRequestsNumber = ready && projects.reduce(reduceAllPullRequests, 0);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <CardInfo
                label="Projects"
                value={projectsNumber}
                icon="trophy"
                background="success"
              />

              <CardInfo
                label="Issues"
                value={issuesNumber}
                icon="bullhorn"
                background="warning"
              />

              <CardInfo
                label="Pull Requests"
                value={pullRequestsNumber}
                icon="list"
                background="danger"
              />
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
