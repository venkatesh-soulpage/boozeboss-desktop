/**
 *
 * ClientContainer
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
import { makeSelectAgencies, makeSelectRoles, makeSelectError, makeSelectSuccess, makeSelectIsLoading, makeSelectClients } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { AgenciesContainer } from './components';
import { addAgencyDraft, getAgencies, inviteAgency, inviteCollaborator, dismiss, getRoles, revokeCollaboratorInvitation, getClients } from './actions';
import { makeSelectScope, makeSelectRole } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class AgencyContainer extends React.Component {
  componentDidMount = () => {
    const { getAgencies, getRoles, getClients, scope } = this.props;
    getAgencies();
    getRoles();

    // Only ask for clients if is an admin or organization
    if (scope === 'REGION' || scope === 'ADMIN') {
      getClients();
    } 
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Agencies</title>
          <meta name="description" content="Description of Agencies" />
        </Helmet>
        <AgenciesContainer {...this.props} />
      </div>
    );
  }
}

AgencyContainer.propTypes = {
  agencies: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  scope: PropTypes.string,
  role: PropTypes.role,
  roles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  success: PropTypes.string,
  getAgencies: PropTypes.func.isRequired,
  addAgencyDraft: PropTypes.func.isRequired,
  inviteAgency: PropTypes.func.isRequired,
  inviteCollaborator: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  agencies: makeSelectAgencies(),
  clients: makeSelectClients(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
  roles: makeSelectRoles(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
  isLoading: makeSelectIsLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    getAgencies: () => dispatch(getAgencies()),
    getClients: () => dispatch(getClients()),
    addAgencyDraft: () => dispatch(addAgencyDraft()),
    inviteAgency: agency => dispatch(inviteAgency(agency)),
    inviteCollaborator: collaborator => dispatch(inviteCollaborator(collaborator)),
    revokeCollaboratorInvitation: collaborator_invitation_id => dispatch(revokeCollaboratorInvitation(collaborator_invitation_id)),
    getRoles: () => dispatch(getRoles()),
    dismiss: (type) => dispatch(dismiss(type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'agencies', reducer });
const withSaga = injectSaga({ key: 'agencies', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AgencyContainer);
