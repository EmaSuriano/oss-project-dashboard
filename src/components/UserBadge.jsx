import React from 'react';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import auth from '../auth';

const USER_INFO = gql`
  query {
    viewer {
      login
      avatarUrl
      url
      email
    }
  }
`;

const UserBadge = () => {
  const { loading, error, data } = useQuery(USER_INFO);
  const loaded = !(loading || error);

  return (
    loaded && (
      <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img alt="avatar" src={data.viewer.avatarUrl} />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
                {data.viewer.login}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem href={data.viewer.url} tag="a" target="_blank">
            <i className="ni ni-single-02" />
            <span>Github Profile</span>
          </DropdownItem>
          <DropdownItem href={`mailto: ${data.viewer.email}`} tag="a">
            <i className="ni ni-email-83" />
            <span>Contact me</span>
          </DropdownItem>
          {!auth.isFixedToken && (
            <DropdownItem href="#" onClick={() => auth.signOut()} tag="a">
              <i className="ni ni-support-16" />
              <span>Log out</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  );
};

export default UserBadge;
