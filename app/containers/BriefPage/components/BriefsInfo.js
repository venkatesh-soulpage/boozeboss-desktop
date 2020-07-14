import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Panel, Input, Button, Table, InputNumber, Message, Divider,IconButton, Icon, SelectPicker } from 'rsuite';
import moment from 'moment';
import NewEvent from './NewEvent';
import SubmitBriefConfirm from './SubmitBriefConfirm';
import RoleValidator from 'components/RoleValidator'
import NewBrand from './NewBrand';
import DeleteBrandModal from './DeleteBrandModal';
import CreateRequisitionConfirm from './CreateRequisitionConfirm';
import BriefAttachmentUploader from './BriefAttachmentUploader';
import BriefEventsList from './BriefEventsList';

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
        agency_id: null,
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
        const {agenciesData} = this.props;
        const {name, description} = this.state;
        return (
            <Panel shaded>
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
                        <FieldLabel>Brief Title</FieldLabel>
                        <Input 
                            value={name}
                            onChange={(value) => this.handleChange(value, 'name')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel>Agency</FieldLabel>
                        {agenciesData && agenciesData.length > 0 ? (
                            <SelectPicker 
                                searchable={false}
                                data={agenciesData}
                                onChange={(value) => this.handleChange(value, 'agency_id')}
                            />
                        ) : (
                            <p>No agencies</p>
                        )}
                        
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
                        <Button onClick={this.submitBrief} color="green">Create Brief</Button>
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


    newRequisition = () => {
        const {history} = this.props;
        history.push('/requisitions')
    }

    formatSizeUnits = (bytes) => {
        if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1)           { bytes = bytes + " bytes"; }
        else if (bytes == 1)          { bytes = bytes + " byte"; }
        else                          { bytes = "0 bytes"; }
        return bytes;
    }

    getCurrentStorage = () => {
        const {briefs, currentBrief} = this.props;

        if (!briefs) return 0;
        
        const totalSize = briefs[currentBrief].attachments
                .reduce((acc, curr) => {
                    return acc + curr.size;
                }, 0)

        return this.formatSizeUnits(totalSize)
    }

    render() {
        const { briefs, currentBrief, error, success, dismiss, scope, role } = this.props;
            return (
                <InfoContainer>
                    {/* error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/> */}
                    {/* success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} /> */}
                    {(!briefs || briefs.length < 1) && <ClientsLabel>No Briefs</ClientsLabel> }
                    {briefs &&
                        briefs.length > 0 && (
                        <React.Fragment>
                        {briefs[currentBrief].isDraft ? (
                            <BriefForm {...this.props} />
                        ) : (
                            <Panel shaded>
                                <DataContainer>
                                    <ActionsContainer>
                                        <FieldContainer>
                                            <p>{briefs[currentBrief].status}</p>
                                            <p>{moment(briefs[currentBrief].created_at).format('DD/MM/YYYY')}</p>
                                        </FieldContainer>
                                        <RoleValidator
                                            {...this.props}
                                            scopes={['BRAND']}
                                            roles={['OWNER', 'MANAGER']}
                                        >
                                            {briefs[currentBrief].status === 'DRAFT' && (
                                                <FieldContainer>
                                                    <IconButton color="red" icon={<Icon icon="trash" style={{width: '100%'}}/>} style={{display: 'flex', flexDirection: 'row', justifyItems: 'center'}} onClick={this.handleDelete}/> 
                                                    <SubmitBriefConfirm {...this.props} />
                                                </FieldContainer>
                                            )}
                                        </RoleValidator>
                                        <RoleValidator
                                            {...this.props}
                                            scopes={['AGENCY']}
                                            roles={['OWNER', 'MANAGER']}
                                        >
                                            {briefs[currentBrief].status === 'SUBMITTED' && (
                                                <FieldContainer>
                                                    <CreateRequisitionConfirm {...this.props} briefs={briefs} currentBrief={currentBrief} />
                                                </FieldContainer>
                                            )}
                                        </RoleValidator>
                                    </ActionsContainer>
                                    <Divider />
                                    <FieldsRow>
                                        <FieldContainer>
                                            <FieldLabel>Brief Title</FieldLabel>
                                            <p>{briefs[currentBrief].name}</p>
                                        </FieldContainer>
                                    </FieldsRow>
                                    <FieldContainer>
                                        <FieldLabel>Agency</FieldLabel>
                                        <p>{briefs[currentBrief].agency.name}</p>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Description</FieldLabel>
                                        <p>{briefs[currentBrief].description}</p>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Attachments ({this.getCurrentStorage()} / {this.formatSizeUnits(briefs[currentBrief].client.brief_attachment_limits)})</FieldLabel>
                                        <BriefAttachmentUploader
                                            {...this.props}
                                            brief={briefs[currentBrief]}
                                        />
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Select lead brands</FieldLabel>
                                        {briefs[currentBrief].brands && 
                                            briefs[currentBrief].brands.length > 0 ? (
                                                <Panel shaded style={{backgroundColor: 'white'}}>
                                                <Table
                                                    data={briefs[currentBrief].brands}
                                                    style={{zIndex: 0}}
                                                >
                                                    <Column resizable width={120}>
                                                        <HeaderCell>
                                                            Brand
                                                        </HeaderCell>
                                                        <Cell dataKey="name">
                                                            {rowData => rowData.brand.name}
                                                        </Cell>
                                                    </Column>
                                                    <Column resizable width={120}>
                                                        <HeaderCell>
                                                            Category
                                                        </HeaderCell>
                                                        <Cell dataKey="name">
                                                            {rowData => rowData.brand.product_type}
                                                        </Cell>
                                                    </Column>
                                                    <Column resizable width={120}>
                                                        <HeaderCell>
                                                            Sub-Category
                                                        </HeaderCell>
                                                        <Cell dataKey="name">
                                                            {rowData => rowData.brand.product_subtype}
                                                        </Cell>
                                                    </Column>
                                                    <Column resizable width={120}>
                                                        <HeaderCell>
                                                            Limit (ml)
                                                        </HeaderCell>
                                                        <Cell dataKey="setup_time">
                                                            {rowData => rowData.limit}
                                                        </Cell>
                                                    </Column>
                                                    <Column width={250}>
                                                        <HeaderCell>
                                                            Actions
                                                        </HeaderCell>
                                                        <Cell dataKey="venue">
                                                            {rowData => <DeleteBrandModal {...this.props} brief_id={briefs[currentBrief].id} brief_brand_id={rowData.id}/>}
                                                        </Cell>
                                                    </Column> 
                                                    
                                                </Table>
                                                                                                    
                                                </Panel>
                                            ) : (
                                                <p>No Brands</p>
                                            )}
                                        <RoleValidator
                                            {...this.props}
                                            scopes={['BRAND']}
                                            roles={['OWNER', 'MANAGER']}
                                        >
                                            {briefs[currentBrief].status === 'DRAFT' && (
                                                <NewBrand 
                                                    {...this.props}
                                                    brief={briefs[currentBrief]}
                                                />
                                            )}
                                        </RoleValidator>
                                    </FieldContainer>
                                    <FieldContainer>
                                        <FieldLabel>Add events to this brief</FieldLabel>
                                        <BriefEventsList {...this.props} brief={briefs[currentBrief]}/>
                                        <RoleValidator
                                            {...this.props}
                                            scopes={['BRAND']}
                                            roles={['OWNER', 'MANAGER']}
                                        >
                                            {briefs[currentBrief].status === 'DRAFT' && (
                                                <NewEvent 
                                                    {...this.props}
                                                    agency={briefs[currentBrief].agency}
                                                />
                                            )}
                                        </RoleValidator>
                                        
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
