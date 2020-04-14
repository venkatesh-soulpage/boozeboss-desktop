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
import { makeSelectClients, makeSelectRoles, makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { ClientsContainer } from './components';
import { addClientDraft, getClients, inviteClient, getRoles, inviteCollaborator, dismiss } from './actions';
import { makeSelectScope, makeSelectRole } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class ClientContainer extends React.Component {
  componentDidMount = () => {
    const { getClients, getRoles } = this.props;
    getClients();
    getRoles();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>ClientContainer</title>
          <meta name="description" content="Description of ClientContainer" />
        </Helmet>
        <ClientsContainer {...this.props} />
      </div>
    );
  }
}

ClientContainer.propTypes = {
  clients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  roles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  getClients: PropTypes.func.isRequired,
  addClientDraft: PropTypes.func.isRequired,
  inviteClient: PropTypes.func.isRequired,
  inviteCollaborator: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  scope: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectClients(),
  roles: makeSelectRoles(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    getClients: () => dispatch(getClients()),
    addClientDraft: () => dispatch(addClientDraft()),
    inviteClient: client => dispatch(inviteClient(client)),
    inviteCollaborator: collaborator => dispatch(inviteCollaborator(collaborator)),
    getRoles: () => dispatch(getRoles()),
    dismiss: type => dispatch(dismiss(type))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'clients', reducer });
const withSaga = injectSaga({ key: 'clients', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClientContainer);
