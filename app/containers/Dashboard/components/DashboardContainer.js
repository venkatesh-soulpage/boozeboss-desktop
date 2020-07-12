import React, { Component } from 'react'
import styled from 'styled-components';
import { Panel, SelectPicker, IconButton, Icon, Alert, Button } from 'rsuite';
import DashboardHeaderRow from './DashboardHeaderRow';
import DashboardRow from './DashboardRow';
import RoleValidator from 'components/RoleValidator';
import request from 'utils/request';

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
        city_id: null,
        city_filter: [{ label: 'All Cities', value: 0}],
    }


    fetchLocationChildren = async (location_id) => {

        const {events} = this.props;
        
        const available_cities = events.filter(event => event.brief_event.venue.location_id).map(event => event.brief_event.venue.location_id);
        
        const available_locations = 
            await request(`${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/locations/${location_id}/children`, {method: 'GET'});

        if (available_locations) {
            const city_picker = [];
            available_locations
                .map(available_location => {
                    available_location.childrens.map(city => {
                        if (available_cities.indexOf(city.id) > -1) {
                            city_picker.push(city);
                        }
                    })
                })

            const city_filter =
                    city_picker.map(cp => {
                        return {
                            value: cp.id,
                            label: cp.name,
                        }
                    })

            this.setState({
                city_filter: [{ label: 'All Cities', value: 0}, ...city_filter]
            });
        }
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

    handleChangeLocation = (name, value) => {
        if (value > 0) {
            this.fetchLocationChildren(value);
            this.setState({[name]: value})
        } else {
            this.setState({
                [name]: value,
                city_filter: [{ label: 'All Cities', value: 0}],
                city_id: 0
            })
        }
        
    }

    getEvents = (events) => {
        const {location_id, city_id} = this.state;
        if (!events) return [];
        return events
            .filter(event => {
                return new Date(event.started_at).getTime() <= new Date().getTime()
            })
            .filter(event => {
                return new Date(event.ended_at).getTime() > new Date().getTime()
            })
            .filter(event => location_id > 0 ? event.brief_event.brief.client.location_id === location_id : true)
            .filter(event => city_id > 0 ? event.brief_event.venue.location_id === city_id : true)
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

    getCityData = () => {
        const {events, scope} = this.props;
        if (!events || scope !== 'BRAND') return [];

        const city_picker = [];
        events.map(event => {
            city_picker.push({
                label: event.brief_event.venue.location.name,
                value: event.brief_event.venue.location_id,
            })
        })

        return [{label: 'All Cities', value: 0}, ...city_picker];
    }

    render() {
        const {city_filter} = this.state;
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
                                    onChange={value => this.handleChangeLocation('location_id', value)}
                                />
                            </RoleValidator>
                            <RoleValidator
                                {...this.props}
                                scopes={['REGION']}
                                roles={['OWNER', 'MANAGER']}
                            >
                                <SelectPicker
                                    defaultValue={0}
                                    cleanable={false}
                                    searchable={false}
                                    style={{width: '200px', margin: '0 0 0 1em'}}
                                    data={city_filter}
                                    onChange={value => this.handleChange('city_id', value)}
                                />
                            </RoleValidator>
                            <RoleValidator
                                {...this.props}
                                scopes={['BRAND']}
                                roles={['OWNER', 'MANAGER']}
                            >
                                {events && (
                                    <SelectPicker
                                        defaultValue={0}
                                        cleanable={false}
                                        searchable={false}
                                        style={{width: '200px', margin: '0 0 0 1em'}}
                                        data={this.getCityData()}
                                        onChange={value => this.handleChange('city_id', value)}
                                    />
                                )}
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
