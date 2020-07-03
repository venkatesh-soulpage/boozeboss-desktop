import React, { Component } from 'react'
import styled from 'styled-components';
import { Panel, SelectPicker, IconButton, Icon, Alert, Button } from 'rsuite';
import DashboardHeaderRow from './DashboardHeaderRow';
import DashboardRow from './DashboardRow';
import RoleValidator from 'components/RoleValidator';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0 0 0;
    width: 100%;
`

const SyledPanel = styled(Panel)`
    min-width: 80%;
    height: 100%;
    overflow-y: auto;
`

const StyledPanelHeader = styled.div`
    display: flex;
    flex-direction: row;
    height: 75px;
`

const PanelHeaderColumn = styled.div` 
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    justify-content: ${props => props.justify || 'flex-start'};
`

const StyledDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70vh;
    overflow-y: scroll;
`

const StyledNoData = styled.div`
    display: flex; 
    margin: 3em 0 0 0;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    flex: 1;

`

export default class DashboardContainer extends Component {

    state = {
        location_id: 0,
    }

    

    getPickerData = () => {
        const {clients} = this.props;
        if (!clients) return [];

        const data = 
            clients.map(client => {
                return {
                    label: client.location.name,
                    value: client.location.id
                }
            })

        return [
            { label: 'All Locations', value: 0},
            ...data
        ];
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    getEvents = (events) => {
        const {location_id} = this.state;
        if (!events) return [];
        return events.filter(event => location_id > 0 ? event.brief_event.brief.client.location_id === location_id : true)
    }

    refreshAnalytics = () => {
        const {scope, getOrganizationAnalytics, getClientsAnalytics} = this.props;
        if (scope === 'REGION') {
          getOrganizationAnalytics();
        }
        if (scope === 'BRAND') {
          getClientsAnalytics();
        }

        setTimeout(() => {
            Alert.success('Data updated', 1500)
        }, 500)
    }

    render() {

        const {events, toggleDrawer} = this.props;
        const filtered_events = this.getEvents(events);
        return (
            <StyledContainer>
                <SyledPanel shaded>
                    <StyledPanelHeader> 
                        <PanelHeaderColumn >
                            <Button onClick={toggleDrawer}>Last Events</Button>
                            <IconButton icon={<Icon icon="refresh" />} onClick={this.refreshAnalytics}/>
                        </PanelHeaderColumn>
                        <PanelHeaderColumn />
                        <PanelHeaderColumn justify="flex-end" >
                            <RoleValidator
                                {...this.props}
                                scopes={['REGION']}
                                roles={['OWNER', 'MANAGER']}
                            >
                                <SelectPicker
                                    defaultValue={0}
                                    cleanable={false}
                                    searchable={false}
                                    style={{width: '200px'}}
                                    data={this.getPickerData()}
                                    onChange={value => this.handleChange('location_id', value)}
                                />
                            </RoleValidator>
                        </PanelHeaderColumn>
                    </StyledPanelHeader>
                    <DashboardHeaderRow />
                    <StyledDataContainer>
                        {filtered_events &&
                            filtered_events.length > 0 && 
                                filtered_events
                                    .map(event => {
                                        return (
                                            <DashboardRow event={event} />
                                        )
                                })
                        }
                        {filtered_events &&
                            filtered_events.length < 1 && 
                                (
                                    <StyledNoData>
                                        <b>No data for this location</b>
                                    </StyledNoData>
                                )
                        }

                    </StyledDataContainer>
                </SyledPanel>
            </StyledContainer>
        )
    }
}
