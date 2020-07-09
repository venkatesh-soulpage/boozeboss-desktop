import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider } from 'rsuite';
import RoleValidator from 'components/RoleValidator';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const { Column, HeaderCell, Cell } = Table;

const StyledMessage = styled(Message)`
    margin: 0 0 1em 0;
`

const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 2em 2em;
`;

const ClientsLabel = styled.p`
  font-size: 1.25em;
`;
const DataContainer = styled.div`
  display: flex;
    flex-direction: column;
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`
const VerificationRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const StyledButton = styled(Button)`
    margin: 0 1em 0 1em;
    width: 150px;
`

const StyledImage = styled.img`
    max-height: 500px;
`

const VerificationPicture = (props) => (
    <div>
        {props.verification_attachment.verification_type === 'id_front' && <h4>ID Front side</h4>}
        {props.verification_attachment.verification_type === 'id_back' && <h4>ID Back side</h4>}
        {props.verification_attachment.verification_type === 'selfie' && <h4>Selfie</h4>}
        <Divider />
        <StyledImage src={props.verification_attachment.url} />
        <Divider />
    </div>
)


export default class VerificationInfo extends Component {

    handleVerification = (status) => {
        const {verifications, currentVerification, updateVerificationStatus} = this.props;
        const verification = verifications[currentVerification];

        updateVerificationStatus(verification.id, status);
    }

  render() {
        const {verifications, currentVerification} = this.props;
        const verification = verifications && verifications[currentVerification];
        return (
            <InfoContainer>
                {verification ? (
                    <Panel bordered>
                        <DataContainer>
                            {verification && 
                                verification.verifications &&
                                verification.verifications.map(verification_attachment => {
                                    return <VerificationPicture verification_attachment={verification_attachment} />
                                })
                            }
                        </DataContainer>
                        <VerificationRow>
                            <StyledButton color="green" onClick={() => this.handleVerification('APPROVED')}>Verify</StyledButton>
                            <StyledButton color="red" onClick={() => this.handleVerification('REJECTED')}>Reject</StyledButton>
                        </VerificationRow>
                    </ Panel>
                ) : (
                    <div>
                        <p>No Verifications</p>
                    </div>
                )}
            </InfoContainer>
    );
  }
}

VerificationInfo.propTypes = {};
