import React, { Component } from 'react'
import {Table, Modal, Button} from 'rsuite'; 
import styled from 'styled-components';
import RoleValidator from 'components/RoleValidator';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;


const Countries = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0;
    width: 100%;
`

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;


const {Column, HeaderCell, Cell} = Table;


class PrimaryLocation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
    }

    componentDidMount = () => {
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      // this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleSelectPrimaryLocation = async () => {
        const {organization, regional_location, selectPrimaryLocation} = this.props;
        await selectPrimaryLocation(organization.id, regional_location.id);
        this.close();
    }

    render() {
        const {regional_location} = this.props;
        const {show} = this.state;
        return (
            <React.Fragment>
                {regional_location.is_primary_location ? (
                  <b>Primary</b>
                ) : (
                  <a onClick={this.open}>Select as Primary</a>
                )}
        
                <Modal show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                      <p>Are you sure you want to define this location as primary? All your dashboards and reports would change to the primary location currency.</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.handleSelectPrimaryLocation} color="green">
                        Change      
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  

export default class OrganizationLocationsTable extends Component {
    render() {
        const {organizations, currentOrganization} = this.props;
        return (
            <FieldContainer>
                <FieldLabel>Locations ({organizations[currentOrganization].locations.length} / {organizations[currentOrganization].locations_limit})</FieldLabel>
                {organizations[currentOrganization].locations 
                    && organizations[currentOrganization].locations.length > 0 ? (
                        <Countries >
                            <Table
                                data={organizations[currentOrganization].locations.sort((a,b) => a.id - b.id)}
                                width='100%'
                            >
                                <Column flexGrow>
                                    <HeaderCell>
                                        Name
                                    </HeaderCell>
                                    <Cell dataKey="name">
                                        {rowData => rowData.location.name}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        States Available
                                    </HeaderCell>
                                    <Cell dataKey="childrens">
                                        {rowData => rowData.location.childrens.length}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Currency
                                    </HeaderCell>
                                    <Cell dataKey="currency">
                                        {rowData => rowData.location.currency}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Passport Available
                                    </HeaderCell>
                                    <Cell dataKey="passport_available">
                                        {rowData => rowData.location.passport_available ? 'Yes' : 'No' }
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        ID Available
                                    </HeaderCell>
                                    <Cell dataKey="id_card_available">
                                        {rowData => rowData.location.id_card_available ? 'Yes' : 'No'}
                                    </Cell>
                                </Column>
                                <Column flexGrow>
                                    <HeaderCell>
                                        Primary Location
                                    </HeaderCell>
                                    <Cell dataKey="id_card_available">
                                        {rowData => <PrimaryLocation organization={organizations[currentOrganization]} regional_location={rowData} {...this.props}/>}
                                    </Cell>
                                </Column>
                            </Table>
                        </Countries>
                    ) : (
                        <p>No locations defined</p>
                    )}
                <RoleValidator
                    {...this.props}
                    scopes={['ADMIN']}
                    roles={['ADMIN']}
                >
                    {/* <ClientAddLocation 
                        {...this.props}
                        client={clients[currentClient]}
                    /> */}
                </RoleValidator>
            </FieldContainer>
        )
    }
}
