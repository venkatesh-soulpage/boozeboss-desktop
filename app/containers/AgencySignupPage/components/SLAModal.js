import React from 'react';
import {Modal, Button, Icon} from 'rsuite';
import styled from 'styled-components';

const StyledAction = styled.p`
    margin: 2px 5px 5px 5px;
    color: green;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1em 0 1em 0;
`;

const FieldLabelContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

export default class SLAModal extends React.Component {
    
    state = {
        show: false,
    }

    close = () =>  {
      this.setState({ show: false });
    }

    open = () => {
        const {handleChange, sla} = this.props;
        if (sla) {
            handleChange(true, 'sla_open');
            this.setState({ show: true });
        }
        
    }

    delete = () => {
        this.close();
    }

    render() {
        const {sla} = this.props;
        const {show} = this.state;
        return (
            <React.Fragment>
                <StyledAction onClick={this.open}>Read the Service Level Agreement (SLA)</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                    {sla && (
                        <Modal.Body>
                            <FieldContainer>
                                <FieldLabel>SLA Terms</FieldLabel>
                                <p>{sla.sla_terms}</p>
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>Hours Before Brief Creation</FieldLabel>
                                <p>{sla.sla_hours_before_event_creation}</p>
                            </FieldContainer>
                            <FieldContainer>
                                <FieldLabel>Hours Before Brief Update</FieldLabel>
                                <p>{sla.sla_hours_before_event_update}</p>
                            </FieldContainer>
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                    <Button onClick={this.delete} color="green">
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