import React, { Component } from 'react'
import {Modal, Button, Input, DatePicker, InputNumber, Checkbox, SelectPicker, Radio, RadioGroup} from 'rsuite'
import styled from 'styled-components';

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 1.5em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;


const StyledButton = styled(Button)`
    display: flex;
    margin: 1em 0 0 0;
    align-self: flex-end;
`

export default class LocationsAddNew extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        countries: null,
        name: null,
        is_country: true,
        parent_location: null,
        id_card_available: false,
        passport_available: false,
      };
    }

    componentDidMount = () => {
        const {showLocationModal} = this.props.location;

        if (showLocationModal) {
            this.open();
        }
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
        const {locations} = this.props;
        if (!locations || locations.length < 1) {
            return this.setState({countries: []})
        };
        
        // Get countries
        const countries = 
            locations
                .filter(location => location.is_country)
                .map(country => {
                    return {
                        label: country.name,
                        value: country.id,
                        role: country.name,
                    }
                })

        this.setState({countries});
    }

    addLocation = async () => {
       const {addLocation} = this.props;
       const {name, countries, is_country, id_card_available, passport_available, parent_location} = this.state;
       addLocation({name, countries, is_country, id_card_available, passport_available, parent_location});
       this.close();
    }

    render() {
        const {locations} = this.props;
        const {show, name, countries, is_country, id_card_available, passport_available} = this.state;
        return (
            <React.Fragment>
                <StyledButton onClick={this.open}>+ New Location</StyledButton>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Location Name</FieldLabel>
                                <Input 
                                    onChange={(value) => this.handleChange(value, 'name')}
                                    value={name}
                                /> 
                            </FieldContainer>
                        </FieldRow>
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Location Type</FieldLabel>
                                <RadioGroup name="radioList" onChange={(value) => this.handleChange(value, 'is_country')} defaultValue={true}>
                                    <Radio value={true}>Country</Radio>
                                    <Radio value={false}>City</Radio>
                                </RadioGroup>
                            </FieldContainer>
                        </FieldRow>
                        {locations && locations.length > 0 && !is_country && (
                            <FieldRow>
                                <FieldContainer>
                                <FieldLabel>Parent Location</FieldLabel>
                                <SelectPicker 
                                    searchable={false}
                                    data={countries}
                                    onChange={(value) => this.handleChange(value, 'parent_location')}
                                />
                                </FieldContainer>
                            </FieldRow>
                        )}
                        <FieldRow>
                            <FieldContainer>
                                <FieldLabel>Verification</FieldLabel>
                                <Checkbox onChange={(value) => this.handleChange(!id_card_available, 'id_card_available')}>ID Card</Checkbox>
                                <Checkbox onChange={(value) => this.handleChange(!passport_available, 'passport_available')}>Passport Available</Checkbox>
                            </FieldContainer>
                        </FieldRow>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addLocation} color="green">
                        Add Location
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
  