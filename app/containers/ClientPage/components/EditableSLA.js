import React, { Component } from 'react'
import styled from 'styled-components';
import { InputNumber, IconButton, Icon } from 'rsuite';
import RoleValidator from 'components/RoleValidator';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export default class EditableSLA extends Component {
    
    state = {
        isEditing: false,
    }

    componentDidMount() {
        const {field_name, value} = this.props;
        this.setState({[field_name]: value});
    }

    changeEdit = async () => {
        const {updateSla, client, field_name} = this.props;

        // If is editing, and close the modal it triggers a change on an SLA
        if (this.state.isEditing) {
            await updateSla(
                client.id, 
                {
                    field: field_name,
                    value: this.state[field_name]

                }
            )
        }

        this.setState({isEditing: !this.state.isEditing});
    }
    
    handleChange = (new_value) => {
        const {field_name} = this.props;
        this.setState({[field_name]: new_value})
    }

    render() {
        const { field_label, field_name, value } = this.props;
        const {isEditing} = this.state;
        return (
            <React.Fragment>
                {isEditing ? (
                    <FieldContainer>
                        <FieldLabel>{field_label}</FieldLabel>
                        <FieldRow>
                            <InputNumber 
                                style={{width: '75px'}}
                                defaultValue={value}
                                value={this.state[field_name]}
                                onChange={(new_value) => this.handleChange(new_value)}
                            />
                            <RoleValidator
                                {...this.props}
                                scopes={['ADMIN']}
                                roles={['ADMIN']}
                            >
                                <IconButton onClick={this.changeEdit} icon={<Icon icon="check" />}/>
                            </RoleValidator>              
                        </FieldRow>
                        
                    </FieldContainer>
                ) : (
                    <FieldContainer>
                        <FieldLabel>{field_label}</FieldLabel>
                        <FieldRow>
                            <p>{value}</p>
                            <RoleValidator
                                {...this.props}
                                scopes={['ADMIN']}
                                roles={['ADMIN']}
                            >
                                <IconButton onClick={this.changeEdit} icon={<Icon icon="edit" />}/>
                            </RoleValidator>
                        </FieldRow>
                    </FieldContainer>
                )}
            </React.Fragment>
        )
    }
}
