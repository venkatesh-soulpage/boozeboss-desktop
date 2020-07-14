import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker} from 'rsuite'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

export default class OrganizationUpdateCollaboratorLocation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        location_id: null,
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.getLocationsPicker();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    getLocationsPicker = () => {
        const {organizations, currentOrganization} = this.props;
        const locations = 
                organizations[currentOrganization].locations.map(regional_location => {
                    return {
                        label: regional_location.location.name,
                        value: regional_location.location_id,
                    }
                })

        this.setState({locations});
    }

    updateLocation = async () => {
        const {updateCollaboratorLocation, organizations, currentOrganization, collaborator} = this.props;
        const {location_id} = this.state;
        if (!location_id) return;
        const regional_organization_id = organizations[currentOrganization].id;
        await updateCollaboratorLocation(regional_organization_id, collaborator.id, location_id);
        this.close();
    }

    render() {
        const {collaborator} = this.props;
        const {show, locations} = this.state;
        return ( 
            <React.Fragment>
                <a onClick={this.open}>Update Location</a>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Primary Location</FieldLabel>
                            <SelectPicker 
                                defaultValue={collaborator.account.location_id}
                                searchable={false}
                                cleanable={false}
                                data={locations}
                                onChange={(value) => this.handleChange(value, 'location_id')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.updateLocation} color="green">
                        Update
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
  