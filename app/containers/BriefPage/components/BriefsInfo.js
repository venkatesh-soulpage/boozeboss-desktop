import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider,IconButton, Icon } from 'rsuite';
import moment from 'moment';
import NewEvent from './NewEvent';
import SubmitBriefConfirm from './SubmitBriefConfirm';

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

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

    removeDraft = () => {
        const {deleteBriefDraft} = this.props;
        deleteBriefDraft();
    }

    render() {
        const {name, description} = this.state;
        return (
            <Panel bordered>
                <ActionsContainer>
                    <FieldContainer>
                        <p>DRAFT</p>
                        <p>{moment().format('DD/MM/YYYY')}</p>
                    </FieldContainer>
                    <IconButton icon={<Icon icon="trash"/>} onClick={this.removeDraft}/>
                </ActionsContainer>
                <Divider />
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

    handleDelete = async () => {
        const {deleteBrief, briefs, currentBrief, handleSelectCurrentBrief} = this.props;
        // If is the last on the list
        const isLast = briefs.length === 1;
        if (((currentBrief + 1) >= briefs.length) && !isLast) {
            await handleSelectCurrentBrief(currentBrief - 1);
        }
        await deleteBrief(briefs[currentBrief].id);
    }

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
                                <ActionsContainer>
                                    <FieldContainer>
                                        <p>{briefs[currentBrief].status}</p>
                                        <p>{moment(briefs[currentBrief].created_at).format('DD/MM/YYYY')}</p>
                                    </FieldContainer>
                                    {briefs[currentBrief].status === 'DRAFT' && (
                                        <FieldContainer>
                                            <IconButton icon={<Icon icon="trash"/>} style={{textAlign: 'center'}} onClick={this.handleDelete}/> 
                                            <SubmitBriefConfirm {...this.props} />
                                        </FieldContainer>
                                    )}
                                </ActionsContainer>
                                <Divider />
                                <FieldContainer>
                                    <FieldLabel>Name</FieldLabel>
                                    <p>{briefs[currentBrief].name}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Description</FieldLabel>
                                    <p>{briefs[currentBrief].description}</p>
                                </FieldContainer>
                                <FieldContainer>
                                    <FieldLabel>Events</FieldLabel>
                                    {briefs[currentBrief].brief_events && 
                                        briefs[currentBrief].brief_events.length > 0 ? (
                                            <Table
                                                data={briefs[currentBrief].brief_events}
                                            >
                                                <Column resizable width={120}>
                                                    <HeaderCell>
                                                        Start Time
                                                    </HeaderCell>
                                                    <Cell dataKey="start_time">
                                                        {rowData => moment(rowData.start_time).format('HH:MM DD/MM/YY')}
                                                    </Cell>
                                                </Column>
                                                <Column resizable width={120}>
                                                    <HeaderCell>
                                                        End Time
                                                    </HeaderCell>
                                                    <Cell dataKey="end_time">
                                                        {rowData => moment(rowData.end_time).format('HH:MM DD/MM/YY')}
                                                    </Cell>
                                                </Column>
                                                <Column width={120} resizable>
                                                    <HeaderCell>
                                                        Expected Guests
                                                    </HeaderCell>
                                                    <Cell dataKey="expected_guests">
                                                        {rowData => rowData.expected_guests}
                                                    </Cell>
                                                </Column>
                                                <Column width={120} resizable>
                                                    <HeaderCell>
                                                        Venue
                                                    </HeaderCell>
                                                    <Cell dataKey="venue">
                                                        {rowData => rowData.venue.name}
                                                    </Cell>
                                                </Column>
                                                <Column width={120} resizable>
                                                    <HeaderCell>
                                                        Drinks Enabled
                                                    </HeaderCell>
                                                    <Cell dataKey="drinks_enabled">
                                                        {rowData => rowData.drinks_enabled ? 'Yes' : 'No'}
                                                    </Cell>
                                                </Column>
                                                <Column width={120} resizable>
                                                    <HeaderCell>
                                                        Cocktails Enabled
                                                    </HeaderCell>
                                                    <Cell dataKey="venue">
                                                        {rowData => rowData.cocktails_enabled ? 'Yes' : 'No'}
                                                    </Cell>
                                                </Column>
                                                <Column width={120} resizable>
                                                    <HeaderCell>
                                                        Free Drinks Enabled
                                                    </HeaderCell>
                                                    <Cell dataKey="venue">
                                                        {rowData => rowData.free_drinks_enabled ? 'Yes' : 'No'}
                                                    </Cell>
                                                </Column>
                                                <Column width={250}>
                                                    <HeaderCell>
                                                        Actions
                                                    </HeaderCell>
                                                    <Cell dataKey="venue">
                                                        Show More | Edit
                                                    </Cell>
                                                </Column>
                                            </Table>
                                        ) : (
                                            <p>No Events</p>
                                        )}
                                    {briefs[currentBrief].status === 'DRAFT' && (
                                        <NewEvent 
                                            {...this.props}
                                        />
                                    )}
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
