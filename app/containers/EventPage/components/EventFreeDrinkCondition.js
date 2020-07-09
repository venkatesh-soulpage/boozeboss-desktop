import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Modal, SelectPicker, InputNumber, DatePicker } from 'rsuite';
import moment from 'moment';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0 5px 0;
    flex: 1;
    ${props => props.centered && 'align-items: center;'}
`;

const FieldConditionContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100px;
    margin: 10px 25px 10px 0;
    ${props => props.centered && 'align-items: center;'}
`;

const FieldsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
    width: 100%;
    margin: 5px 0 0 0;
    ${props => props.isHeader && 'justify-content: space-between;'}
    ${props => props.isRow && `
        border-top-color: #DCDCDC;
        border-top-style: solid;
        border-top-width: 1px;
        border-bottom-color: #DCDCDC;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    `}
`;

const FieldLabelContainer = styled.div`
    display: flex;
    flex-direction: row;
`


const InfoContainer = styled.div`
  display: flex;
    flex-direction: column;
    flex: 3;
    margin: 0 2em 0 2em;
`;

const ClientsLabel = styled.p`
  font-size: 1.25em;
`;
const DataContainer = styled.div`
  display: flex;
    flex-direction: column;
`;

const FieldLabel = styled.b`
    margin: 0 0 0.5em 0;
`;

const FieldConditionLabel = styled.p`
    margin: 0 0 0.5em 0;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

const conditions = [
    {label: 'Demographic', value: 'GENDER'},
    {label: 'Drinks limit', value: 'LIMIT'},
    {label: 'Timeframe', value: 'TIMEFRAME'}
]

class ConditionModal extends Component {
    
    state = {
        show: false, 
        condition_type: null,
        min_age: null,
        max_age: null,
        gender: null,
        role_id: null,
        limit: null,
        start_time: null,
        end_time: null,
    }

    open = () => {
        this.setState({show: !this.state.show});
    }

    close = () => {
        this.setState({show: !this.state.show});
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    }

    getPickerData = () => {
        const {roles} = this.props;
        if (!roles) return [];

        const role_options = roles.map(role => {
            return {
                label: role.name,
                value: role.id,
            }
        })

        return role_options;
    }

    addCondition = () => {
        const {event, addEventCondition} = this.props;
        const {condition_type, min_age, max_age, gender, limit, start_time, end_time, role_id} = this.state;
        addEventCondition(event.event.id, {condition_type, min_age, max_age, gender, limit, start_time, end_time, role_id});
        this.close()
    }
    
    render() {
        const {show, condition_type, min_age, max_age, gender, limit, start_time, end_time, role_id} = this.state; 
        return (
            <React.Fragment>
                <Button onClick={this.open} color="green" style={{width: '200px'}}>+ Add Condition</Button>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>
                                Condition type (Required)
                            </FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={conditions}
                                style={{width: '100%'}}
                                onChange={(value) => this.handleChange('condition_type', value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Min Age
                            </FieldLabel>
                            <InputNumber 
                                min={18}
                                value={min_age}
                                onChange={(value) => this.handleChange('min_age', Number(value))}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Max Age
                            </FieldLabel>
                            <InputNumber 
                                value={max_age}
                                onChange={(value) => this.handleChange('max_age', Number(value))}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Gender
                            </FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={[
                                    {label: 'Male', value: 'MALE'},
                                    {label: 'Female', value: 'FEMALE'}
                                ]}
                                value={gender}
                                onChange={(value) => this.handleChange('gender', value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Role
                            </FieldLabel>
                            <SelectPicker 
                                searchable={false}
                                data={this.getPickerData()}
                                value={role_id}
                                onChange={(value) => this.handleChange('role_id', value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Limit
                            </FieldLabel>
                            <InputNumber 
                                value={limit}
                                min={1}
                                onChange={(value) => this.handleChange('limit', Number(value))}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Start Time
                            </FieldLabel>
                            <DatePicker 
                                value={start_time}
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={(value) => this.handleChange('start_time', value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                End Time
                            </FieldLabel>
                            <DatePicker 
                                value={end_time}
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={(value) => this.handleChange('end_time', value)}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addCondition} color="green">
                        Add Condition
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}


export default class EventFreeDrinkCondition extends Component {

    handleRemove = () => {
        const {event, removeEventCondition} = this.props;
        removeEventCondition(event.event.id);
    }

    render() {
        const {event} = this.props;
        return (
            <FieldContainer>
                <FieldsRow isHeader>
                   <FieldLabelContainer>
                        <FieldLabel>
                            Free Drinks ({event && event.event.free_redemeed_drinks} redeemed)
                        </FieldLabel>
                    </FieldLabelContainer> 
                   <FieldLabelContainer>
                        {event && new Date(event.event.started_at).getTime() >= new Date().getTime() && (
                            <ConditionModal 
                                {...this.props}
                            />
                        )}
                    </FieldLabelContainer> 
                </FieldsRow>
                <FieldsRow>
                    {event && 
                        event.event.condition ? (
                            <FieldsRow isRow>
                                <FieldConditionContainer>
                                    <FieldLabel>
                                        Type
                                    </FieldLabel>
                                    <FieldConditionLabel>
                                        {event.event.condition.condition_type}
                                    </FieldConditionLabel>
                                </FieldConditionContainer>
                                {event.event.condition.min_age && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            Min Age
                                        </FieldLabel>
                                        <FieldConditionLabel>
                                            {event.event.condition.min_age}
                                        </FieldConditionLabel>
                                    </FieldConditionContainer>
                                )}
                                {event.event.condition.max_age && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            Max Age
                                        </FieldLabel>
                                        <FieldConditionLabel>
                                            {event.event.condition.max_age}
                                        </FieldConditionLabel>
                                    </FieldConditionContainer>
                                )}
                                {event.event.condition.limit && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            Limit
                                        </FieldLabel>
                                        <FieldConditionLabel>
                                            {event.event.condition.limit}
                                        </FieldConditionLabel>
                                    </FieldConditionContainer>
                                )}
                                {event.event.condition.gender && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            Gender
                                        </FieldLabel>
                                        <FieldConditionLabel>
                                            {event.event.condition.gender}
                                        </FieldConditionLabel>
                                    </FieldConditionContainer>
                                )}
                                {event.event.condition.role && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            Role
                                        </FieldLabel>
                                        <FieldConditionLabel>
                                            {event.event.condition.role.name}
                                        </FieldConditionLabel>
                                    </FieldConditionContainer>
                                )}
                                {event.event.condition.start_time && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            Start Time
                                        </FieldLabel>
                                        <FieldConditionLabel>
                                            {moment(event.event.condition.start_time).format('DD/MM/YYYY LT')}
                                        </FieldConditionLabel>
                                    </FieldConditionContainer>
                                )}
                                {event.event.condition.end_time && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            End Time
                                        </FieldLabel>
                                        <FieldConditionLabel>
                                            {moment(event.event.condition.end_time).format('DD/MM/YYYY LT')}
                                        </FieldConditionLabel>
                                    </FieldConditionContainer>
                                )}
                                {new Date(event.start_time).getTime() >= new Date().getTime() && (
                                    <FieldConditionContainer>
                                        <FieldLabel>
                                            Action
                                        </FieldLabel>
                                        <a onClick={this.handleRemove}>Remove</a>
                                    </FieldConditionContainer>
                                )}
                                
                            </FieldsRow>
                        ) : (
                            <FieldContainer>
                                <p>No condition</p>
                            </FieldContainer>
                        )}
                </FieldsRow>
            </FieldContainer>
        )
    }
}
