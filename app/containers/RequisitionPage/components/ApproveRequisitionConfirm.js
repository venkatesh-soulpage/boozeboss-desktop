import React from 'react';
import {Modal, Button, Icon} from 'rsuite';
import styled from 'styled-components';

const StyledAction = styled(Button)`
    margin: 1em 0 0 0;
    text-align: center;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

export default class ApproveRequisitionConfirm extends React.Component {
    
    state = {
        show: false,
    }

    close = () =>  {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    submit = () => {
        const {requisitions, currentRequisition, updateRequisitionStatus} = this.props;
        updateRequisitionStatus(requisitions[currentRequisition].id, 'APPROVED');
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction color="green" onClick={this.open}>Approve</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        Are you sure you want to <b>Approve</b> this Requisition?
                        We will send it to the warehouse manager. 
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submit} color="green">
                        Approve
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