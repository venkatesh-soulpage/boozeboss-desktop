/* eslint-disable new-cap */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Panel,
  Input,
  Button,
  DatePicker,
  InputNumber,
  // IconButton,
  Icon,
  Alert,
  TreePicker,
  Uploader,
  Modal,
} from 'rsuite';

import _ from 'lodash';

import Papa from 'papaparse';

import { jsPDF } from 'jspdf';

import UpdateEventModal from './UpdateEventModal';

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FieldContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 1.5em 1em 1em 1em;
`;

const FieldLabel = styled.b`
  margin: 0 0.5em 0.5em 0;
`;

// const ActionsContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-end;
// `;

export default class OutletEventsForm extends Component {
  state = {
    name: '',
    start_time: '',
    end_time: '',
    expected_guests: '',
    expected_hourly_guests: '',
    comments: '',
    address: '',
    location_id: '',
    cover_image: [],
    description: '',
    showVenueModal: false,
    menu: [],
    inviteModal: false,
    owner_email: '',
    display_name: '',
    custom_message: '',
  };

  handleChange = (value, name) => {
    if (name === 'start_time') {
      if (new Date(value).getDate() < new Date().getDate())
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

  submitEvent = async () => {
    const { outletevents, currentOutletEvent } = this.props;
    if (outletevents[currentOutletEvent].isDraft) {
      const {
        name,
        start_time,
        end_time,
        location_id,
        comments,
        address,
        cover_image,
        description,
        expected_guests,
        expected_hourly_guests,
      } = this.state;
      if (!name || !start_time || !end_time || !location_id)
        return Alert.error('Missing Fields', 2000);

      const url = await this.fileToBase64(cover_image[0].blobFile);
      this.props.addEventRequest({
        name,
        start_time,
        end_time,
        location_id,
        comments,
        address,
        cover_image: { name: cover_image[0].blobFile.name, data: url },
        description,
        expected_guests,
        expected_hourly_guests,
      });
      this.reset();
    } else {
      //
    }
    return null;
  };

  reset = () => {
    this.setState({
      name: '',
      start_time: '',
      end_time: '',
      expected_guests: '',
      expected_hourly_guests: '',
      comments: '',
      address: '',
      location_id: '',
      description: '',
      cover_image: [],
      menu: [],
    });
  };

  fileToBase64 = async file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = e => reject(e);
    });

  toggleModal = () => {
    const status = this.state.showVenueModal;
    this.setState({ showVenueModal: !status });
  };

  uploadFile = data => {
    const { addMenuRequest, currentOutletEvent, outletevents } = this.props;
    const { data: csv_data } = data;
    const menu = _.reject(csv_data, { name: '' });
    const { id } = outletevents[currentOutletEvent];
    addMenuRequest(id, _.reject(menu, { '': '' }));
    this.setState({ menu: [] });
  };

  inviteOutletWaiter = () => {
    const { owner_email, display_name, custom_message } = this.state;
    const { currentOutletEvent, outletevents, inviteOutletWaiter } = this.props;

    const { id: outlet_event } = outletevents[currentOutletEvent];

    if (!owner_email) return Alert.error('Missing Fields', 2500);

    inviteOutletWaiter({
      owner_email,
      display_name,
      custom_message,
      outlet_event,
    });

    return this.closeInviteModal();
  };

  closeInviteModal = () => {
    this.setState({
      inviteModal: false,
      owner_email: '',
      display_name: '',
      custom_message: '',
    });
  };

