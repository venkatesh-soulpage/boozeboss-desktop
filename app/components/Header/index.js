import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Icon, Nav, Dropdown } from 'rsuite';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectIsAuthenticated, makeSelectScope, makeSelectRole } from '../../containers/App/selectors';
import { logout } from '../../containers/App/actions'

const StyledLogo = styled.img`
  max-width: 100px;
`

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    pathname: '/',
  };

  handleLogout = () => {
    const {logout} = this.props;
    logout();
  }

  validateRoles = (scopesRequired, rolesRequired) => {
    const { isAuthenticated, scope, role } = this.props;

    // If the user isn't authenticated return false
    if (!isAuthenticated) return false;

    // Validate scopes required
    if (scopesRequired.indexOf(scope) < 0 ) return false;

    // Validate roles required
    if (rolesRequired.indexOf(role) < 0) return false;

    // Anything else 
    return true
  }

  render() {
    const { isAuthenticated} = this.props;
    const { pathname } = this.state;
    return (
      <Navbar>
        <Navbar.Body>
          <Nav activeKey={pathname}>
            <Link to="/">
              <Nav.Item ><StyledLogo src={require('../../images/logo_transparent.png')} /></Nav.Item>
            </Link>
            {this.validateRoles(['ADMIN'], ['ADMIN']) && (
              <Link to="/clients">
                <Nav.Item>Clients</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND'], ['OWNER', 'MANAGER']) && (
              <Link to="/clients">
                <Nav.Item>My organization</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['AGENCY'], ['OWNER', 'MANAGER']) && (
              <Link to="/agencies">
                <Nav.Item>My organization</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['ADMIN', 'BRAND'], ['ADMIN', 'OWNER']) && (
              <Link to="/agencies">
                <Nav.Item>Agencies</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND'], ['OWNER', 'MANAGER']) && (
              <Link to="/products">
                <Nav.Item>Products</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND'], ['OWNER', 'WAREHOUSE_MANAGER']) && (
              <Link to="/stock">
                <Nav.Item>Stock</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND','AGENCY'], ['OWNER', 'MANAGER']) && (
              <Link to="/briefs">
                <Nav.Item>Briefs</Nav.Item>
              </Link>
            )} 
            
          </Nav>
          {isAuthenticated ? (
            <Nav pullRight>
              {this.validateRoles(['ADMIN'], ['ADMIN']) && (
                <Link to="/system">
                  <Nav.Item>System</Nav.Item>
                </Link>
              )} 
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
