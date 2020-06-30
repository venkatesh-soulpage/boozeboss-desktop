import React, { Component } from 'react'
import styled from 'styled-components';
import { InputNumber, IconButton, Icon, Input, DatePicker } from 'rsuite';
import RoleValidator from 'components/RoleValidator';
import moment from 'moment';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${props => props.margin || '1em 1em 1em 1em'};
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

export default class EditableField extends Component {
    
    state = {
        isEditing: false,
    }

    componentDidMount() {

    }

    formatSizeUnits = (bytes) => {
        if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1)           { bytes = bytes + " bytes"; }
        else if (bytes == 1)          { bytes = bytes + " byte"; }
        else                          { bytes = "0 bytes"; }
        return bytes;
      }

    changeEdit = async () => {
        const {updateSla, client, field_name, value} = this.props;

        // If is editing, and close the modal it triggers a change on an SLA
        if (this.state.isEditing) {
            await updateSla(
                client.id, 
                {
                    field: field_name,
                    value: this.state[field_name]

                }
            )
        } else {
            this.setState({[field_name]: value});
        }
        this.setState({isEditing: !this.state.isEditing});
    }
    
    handleChange = (new_value) => {
        const {field_name} = this.props;
        this.setState({[field_name]: new_value})
    }

    render() {
        const { field_label, field_name, value, show_label, tag_type, field_type, margin } = this.props;
        const {isEditing} = this.state;
        return (
            <React.Fragment>
                {isEditing ? (
                    <FieldContainer margin={margin}>
                        {show_label && (
                            <FieldLabel>{field_label}</FieldLabel>
                        )}
                        <FieldRow>
                            {field_type === 'number' && (
                                <InputNumber 
                                    style={{minWidth: '100px', maxWidth: '120px'}}
                                    min={0}
                                    defaultValue={value}
                                    value={this.state[field_name]}
                                    onChange={(new_value) => this.handleChange(new_value)}
                                />
                            )}
                            { field_type === 'date' && (
                                <DatePicker 
                                    style={{minWidth: '100px', maxWidth: '100%'}}
                                    defaultValue={value}
                                    value={this.state[field_name]}
                                    onChange={(new_value) => this.handleChange(new_value)}
                                />
                            )}
                            {field_type === 'text' || !field_type && (
                                <Input 
                                    style={{minWidth: '100px', maxWidth: '100%'}}
                                    defaultValue={value}
                                    value={this.state[field_name]}
                                    onChange={(new_value) => this.handleChange(new_value)}
                                />
                            )}
                            
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
                    <FieldContainer margin={margin}>
                        {show_label && (
                            <FieldLabel>{field_label}</FieldLabel>
                        )}
                        <FieldRow>
                            {field_type === 'date' && <p>{moment(value).format('DD/MM/YYYY')}</p>}
                            {field_type !== 'date' && (
                                <React.Fragment>
                                    {field_name === 'brief_attachment_limits' ? (
                                        <p>{this.formatSizeUnits(value)}</p>
                                    ) : (
                                        <React.Fragment>
                                            {(!tag_type || tag_type === 'p') && <p>{value}</p>}
                                            {tag_type === 'header' && <h3>{value}</h3>}
                                        </React.Fragment>
                                        
                                    )}
                                </React.Fragment>
                            )}
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

EditableField.defaultProps = {
    show_label: true, 
    tag_type: 'p', 
    is_number: false
}