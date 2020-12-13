/* eslint-disable camelcase */
import React from 'react';
import { Modal, Button, Input, TreePicker } from 'rsuite';

import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
  margin: 0 0.5em 0.5em 0;
`;

export default class UpdateVenueModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      location_id: '',
      address: '',
      latitude: '',
      longitude: '',
    };
  }

  componentDidMount = () => {
    const { showVenueModal } = this.props;
    if (showVenueModal) {
      this.open();
    }
    this.setState(this.props.data);
  };

  close = () => {
    this.setState({ show: false });
    this.props.toggleModal();
  };

  open = () => {
    this.setState({ show: true });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  update = async () => {
    const { updateVenueRequest } = this.props;
    await updateVenueRequest(this.state);
    return this.close();
  };

  render() {
    const { outletlocations } = this.props;

    const {
      show,
      name,
      address,
      latitude,
      longitude,
      location_id,
    } = this.state;

    return (
      <React.Fragment>
        <Modal show={show} onHide={this.close}>
          <Modal.Body>
            <FieldContainer>
              <FieldLabel>Venue Name (Required)</FieldLabel>
              <Input
                onChange={value => this.handleChange(value, 'name')}
                value={name || ''}
              />
            </FieldContainer>

            <FieldContainer>
              <FieldRow>
                <FieldLabel>Location (Required)</FieldLabel>
              </FieldRow>

              <TreePicker
                searchable
                data={outletlocations || []}
                valueKey="id"
                labelKey="name"
                value={location_id}
                childrenKey="childrens"
                onChange={value => this.handleChange(value, 'location_id')}
              />
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Address (Required)</FieldLabel>
              <Input
                componentClass="textarea"
                rows={2}
                style={{ resize: 'auto' }}
                onChange={value => this.handleChange(value, 'address')}
                value={address}
              />
            </FieldContainer>

            <FieldRow>
              <FieldContainer>
                <FieldLabel>Longitude</FieldLabel>
                <Input
                  onChange={value => this.handleChange(value, 'longitude')}
                  value={longitude}
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>Latitude</FieldLabel>
                <Input
                  onChange={value => this.handleChange(value, 'latitude')}
                  value={latitude}
                />
              </FieldContainer>
            </FieldRow>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.update} color="green">
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

UpdateVenueModal.propTypes = {
  showVenueModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  updateVenueRequest: PropTypes.func,
  data: PropTypes.object,
  outletlocations: PropTypes.array,
};
