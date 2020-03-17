import React from 'react';

// reactstrap components
import { Row, Col } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { isQueryReady } from '../../utils/queries';
import auth from '../../auth';

const USER_INFO = gql`
  query {
    viewer {
      name
      updatedAt
      url
    }
  }
`;

const YearName = ({ data }) => (
  <div className="copyright text-center text-xl-left text-muted">
    © {new Date(data.viewer.updatedAt).getFullYear()}{' '}
    <a
      className="font-weight-bold ml-1"
      href={data.viewer.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {data.viewer.name}
    </a>
  </div>
);

const Footer = () => {
  const userInfoQuery = useQuery(USER_INFO, { skip: !auth.isAuthenticated });
  const twoColumn = auth.isAuthenticated;
  return (
    <footer className="py-5 m-4">
      <Row className="align-items-center justify-content-xl-between">
        {isQueryReady(userInfoQuery) && (
          <Col xl={twoColumn ? '6' : '12'}>
            <YearName {...userInfoQuery} />
          </Col>
        )}

        <Col xl={twoColumn ? '6' : '12'}>
          <div className="copyright text-center text-xl-right text-muted">
            Built with ❤️ by
            <a
              className="font-weight-bold ml-1"
              href="https://github.com/EmaSuriano"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ema Suriano
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
