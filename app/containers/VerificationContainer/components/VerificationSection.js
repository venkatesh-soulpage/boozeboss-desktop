import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VerificationList from './VerificationList';
import VerificationInfo from './VerificationInfo';


const StyledContainer = styled.div`
  display: flex;
    flex-direction: row;
  margin: 2em 2em 0 2em;
`;

export default class VerificationSection extends Component {

    state = {
        currentVerification: 0,
    }

    handleSelectCurrentVerification = currentVerification => {
        this.setState({currentVerification})
    }

  render() {
    return (
            <StyledContainer>
                <VerificationList
                    {...this.props} 
                    {...this.state}
                    handleSelectCurrentVerification={this.handleSelectCurrentVerification}
                />
                <VerificationInfo 
                    {...this.props} 
                    {...this.state}
                />
            </StyledContainer>
        )
    }
}

VerificationSection.propTypes = {};
