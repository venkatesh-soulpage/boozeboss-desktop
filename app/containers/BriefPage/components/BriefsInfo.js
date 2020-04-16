import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

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
    margin: 1em 1em 1em 1em;
`;

const FieldsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1em 0 1em 0;
`;

const FieldLabelContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const StyledMessage = styled(Message)`
    margin: 0 0 1em 0;
`

const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

class BriefForm extends Component {

    state = {
        name: null,
        description: null,
    };

    handleChange = (value, name) => {
            this.setState({[name]: value});
    };

    submitBrief = () => {
        const { createBrief } = this.props;
        createBrief({...this.state});
    };

    render() {
        const {name, description} = this.state;
        return (
            <Panel bordered>
                <DataContainer>
                    <FieldContainer>
                        <FieldLabel>Name</FieldLabel>
                        <Input 
                            value={name}
                            onChange={(value) => this.handleChange(value, 'name')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Description</FieldLabel>
                        <Input
                            componentClass="textarea" 
                            rows={3} 
                            value={description}
                            onChange={(value) => this.handleChange(value, 'description')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Button onClick={this.submitBrief}>Create Brief</Button>
                    </FieldContainer>
                </DataContainer>
            </Panel>
    );
  }
}

export default class BriefsInfo extends Component {

  render() {
    const { briefs, currentBrief, error, success, dismiss } = this.props;
        return (
            <InfoContainer>
                {error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/>}
                {success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} />}
                {(!briefs || briefs.length < 1) && <ClientsLabel>No Briefs</ClientsLabel> }
                {briefs &&
                    briefs.length > 0 && (
                    <React.Fragment>
                    {briefs[currentBrief].isDraft ? (
                        <BriefForm {...this.props} />
                    ) : (
                        <Panel bordered>
                            <DataContainer>
                                <FieldContainer>
                                    <FieldLabel>Name</FieldLabel>
                                    <p>{briefs[currentBrief].name}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Description</FieldLabel>
                                    <p>{briefs[currentBrief].description}</p>
                                </FieldContainer>
                            </ DataContainer>
                        </Panel>
                    )}
                </React.Fragment>
                )}
            </InfoContainer>
    );
  }
}

BriefsInfo.propTypes = {
};
