import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  Container,
} from "reactstrap";
import UserBadge from '../UserBagde';

const AdminNavbar = (props) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UserBadge />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
