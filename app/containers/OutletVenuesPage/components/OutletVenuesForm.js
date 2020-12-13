/* eslint-disable no-param-reassign */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Panel,
  Input,
  Button,
  // IconButton,
  Icon,
  TreePicker,
  Uploader,
} from 'rsuite';

import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

import UpdateVenueModal from './UpdateVenueModal';

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

export default class OutletVenuesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location_id: '',
      address: '',
      latitude: '',
      longitude: '',
      description: '',
      cover_image: '',
      menu: [],
      showVenueModal: false,
    };
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  submitVenue = async () => {
    const { outletvenues, currentOutletVenue, addVenueRequest } = this.props;
    if (outletvenues[currentOutletVenue].isDraft) {
      const {
        name,
        location_id,
        latitude,
        longitude,
        description,
        address,
        cover_image,
      } = this.state;

      const url = await this.fileToBase64(cover_image);

      addVenueRequest({
        name,
        location_id,
        latitude,
        longitude,
        description,
        address,
        cover_image: { name: cover_image.name, data: url },
      });
      this.reset();
    } else {
      //
    }
  };

  reset = () => {
    this.setState({
      name: '',
      location_id: '',
      address: '',
      latitude: '',
      longitude: '',
      description: '',
      cover_image: '',
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
    const { addMenuRequest, currentOutletVenue, outletvenues } = this.props;
    const { data: menu } = data;
    const { id } = outletvenues[currentOutletVenue];

    addMenuRequest(id, menu);
    this.setState({ menu: [] });
  };

  render() {
    const { outletvenues, currentOutletVenue, outletlocations } = this.props;
    const {
      name,
      address,
      latitude,
      longitude,
      location_id,
      menu_link,
      description,
      cover_image,
    } = outletvenues[currentOutletVenue].isDraft
      ? this.state
      : outletvenues[currentOutletVenue];

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
            <FieldLabel>Venue Name (Required)</FieldLabel>
            <Input
              onChange={value => this.handleChange(value, 'name')}
              value={name || ''}
              disabled={!outletvenues[currentOutletVenue].isDraft}
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
              disabled={!outletvenues[currentOutletVenue].isDraft}
            />
          </FieldContainer>

          <FieldContainer>
            <FieldLabel>Address</FieldLabel>
            <Input
              componentClass="textarea"
              rows={2}
              style={{ resize: 'auto' }}
              onChange={value => this.handleChange(value, 'address')}
              value={address}
              disabled={!outletvenues[currentOutletVenue].isDraft}
            />
          </FieldContainer>

          <FieldContainer>
            <FieldLabel>Description </FieldLabel>
            <Input
              componentClass="textarea"
              rows={2}
              style={{ resize: 'auto' }}
              onChange={value => this.handleChange(value, 'description')}
              value={description}
              disabled={!outletvenues[currentOutletVenue].isDraft}
            />
          </FieldContainer>

          <FieldRow>
            <FieldContainer>
              <FieldLabel>Longitude</FieldLabel>
              <Input
                onChange={value => this.handleChange(value, 'longitude')}
                value={longitude}
                disabled={!outletvenues[currentOutletVenue].isDraft}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Latitude</FieldLabel>
              <Input
                onChange={value => this.handleChange(value, 'latitude')}
                value={latitude}
                disabled={!outletvenues[currentOutletVenue].isDraft}
              />
            </FieldContainer>
          </FieldRow>

          <FieldContainer>
            <FieldLabel>Cover Image</FieldLabel>
            <Uploader
              listType="picture-text"
              autoUpload={false}
              multiple={false}
              onChange={value => {
                this.handleChange(
                  value.length ? value[0].blobFile : '',
                  'cover_image',
                );
              }}
              ref={ref => {
                this.uploader = ref;
              }}
            >
              <button type="button">
                <Icon icon="camera-retro" size="lg" />
              </button>
            </Uploader>

            {!outletvenues[currentOutletVenue].isDraft && (
              <img
                src={cover_image}
                alt={cover_image}
                hidden={!cover_image}
                style={{ width: '500px' }}
              />
            )}
          </FieldContainer>

          {!outletvenues[currentOutletVenue].isDraft && (
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
                    const doc = new jsPDF('p', 'pt', 'letter');

                    doc.addImage(qrCode.src, 'png', 50, 40, 250, 250);
                    doc.setFontSize(25);
                    doc.text(name, 50, 300);
                    doc.save(`${name}.pdf`);
                  }}
                >
                  Download
                </Button>
              </FieldContainer>
            </FieldRow>
          )}
          <FieldContainer>
            {outletvenues[currentOutletVenue].isDraft ? (
              <Button block color="green" onClick={this.submitVenue}>
                Create Venue
              </Button>
            ) : (
              <Button block color="green" onClick={this.toggleModal}>
                Edit Venue
              </Button>
            )}

            {this.state.showVenueModal && (
              <UpdateVenueModal
                {...this.state}
                toggleModal={this.toggleModal}
                data={outletvenues[currentOutletVenue]}
                outletlocations={outletlocations}
              />
            )}
          </FieldContainer>
        </DataContainer>
      </Panel>
    );
  }
}

OutletVenuesForm.propTypes = {
  addVenueRequest: PropTypes.func,
  currentOutletVenue: PropTypes.number,
  outletvenues: PropTypes.array,
  outletlocations: PropTypes.array,
};
