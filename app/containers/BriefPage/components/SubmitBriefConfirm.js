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

export default class SubmitBriefConfirm extends React.Component {
    
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
        const {briefs, currentBrief, updateBriefStatus} = this.props;

        if (briefs[currentBrief].brands.length < 1) return alert('You should add at least 1 brand.'); 
        if (briefs[currentBrief].brief_events.length < 1) return alert('You should add at least 1 event.'); 

        updateBriefStatus(briefs[currentBrief].id, 'SUBMITTED');
        this.close();
    }

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction color="green" onClick={this.open}>Submit Brief</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    <Modal.Body>
                        Are you sure you want to Submit this Brief to the agency? 
                        You won't be able to make further changes.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submit} color="green">
                        Submit
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