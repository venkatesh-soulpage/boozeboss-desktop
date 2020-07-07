import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Icon, Nav, Dropdown } from 'rsuite';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectIsAuthenticated, makeSelectScope, makeSelectRole, makeSelectUser } from '../../containers/App/selectors';
import { logout, getUser } from '../../containers/App/actions'

const StyledLogo = styled.img`
  max-width: 100px;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: -0.5em 0 0 0;
`

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    pathname: '/',
  };


  componentDidMount = () => {
    const {getUser} = this.props;
    getUser();
  }

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
    const { isAuthenticated, user, scope, role } = this.props;
    const { pathname } = this.state;
    return (
      <Navbar>
        <Navbar.Body>
          <Nav activeKey={pathname}>
            <Link to="/">
              <Nav.Item ><StyledLogo src={require('../../images/logo_transparent.png')} /></Nav.Item>
            </Link>
            {this.validateRoles(['REGION', 'BRAND'], ['OWNER', 'MANAGER']) && (
              <Link to="/dashboard">
                <Nav.Item>Live Events</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['ADMIN', 'REGION'], ['ADMIN', 'OWNER', 'MANAGER']) && (
              <Link to="/organizations">
                <Nav.Item>Organizations</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['ADMIN', 'REGION'], ['ADMIN', 'OWNER', 'MANAGER']) && (
              <Link to="/teams">
                <Nav.Item>Teams</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND'], ['OWNER', 'MANAGER']) && (
              <Link to="/teams">
                <Nav.Item>My Team</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['AGENCY'], ['OWNER', 'MANAGER']) && (
              <Link to="/agencies">
                <Nav.Item>My organization</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['ADMIN','REGION', 'BRAND'], ['ADMIN', 'OWNER', 'MANAGER']) && (
              <Link to="/agencies">
                <Nav.Item>Agencies</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['ADMIN'], ['ADMIN']) && (
              <Link to="/verification">
                <Nav.Item>Verify Users</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND', 'AGENCY'], ['OWNER', 'MANAGER', 'WAREHOUSE_MANAGER']) && (
              <Link to="/products">
                <Nav.Item>Products</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND'], ['OWNER', 'WAREHOUSE_MANAGER']) && (
              <Link to="/stock">
                <Nav.Item>Inventory</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND','AGENCY'], ['OWNER', 'MANAGER']) && (
              <Link to="/briefs">
                <Nav.Item>Briefs</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['BRAND','AGENCY'], ['OWNER', 'MANAGER', 'WAREHOUSE_MANAGER']) && (
              <Link to="/requisitions">
                <Nav.Item>Requisitions</Nav.Item>
              </Link>
            )} 
            {this.validateRoles(['AGENCY'], ['OWNER', 'MANAGER']) && (
              <Link to="/events">
                <Nav.Item>Events</Nav.Item>
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
              <Dropdown 
                title={
                  <TitleSection>
                    <b>{user ? `${user.first_name} ${user.last_name}` : 'More'}</b>
                    <p>{scope} {role} {user && user.wallet && <span>{`(${user.wallet.balance})` }<Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/></span>}</p>
                  </TitleSection>
                  
                }
                placement="bottomEnd"
              >
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
  user: makeSelectUser()
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUser())
})


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Header);
