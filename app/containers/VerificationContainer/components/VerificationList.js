import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Button } from 'rsuite';
import RoleValidator from 'components/RoleValidator';

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start; 
  position: sticky;
  top: 1em;
  z-index: 99;
`;

const AddSection = styled.div`
  display: flex;
  flex: 1;
  max-height: 45px;
  flex-direction: column;
  position: sticky;
  top: 0;
  margin: 0 0.5em 0.5em;
  z-index: 99;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0.5em 0.5em 0.5em;
`;
const MessageLabel = styled.p`
  font-family: Roboto;
  font-size: 1.25em;
  margin: 1em;
`;

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0.5em 0 0.5em 0;

  ${props => props.isSelected && 'background-color: #E8E8E8;'} &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
`;

class Verification extends Component {
  handleSelectCurrentVerification = () => {
    const { handleSelectCurrentVerification, index } = this.props;
    handleSelectCurrentVerification(index);
  };

  render() {
    const { verification, currentVerification, index } = this.props;
    return (
      <React.Fragment>
        <StyledPanel
            shaded
            isSelected={currentVerification === index}
            onClick={this.handleSelectCurrentVerification}
          >
            <b>{verification.first_name} {verification.last_name}</b>
          </StyledPanel>
      </React.Fragment>
    );
  }
}

export default class VerificationList extends Component {

  render() {
    const { verifications, currentVerification } = this.props;
    return (
      <Column>
        <List>
          {(!verifications || verifications.length < 1) && (
            <MessageLabel>No Verifications</MessageLabel>
          )}
          {verifications &&
            verifications.length > 0 &&
            verifications.map((verification, index) => (
              <Verification
                {...this.props}
                index={index}
                currentVerification={currentVerification}
                verification={verification}
              />
            ))}
        </List>
      </Column>
    );
  }
}

VerificationList.propTypes = {
  // agencies: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
