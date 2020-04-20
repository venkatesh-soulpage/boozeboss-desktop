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

export default class CreateVenueModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        countries: null,
        country: null,
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
        const {locations, selected_locations} = this.props;
        const ids = selected_locations.map(loc => loc.id);
        const filtered_locations = locations.filter(location => ids.indexOf(location.id) < 0)
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
        const {addLocation, locations} = this.props;
        const {country} = this.state;

        const location = locations.find(location => location.id === country);

        addLocation(location);
        this.close();
    }

    render() {
        const {show, countries} = this.state;
        const {selected_locations, locations_limit} = this.props;
        return (
            <React.Fragment>
                <Button onClick={this.open} disabled={selected_locations.length >= locations_limit}>+ Add Location</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Location</FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={countries}
                                onChange={(value) => this.handleChange(value, 'country')}
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
  