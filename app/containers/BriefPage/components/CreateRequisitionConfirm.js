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

export default class CreateRequisitionConfirm extends React.Component {
    
    state = {
        show: false,
    }

    close = () =>  {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    submit = async () => {
        const {briefs, currentBrief, createRequisition} = this.props;
        await createRequisition(briefs[currentBrief].id);
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction color="green" onClick={this.open}>Create Requisition</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        Are you sure you want to create a Requisition Draft for this Brief? 
                        The brief status will be updated to <b>On Progress</b>.
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