import React from 'react';
import {Modal, Button, Icon, Input} from 'rsuite';
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

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 1em;
    ${props => props.align && `align-items: ${props.align};`}
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

export default class RequestRequisitionModifications extends React.Component {
    
    state = {
        show: false,
        comments: null,
    }

    close = () =>  {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    submit = () => {
        const {comments} = this.state;
        const {requisitions, currentRequisition, updateRequisitionStatus} = this.props;
        updateRequisitionStatus(requisitions[currentRequisition].id, {status: 'CHANGES REQUIRED', comments});
        this.close();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    render() {
        const {show, comments} = this.state;
        return (
            <React.Fragment>
                <StyledAction onClick={this.open}>Request Changes</StyledAction>
        
                <Modal backdrop="static" show={show} onHide={this.close} size="sm">
                    <Modal.Body>
                        <p style={{margin: '0 10px 10px 10px'}}>This Requisition will be marked as <b>CHANGES REQUIRED</b> and it will be sent back to the Agency.</p>
                        <FieldContainer>
                            <FieldLabel>Reason (Required)</FieldLabel>
                            <Input 
                                componentClass="textarea"
                                value={comments}
                                rows={3}
                                style={{resize: 'auto' }}
                                onChange={(value) => this.handleChange(value, 'comments')}
                            />
                        </FieldContainer>
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