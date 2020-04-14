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
import { makeSelectAgencies, makeSelectRoles, makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { AgenciesContainer } from './components';
import { addAgencyDraft, getAgencies, inviteAgency, inviteCollaborator, dismiss, getRoles } from './actions';
import { makeSelectScope, makeSelectRole } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class AgencyContainer extends React.Component {
  componentDidMount = () => {
    const { getAgencies, getRoles } = this.props;
    getAgencies();
    getRoles();
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
  scope: makeSelectScope(),
  role: makeSelectRole(),
  roles: makeSelectRoles(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAgencies: () => dispatch(getAgencies()),
    addAgencyDraft: () => dispatch(addAgencyDraft()),
    inviteAgency: agency => dispatch(inviteAgency(agency)),
    inviteCollaborator: collaborator => dispatch(inviteCollaborator(collaborator)),
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
