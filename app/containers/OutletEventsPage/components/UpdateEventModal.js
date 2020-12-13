/* eslint-disable camelcase */
import React from 'react';
import {
  Modal,
  Button,
  Input,
  Alert,
  InputNumber,
  DatePicker,
  TreePicker,
  Uploader,
  Icon,
} from 'rsuite';

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

export default class UpdateEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      start_time: '',
      end_time: '',
      expected_guests: '',
      expected_hourly_guests: '',
      comments: '',
      address: '',
      description: '',
      cover_image: '',
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
    if (name === 'start_time') {
      if (new Date(value).getTime() < new Date().getTime())
        return Alert.error('Cant set start time', 2000);
    } else if (name === 'end_time') {
      if (
        new Date(value).getTime() <= new Date().getTime() ||
        new Date(value).getTime() <= new Date(this.state.start_time).getTime()
      )
        return Alert.error('Cant set end time', 2000);
    }
    return this.setState({ [name]: value });
  };

  update = async () => {
    const { updateEventRequest } = this.props;
    await updateEventRequest(this.state);
    return this.close();
  };

  render() {
    const { outletlocations } = this.props;
    const {
      show,
      name,
      start_time,
      end_time,
      expected_guests,
      expected_hourly_guests,
      comments,
      address,
      location_id,
      description,
      // cover_image,
    } = this.state;

    return (
      <React.Fragment>
        <Modal show={show} onHide={this.close}>
          <Modal.Body>
            <FieldContainer>
              <FieldLabel>Event Name (Required)</FieldLabel>
              <Input
                onChange={value => this.handleChange(value, 'name')}
                value={name}
              />
            </FieldContainer>

            <FieldRow>
              <FieldContainer>
                <FieldLabel>Start Time (Required)</FieldLabel>
                <DatePicker
                  value={start_time}
                  format="DD-MM-YYYY HH:mm"
                  onOk={value => this.handleChange(value, 'start_time')}
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>End Time (Required)</FieldLabel>
                <DatePicker
                  value={end_time}
                  format="DD-MM-YYYY HH:mm"
                  onOk={value => this.handleChange(value, 'end_time')}
                />
              </FieldContainer>
            </FieldRow>
            <FieldRow>
              <FieldContainer>
                <FieldLabel>Expected Guests (Required)</FieldLabel>
                <InputNumber
                  onChange={value =>
                    this.handleChange(value, 'expected_guests')
                  }
                  value={expected_guests}
                  min={1}
                />
              </FieldContainer>
              <FieldContainer>
                <FieldLabel>Expected Hourly Guests (Required)</FieldLabel>
                <InputNumber
                  // eslint-disable-next-line camelcase
                  value={expected_hourly_guests}
                  onChange={value =>
                    this.handleChange(value, 'expected_hourly_guests')
                  }
                  min={1}
                />
              </FieldContainer>
            </FieldRow>

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
              <FieldLabel>Address</FieldLabel>
              <Input
                value={address}
                componentClass="textarea"
                rows={3}
                style={{ resize: 'auto' }}
                onChange={value => this.handleChange(value, 'address')}
              />
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Description</FieldLabel>
              <Input
                value={description}
                componentClass="textarea"
                rows={3}
                style={{ resize: 'auto' }}
                onChange={value => this.handleChange(value, 'description')}
              />
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Comments</FieldLabel>
              <Input
                componentClass="textarea"
                rows={3}
                style={{ resize: 'auto' }}
                onChange={value => this.handleChange(value, 'comments')}
                value={comments}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Cover Image</FieldLabel>
              <Uploader
                listType="picture-text"
                autoUpload={false}
                multiple={false}
                onChange={value => this.handleChange(value, 'cover_image')}
                ref={ref => {
                  this.uploader = ref;
                }}
              >
                <button type="button">
                  <Icon icon="camera-retro" size="lg" />
                </button>
              </Uploader>
            </FieldContainer>
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

UpdateEventModal.propTypes = {
  showVenueModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  updateEventRequest: PropTypes.func,
  data: PropTypes.object,
  outletlocations: PropTypes.array,
};
