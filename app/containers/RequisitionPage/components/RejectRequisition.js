import React from 'react';
import {Modal, Button, Icon} from 'rsuite';
import styled from 'styled-components';

const StyledAction = styled(Button)`
    margin: 1em 0 0 0;
    width: 150px;
    text-align: center;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

export default class RejectRequisition extends React.Component {
    
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
        const {requisitions, currentRequisition, rejectRequisition} = this.props;
        rejectRequisition(requisitions[currentRequisition].id);
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction color="green" onClick={this.open} color="red">Reject</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        The Requisition will change to <b>REJECTED</b>. The agency won't be able
                        to make further changes. You can't undo this action.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submit} color="green">
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