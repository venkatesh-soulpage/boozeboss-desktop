import React from 'react';
import {Modal, Button, Icon, IconButton} from 'rsuite';
import styled from 'styled-components';

const StyledAction = styled(IconButton)`
`

export default class DeleteBriefEventConfirm extends React.Component {
    
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
        const {deleteBriefEvent, brief, event} = this.props;
        await deleteBriefEvent(brief.id, event.id);
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction onClick={this.open} icon={<Icon icon="trash"/>} />
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        Are you sure you want to delete this brief event
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submit} color="red">
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