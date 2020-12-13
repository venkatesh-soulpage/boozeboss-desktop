/* eslint-disable camelcase */
import React from 'react';
import { Modal, Button, Input } from 'rsuite';
import styled from 'styled-components';

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

const StyledButton = styled(Button)`
  display: flex;
  margin: 1em 0 0 0;
  align-self: flex-end;
`;

export default class OutletManagerInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      owner_email: '',
      display_name: '',
      custom_message: '',
    };
  }

  //   componentDidMount = () => {
  //     const { showModal } = this.props.location;

  //     if (showModal) {
  //       this.open();
  //     }
  //   };

  close = () => {
    this.setState({ show: false });
  };

  open = () => {
    this.setState({ show: true });
    this.getPickerData();
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  inviteOutletManager = async () => {
    const { inviteOutletManager } = this.props;
    const { owner_email, display_name, custom_message } = this.state;

    inviteOutletManager({
      owner_email,
      display_name,
      custom_message,
    });
    this.close();
  };

  render() {
    const { owner_email, display_name, custom_message, show } = this.state;
    return (
      <React.Fragment>
        <StyledButton onClick={this.open}>+ Invite Outlet Manager</StyledButton>

        <Modal show={show} onHide={this.close}>
          <Modal.Body>
            <FieldRow>
              <FieldContainer>
                <FieldLabel>Owner Email</FieldLabel>
                <Input
                  onChange={value => this.handleChange(value, 'owner_email')}
                  value={owner_email}
                />
              </FieldContainer>
            </FieldRow>
            <FieldRow>
              <FieldContainer>
                <FieldLabel>Display Name</FieldLabel>
                <Input
                  onChange={value => this.handleChange(value, 'display_name')}
                  value={display_name}
                />
              </FieldContainer>
            </FieldRow>
            <FieldRow>
              <FieldContainer>
                <FieldLabel>Custom Message</FieldLabel>
                <Input
                  onChange={value => this.handleChange(value, 'custom_message')}
                  value={custom_message}
                />
              </FieldContainer>
            </FieldRow>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.inviteOutletManager} color="green">
              Invite
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
