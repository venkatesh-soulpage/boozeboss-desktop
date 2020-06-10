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

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default class ClientAddLocation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        countries: null,
        location_id: null,
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    getPickerData = ()  => {
        const {locations, client} = this.props;
        
        if (!locations) {
            return this.setState({countries: []})
        }

        const client_locations = client.locations.map(loc => loc.id);

        const filtered_locations = locations.filter(location => location.is_country).filter(loc => client_locations.indexOf(loc.id) < 0);

        const countries = filtered_locations.map(location => {
            return {
                label: location.name,
                value: location.id,
                role: location.name,
            }
        })
        this.setState({countries});
    }

    addLocation = async () => {
        const {addClientLocation, client} = this.props;
        const {location_id} = this.state;

        addClientLocation(client.id, location_id);
        this.close();
    }

    goToRoute = (pathname) => {
        this.props.history.push({
            pathname,
            showLocationModal: true,
        });
    }


    render() {
        const {show, countries} = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green" block>+ Add Location</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldRow>
                                <FieldLabel>Location</FieldLabel>
                                <a onClick={() => this.goToRoute('/system')}>+ Add new location</a>
                            </FieldRow>
                            <SelectPicker 
                                searchable={false}
                                data={countries}
                                onChange={(value) => this.handleChange(value, 'location_id')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addLocation} color="green">
                        Add
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
  