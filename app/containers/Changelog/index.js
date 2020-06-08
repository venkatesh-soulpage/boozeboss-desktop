/**
 *
 * Changelog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Panel} from 'rsuite';
import changelog from './changelog';
 
const ChangelogContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
`

const StyledChangelog = styled(Panel)`
  margin: 1em;
  width: 800px;
`

/* eslint-disable react/prefer-stateless-function */
export class Changelog extends React.Component {
  render() {
    return (
      <ChangelogContainer>
        <StyledChangelog shaded>
          <ReactMarkdown  
            source={changelog}
            escapeHtml={false}
          />
        </StyledChangelog>
      </ChangelogContainer>
    )
  }
}

Changelog.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Changelog);
