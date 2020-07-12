import React, { Component } from 'react';
import styled from 'styled-components';
import { SelectPicker } from 'rsuite';

const StyledFilters = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1em 0 1em 0;
    z-index: 99;
`


export default class ClientFilter extends Component {

    getOrganizations = () => {
        const { organizations } = this.props;
        if (!organizations) return [];

        const data = organizations.map(org => {
            return {
                label: org.name,
                value: org.id
            }
        })

        return [
            {label: 'No Organization', value: 'NO_ORG' },
            ...data
        ]
    }

    handleChange = (organization_id) => {
        const { changeOrganizationFilter, handleSelectCurrentClient } = this.props;
        handleSelectCurrentClient(0);
        changeOrganizationFilter(organization_id);
     }

    render() {
        return (
            <StyledFilters>
                <SelectPicker 
                    placeholder="Filter by Organization"
                    style={{width: '100%', zIndex: 999}}
                    data={this.getOrganizations()}
                    onChange={(value) => this.handleChange(value)}
                    onClean={() => this.handleChange(null)}
                />
            </StyledFilters>
        )
    }
}
