import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Icon, Nav, Dropdown } from 'rsuite';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectIsAuthenticated, makeSelectScope, makeSelectRole } from '../../containers/App/selectors';
import { logout } from '../../containers/App/actions'

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    pathname: '/',
  };

  handleLogout = () => {
    const {logout} = this.props;
    logout();
  }

  render() {
    const { isAuthenticated, scope, role } = this.props;
    const { pathname } = this.state;
    return (
      <Navbar>
        <Navbar.Body>
          <Nav activeKey={pathname}>
            <Link to="/">
              <Nav.Item icon={<Icon icon="glass" />}>Booze Boss</Nav.Item>
            </Link>
            {isAuthenticated && scope === 'ADMIN' && role === 'ADMIN' && (
              <Link to="/clients">
                <Nav.Item>Clients</Nav.Item>
              </Link>
            )} 
          </Nav>
          {isAuthenticated ? (
            <Nav pullRight>
              <Dropdown title="More" placement="bottomStart">
                <Dropdown.Item onSelect={this.handleLogout}>
                  Logout
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
  scope: PropTypes.string,
  role: PropTypes.role,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Header);
