/**
 *
 * BriefPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBriefs, makeSelectSuccess, makeSelectError, makeSelectVenues, makeSelectAgencies, makeSelectProducts} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { BriefsContainer } from './components';
import { makeSelectScope, makeSelectRole } from '../App/selectors';
import { addBriefDraft, getBriefs, createBrief, deleteBrief, dismiss, deleteBriefDraft, getVenues, createBriefEvent, updateBriefStatus, getAgencies, createBriefProduct, getProducts, deleteBriefProduct, createRequisition, uploadBriefAttachment, deleteBriefAttachment, updateBriefEvent, deleteBriefEvent } from './actions';



/* eslint-disable react/prefer-stateless-function */
export class BriefPage extends React.Component {
  
  componentDidMount = () => {
    const {getBriefs, getVenues, getAgencies, getProducts, scope} = this.props;
    getBriefs();
    
    if (scope === 'BRAND') {
      getVenues();
      getAgencies();
      getProducts();
    }
  }
  
  render() {
    return (
      <div>
        <BriefsContainer 
          {...this.props}
        />
      </div>
    );
  }
}

BriefPage.propTypes = {
  briefs: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  venues: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  products: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  addBriefDraft: PropTypes.func.isRequired,
  deleteBriefDraft: PropTypes.func.isRequired,
  getBriefs: PropTypes.func.isRequired, 
  getVenues: PropTypes.func.isRequired, 
  createBrief: PropTypes.func.isRequired, 
  createBriefProduct: PropTypes.func.isRequired, 
  deleteBriefProduct: PropTypes.func.isRequired, 
  updateBriefStatus: PropTypes.func.isRequired,
  createBriefEvent: PropTypes.func.isRequired,
  deleteBrief: PropTypes.func.isRequired, 
  dismiss: PropTypes.func.isRequired, 
};

const mapStateToProps = createStructuredSelector({
  scope: makeSelectScope(),
  role: makeSelectRole(),
  briefs: makeSelectBriefs(),
  agencies: makeSelectAgencies(),
  venues: makeSelectVenues(),
  products: makeSelectProducts(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    addBriefDraft: () => dispatch(addBriefDraft()),
    deleteBriefDraft: () => dispatch(deleteBriefDraft()),
    getBriefs: () => dispatch(getBriefs()),
    getVenues: () => dispatch(getVenues()),
    getProducts: () => dispatch(getProducts()),
    getAgencies: () => dispatch(getAgencies()),
    createBrief: (brief) => dispatch(createBrief(brief)),
    deleteBrief: (brief_id) => dispatch(deleteBrief(brief_id)),
    createBriefEvent: (brief_id, briefEvent) => dispatch(createBriefEvent(brief_id, briefEvent)),
    updateBriefEvent: (brief_id, brief_event_id, briefEvent) => dispatch(updateBriefEvent(brief_id, brief_event_id, briefEvent)),
    deleteBriefEvent: (brief_id, brief_event_id) => dispatch(deleteBriefEvent(brief_id, brief_event_id)),
    createBriefProduct: (brief_id, briefProduct) => dispatch(createBriefProduct(brief_id, briefProduct)),
    deleteBriefProduct: (brief_id, brief_product_id) => dispatch(deleteBriefProduct(brief_id, brief_product_id)),
    updateBriefStatus: (brief_id, status) => dispatch(updateBriefStatus(brief_id, status)),
    createRequisition: (brief_id) => dispatch(createRequisition(brief_id)),
    uploadBriefAttachment: (brief_id, file) => dispatch(uploadBriefAttachment(brief_id, file)),
    deleteBriefAttachment: (brief_id, brief_attachment_id) => dispatch(deleteBriefAttachment(brief_id, brief_attachment_id)),
    dismiss: (dismiss_type) => dispatch(dismiss(dismiss_type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'briefs', reducer });
const withSaga = injectSaga({ key: 'briefs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BriefPage);
