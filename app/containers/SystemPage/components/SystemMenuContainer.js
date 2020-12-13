import React, { Component } from 'react';
import { Sidenav, Nav, Icon } from 'rsuite';
import styled from 'styled-components';
import LocationsPage from './LocationsPage';
import OutletManagerInvite from './OutletManagerInvite';

const SystemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em;
`;

const StyledSidenav = styled(Sidenav)`
  flex: 1;
`;

const SystemConfigurations = styled.div`
  flex: 4;
  margin: 0 0 0 1em;
`;

export default class SystemMenuContainer extends Component {
  state = {
    key: '1',
  };

  handleNav = key => {
    this.setState({ key });
  };

  render() {
    const { key } = this.state;
    return (
      <SystemContainer>
        <StyledSidenav activeKey={key}>
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                eventKey="1"
                active
                icon={<Icon icon="globe" />}
                onClick={() => this.handleNav('1')}
              >
                Locations
              </Nav.Item>
              <Nav.Item
                eventKey="2"
                icon={<Icon icon="credit-card" />}
                onClick={() => this.handleNav('2')}
              >
                Payments
              </Nav.Item>
              <Nav.Item
                eventKey="3"
                icon={<Icon icon="credit-card" />}
                onClick={() => this.handleNav('3')}
              >
                Invite Outlet Managers
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </StyledSidenav>
        <SystemConfigurations>
          {key === '1' && <LocationsPage {...this.props} />}
          {key === '3' && <OutletManagerInvite {...this.props} />}
        </SystemConfigurations>
      </SystemContainer>
    );
  }
}
