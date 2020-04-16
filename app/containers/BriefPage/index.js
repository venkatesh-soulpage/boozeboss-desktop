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
import { makeSelectBriefs, makeSelectSuccess, makeSelectError} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { BriefsContainer } from './components';
import { makeSelectScope, makeSelectRole } from '../App/selectors';
import { addBriefDraft, getBriefs, createBrief } from './actions';



/* eslint-disable react/prefer-stateless-function */
export class BriefPage extends React.Component {
  
  componentDidMount = () => {
    const {getBriefs} = this.props;
    getBriefs();
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
  addBriefDraft: PropTypes.func.isRequired,
  getBriefs: PropTypes.func.isRequired, 
  createBrief: PropTypes.func.isRequired, 
};

const mapStateToProps = createStructuredSelector({
  scope: makeSelectScope(),
  role: makeSelectRole(),
  briefs: makeSelectBriefs(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    addBriefDraft: () => dispatch(addBriefDraft()),
    getBriefs: () => dispatch(getBriefs()),
    createBrief: (brief) => dispatch(createBrief(brief))
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