  render() {
    const {
      outletevents,
      currentOutletEvent,
      outletlocations,
      updateEventRequest,
    } = this.props;

    const {
      name,
      start_time,
      end_time,
      expected_guests,
      expected_hourly_guests,
      comments,
      location_id,
      address,
      description,
      menu_link,
      cover_image,
    } = outletevents[currentOutletEvent].isDraft
      ? this.state
      : outletevents[currentOutletEvent];

    return (
      <Panel shaded>
        <DataContainer>
          {/* <FieldContainer>
            <ActionsContainer>
              <IconButton
                color="red"
                icon={<Icon icon="trash" />}
                // onClick={this.removeDraft}
              />
            </ActionsContainer>
          </FieldContainer> */}
          <FieldContainer>
            <FieldLabel>Event Name (Required)</FieldLabel>
            <Input
              onChange={value => this.handleChange(value, 'name')}
              value={name}
              disabled={!outletevents[currentOutletEvent].isDraft}
            />
          </FieldContainer>

          <FieldRow>
            <FieldContainer>
              <FieldLabel>Start Time (Required)</FieldLabel>
              <DatePicker
                value={start_time}
                format="DD-MM-YYYY HH:mm"
                onOk={value => this.handleChange(value, 'start_time')}
                disabled={!outletevents[currentOutletEvent].isDraft}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>End Time (Required)</FieldLabel>
              <DatePicker
                value={end_time}
                format="DD-MM-YYYY HH:mm"
                onOk={value => this.handleChange(value, 'end_time')}
                disabled={!outletevents[currentOutletEvent].isDraft}
              />
            </FieldContainer>
          </FieldRow>
          <FieldRow>
            <FieldContainer>
              <FieldLabel>Expected Guests (Required)</FieldLabel>
              <InputNumber
                onChange={value => this.handleChange(value, 'expected_guests')}
                value={expected_guests}
                min={1}
                disabled={!outletevents[currentOutletEvent].isDraft}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Expected Hourly Guests (Required)</FieldLabel>
              <InputNumber
                value={expected_hourly_guests}
                onChange={value =>
                  this.handleChange(value, 'expected_hourly_guests')
                }
                min={1}
                disabled={!outletevents[currentOutletEvent].isDraft}
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
              disabled={!outletevents[currentOutletEvent].isDraft}
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
              disabled={!outletevents[currentOutletEvent].isDraft}
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
              disabled={!outletevents[currentOutletEvent].isDraft}
            />
          </FieldContainer>

          <FieldContainer>
            <FieldLabel>Cover Image</FieldLabel>
            <Uploader
              listType="picture-text"
              autoUpload={false}
              multiple={false}
              onChange={value => {
                this.handleChange(value, 'cover_image');
              }}
              ref={ref => {
                this.uploader = ref;
              }}
              fileList={this.state.cover_image}
              disabled={!outletevents[currentOutletEvent].isDraft}
            >
              <button type="button">
                <Icon icon="camera-retro" size="lg" />
              </button>
            </Uploader>

            {!outletevents[currentOutletEvent].isDraft && (
              <img
                src={cover_image}
                alt={cover_image}
                hidden={!cover_image}
                style={{ width: '500px' }}
              />
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel>Comments</FieldLabel>
            <Input
              componentClass="textarea"
              rows={3}
              style={{ resize: 'auto' }}
              onChange={value => this.handleChange(value, 'comments')}
              value={comments}
              disabled={!outletevents[currentOutletEvent].isDraft}
            />
          </FieldContainer>
          {!outletevents[currentOutletEvent].isDraft && (
            <FieldContainer>
              <FieldLabel>Upload Menu</FieldLabel>
              <Uploader
                autoUpload={false}
                multiple={false}
                fileList={this.state.menu}
                accept=".xlsx, .xls, .csv"
                onChange={value => this.handleChange(value, 'menu')}
                ref={ref => {
                  this.uploader = ref;
                }}
              />
              <Button
                disabled={!this.state.menu.length}
                onClick={() => {
                  Papa.parse(this.state.menu[0].blobFile, {
                    complete: this.uploadFile,
                    header: true,
                    transformHeader: header =>
                      header.toLowerCase().replace(/\W/g, '_'),
                  });
                }}
              >
                Start Upload
              </Button>
            </FieldContainer>
          )}

          {menu_link && (
            <FieldRow>
              <FieldContainer>
                <FieldLabel>QR Menu</FieldLabel>
                <img
                  src={menu_link}
                  alt="venue_menu"
                  height="150"
                  width="150"
                  id="menu-qr"
                />

                <Button
                  onClick={() => {
                    const qrCode = document.querySelector('#menu-qr');
                    const options = {
                      orientation: 'p',
                      unit: 'mm',
                    };
                    const doc = new jsPDF(options);
                    const pdfWidth = doc.internal.pageSize.getWidth();

                    doc.addImage(
                      qrCode.src,
                      'PNG',
                      pdfWidth / 2 - 50,
                      0,
                      100,
                      100,
                    );

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(20);

                    doc.text(
                      name,
                      pdfWidth / 2 - doc.getTextWidth(name) / 2,
                      101,
                      {
                        align: 'justify',
                      },
                    );

                    doc.save(`${name}.pdf`);
                  }}
                >
                  Download
                </Button>
              </FieldContainer>
            </FieldRow>
          )}

          {!outletevents[currentOutletEvent].isDraft && (
            <FieldContainer>
              <Button
                block
                color="green"
                onClick={() => this.setState({ inviteModal: true })}
              >
                + Invite Waiter
              </Button>
              <Modal
                show={this.state.inviteModal}
                onHide={() => {
                  this.setState({ inviteModal: false });
                }}
              >
                <Modal.Body>
                  <FieldRow>
                    <FieldContainer>
                      <FieldLabel>Owner Email(Required)</FieldLabel>
                      <Input
                        onChange={value =>
                          this.handleChange(value, 'owner_email')
                        }
                        value={this.state.owner_email}
                      />
                    </FieldContainer>
                  </FieldRow>
                  <FieldRow>
                    <FieldContainer>
                      <FieldLabel>Display Name</FieldLabel>
                      <Input
                        onChange={value =>
                          this.handleChange(value, 'display_name')
                        }
                        value={this.state.display_name}
                      />
                    </FieldContainer>
                  </FieldRow>
                  <FieldRow>
                    <FieldContainer>
                      <FieldLabel>Custom Message</FieldLabel>
                      <Input
                        onChange={value =>
                          this.handleChange(value, 'custom_message')
                        }
                        value={this.state.custom_message}
                      />
                    </FieldContainer>
                  </FieldRow>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.inviteOutletWaiter} color="green">
                    Invite
                  </Button>
                  <Button onClick={this.closeInviteModal} appearance="subtle">
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </FieldContainer>
          )}

          <FieldContainer>
            {outletevents[currentOutletEvent].isDraft ? (
              <Button block color="green" onClick={this.submitEvent}>
                Create Event
              </Button>
            ) : (
              <Button block color="green" onClick={this.toggleModal}>
                Edit Event
              </Button>
            )}

            {this.state.showVenueModal && (
              <UpdateEventModal
                {...this.state}
                toggleModal={this.toggleModal}
                data={outletevents[currentOutletEvent]}
                outletlocations={outletlocations}
                updateEventRequest={updateEventRequest}
              />
            )}
          </FieldContainer>
        </DataContainer>
      </Panel>
    );
  }
}

OutletEventsForm.propTypes = {
  addEventRequest: PropTypes.func,
  outletevents: PropTypes.array,
  currentOutletEvent: PropTypes.number,
  updateEventRequest: PropTypes.func,
};
