import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Icon, Nav, Dropdown } from 'rsuite';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    pathname: '/',
  };

  render() {
    const { isAuthenticated } = this.props;
    const { pathname } = this.state;
    return (
      <Navbar>
        <Navbar.Body>
          <Nav activeKey={pathname}>
            <Link to="/">
              <Nav.Item icon={<Icon icon="glass" />}>Booze Boss</Nav.Item>
            </Link>
          </Nav>
          {isAuthenticated ? (
            <Nav pullRight>
              <Dropdown title="more" placement="bottomEnd">
                <Dropdown.Item onSelect={this.handleLogout}>
                  logout
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          ) : (
            <Nav pullRight>
              <Link to="/login">
                <Nav.Item icon={<Icon icon="user" />}>Login</Nav.Item>
              </Link>
              <Link to="/signup">
                <Nav.Item icon={<Icon icon="user" />}>Signup</Nav.Item>
              </Link>
            </Nav>
          )}
        </Navbar.Body>
      </Navbar>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};
