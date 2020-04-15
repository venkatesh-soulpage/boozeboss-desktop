import React from 'react';
import {Modal, Button, Icon} from 'rsuite';
import styled from 'styled-components';

const StyledAction = styled.p`
    margin: 2px 5px 0 5px;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

export default class DeleteVenueModal extends React.Component {
    
    state = {
        show: false,
    }

    close = () =>  {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    delete = () => {
        const {venue, deleteVenue} = this.props;
        deleteVenue(venue.id);
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction onClick={this.open}>Delete</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        Are you sure you want to delete this Venue? 
                        You won't be able to recover it.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.delete} color="red">
                        Ok
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