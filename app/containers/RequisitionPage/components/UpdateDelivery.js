import React from 'react';
import {Modal, Button, Icon, Input} from 'rsuite';
import styled from 'styled-components';

const StyledAction = styled(Button)`
    margin: -2em 0 0 0;
    text-align: center;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0em;
    min-width: 250px;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

export default class UpdateDelivery extends React.Component {
    
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

    handleChangeComments = (comments) => {
        this.setState({comments}) 
    }

    submit = () => {
        const {requisitions, currentRequisition, updateRequisitionDelivery, delivery, status} = this.props;
        const {comments} = this.state;
        updateRequisitionDelivery(
            requisitions[currentRequisition].id,
            delivery.id,
            {status, comments}
        );
        this.close();
    }

    render() {
        const {text, status, is_dispute, color} = this.props;
        const {show, comments} = this.state;
        return (
            <React.Fragment>
                <StyledAction color={color} onClick={this.open} block>{text}</StyledAction>
                {is_dispute ? (
                    <Modal backdrop="static" show={show} onHide={this.close} size="xs">
                        <Modal.Body>
                            <p>
                                The Delivery will change to <b>{status}</b> status.
                                Do you want to proceed?
                            </p>
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
                ) : (
                    <Modal backdrop="static" show={show} onHide={this.close}>
                        <Modal.Body>
                            <FieldContainer>
                                <FieldLabel>Dispute Reason</FieldLabel>
                                <Input
                                    componentClass="textarea"
                                    rows={3}
                                    style={{resize: 'auto' }}
                                    value={comments}
                                    onChange={(val) => this.handleChangeComments(val)}
                                />
                            </FieldContainer>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.submit} color="green">
                            Dispute
                        </Button>
                        <Button onClick={this.close} appearance="subtle">
                            Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </ React.Fragment>
        );
    }
  }