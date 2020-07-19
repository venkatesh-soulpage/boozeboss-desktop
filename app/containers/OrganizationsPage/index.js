/**
 *
 * OrganizationsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectSuccess, makeSelectError, makeSelectLocations, makeSelectRoles, makeSelectOrganizations} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { OrganizationsContainer } from './components'
import { 
  getOrganizations, 
  addOrganizationDraft, 
  getLocations, 
  inviteOrganization, 
  resendInviteCollaborator, 
  selectPrimaryLocation, 
  updateSla, 
  getRoles, 
  inviteCollaborator, 
  revokeCollaboratorInvitation,
  addCollaboratorCredits,
  updateCollaboratorLocation,
  getVerificationLogs
} from './actions';
import { makeSelectScope, makeSelectRole } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class OrganizationsPage extends React.Component {

  componentDidMount = () => {
    const {getOrganizations, getLocations, getRoles} = this.props;
    getRoles();
    getOrganizations();
    getLocations();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Organizations</title>
          <meta name="description" content="Description of OrganizationsPage" />
        </Helmet>
        <OrganizationsContainer 
          {...this.props}
        />
      </div>
    );
  }
}

OrganizationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
  locations: makeSelectLocations(),
  roles: makeSelectRoles()
});

function mapDispatchToProps(dispatch) {
  return {  
    addOrganizationDraft: () => dispatch(addOrganizationDraft()),
    getOrganizations: () => dispatch(getOrganizations()),
    getLocations: () => dispatch(getLocations()),
    inviteOrganization: (organization) => dispatch(inviteOrganization(organization)),
    resendInviteCollaborator: (collaborator_invitation_id) => dispatch(resendInviteCollaborator(collaborator_invitation_id)),
    selectPrimaryLocation: (regional_organization_id, regional_organization_location_id) => dispatch(selectPrimaryLocation(regional_organization_id, regional_organization_location_id)),
    updateSla: (regional_organization_id, sla) => dispatch(updateSla(regional_organization_id, sla)),
    getVerificationLogs: (regional_organization_id) => dispatch(getVerificationLogs(regional_organization_id)),
    getRoles: () => dispatch(getRoles()),
    inviteCollaborator: (collaborator) => dispatch(inviteCollaborator(collaborator)),
    revokeCollaboratorInvitation: (collaborator_invitation_id) => dispatch(revokeCollaboratorInvitation(collaborator_invitation_id)),
    addCollaboratorCredits: (collaborator_account_id, credits_amount) => dispatch(addCollaboratorCredits(collaborator_account_id, credits_amount)),
    updateCollaboratorLocation: (regional_organization_id, collaborator_id, location_id) => dispatch(updateCollaboratorLocation(regional_organization_id, collaborator_id, location_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationsPage);
