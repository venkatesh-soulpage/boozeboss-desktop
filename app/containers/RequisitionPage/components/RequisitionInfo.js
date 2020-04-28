import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber } from 'rsuite';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const { Column, HeaderCell, Cell } = Table;

const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 0 2em;
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

export default class RequisitionInfo extends Component {

  render() {
    const { requisitions, scope, role, currentRequisition } = this.props;
        return (
            <InfoContainer>
                {(!requisitions || requisitions.length < 1) && <ClientsLabel>No Requisitions</ClientsLabel> }
                {requisitions &&
                    requisitions.length > 0 && (
                        <Panel bordered>
                            <DataContainer>
                                <FieldContainer>
                                    <FieldLabel>ID</FieldLabel>
                                    <p>{requisitions[currentRequisition].id}</p>
                                </FieldContainer>
                            </DataContainer>
                        </Panel>
                    )}
            </InfoContainer>
    );
  }
}

RequisitionInfo.propTypes = {};
