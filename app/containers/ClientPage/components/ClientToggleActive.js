import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker} from 'rsuite'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const styles = {
    width: '300px',
    margin: '0.75em 0 0 0'
  }

export default class ClientToggleActive extends React.Component {
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

    toggleActiveClient = async () => {
        const {updateSla, client} = this.props;
        const {active} = client;
        await updateSla(client.id, {field: 'active', value: !active});
        this.close();
    }

    render() {
        const {client} = this.props;
        const {show} = this.state;
        return (
            <React.Fragment>
                {client.active ? (
                  <Button onClick={this.open} color="red">Suspend</Button>
                ) : (
                  <Button onClick={this.open}>Enable</Button>
                )}
        
                <Modal show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                      {client.active ? (
                        <React.Fragment>
                          <p>Are you sure you want to <b>suspend</b> this client?</p>
                          <p>This client will lose all access to the following resources:</p>
                          <br />
                          <ul>
                            <li>Agencies</li>
                            <li>Briefs</li>
                            <li>Requisitions</li>
                            <li>Products</li>
                            <li>Stocks</li>
                            <li>Reports</li>
                          </ul>
                          <br />
                          <p>You can renable access later.</p>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <p>Are you sure you want to <b>enable</b> this client?</p>
                          <p>This client will gain all access to the following resources:</p>
                          <br />
                          <ul>
                            <li>Agencies</li>
                            <li>Briefs</li>
                            <li>Requisitions</li>
                            <li>Products</li>
                            <li>Stocks</li>
                            <li>Reports</li>
                          </ul>
                          <br />
                          <p>You can suspend access later.</p>
                        </React.Fragment>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                    {client.active ? (
                      <Button onClick={this.toggleActiveClient} color="red">
                          Suspend
                      </Button>
                    ) : (
                      <Button onClick={this.toggleActiveClient} color="green">
                          Enable
                      </Button>
                    )}
                    
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  