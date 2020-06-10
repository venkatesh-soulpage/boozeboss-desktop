import React, { Component } from 'react'
import {Panel, Message, Table} from 'rsuite';
import styled from 'styled-components';
import LocationsAddNew from './LocationsAddNew';

const { Column, HeaderCell, Cell } = Table;

const StyledMessage = styled(Message)`
`

const LocationsSection = styled.div`
    margin: 1em 0 0 0;
`


export default class LocationsPage extends Component {
    render() {
        const {locations, dismiss, error, success} = this.props;
        return (
            <React.Fragment>
                {error && <StyledMessage showIcon closable type="error" description={error} onClose={() => dismiss('error')}/>}
                {success && <StyledMessage showIcon closable type="success" description={success} onClose={() => dismiss('success')} />}
                <Panel bordered>
                    <b>Locations</b>
                    <LocationsSection>
                        {!locations || locations.length < 1 && (
                            <StyledMessage type="info" description="No locations" />
                        )}
                        {locations && locations.length > 0 && (
                            <Table
                                data={locations}
                                autoHeight
                            >
                                <Column>
                                    <HeaderCell>
                                        Name
                                    </HeaderCell>
                                    <Cell dataKey="name">
                                        {rowData => rowData.name}
                                    </Cell>
                                </Column>
                                <Column>
                                    <HeaderCell>
                                        Currency
                                    </HeaderCell>
                                    <Cell dataKey="currency">
                                        {rowData => rowData.currency}
                                    </Cell>
                                </Column>
                                <Column>
                                    <HeaderCell>
                                        Is Country
                                    </HeaderCell>
                                    <Cell dataKey="is_country">
                                        {rowData => rowData.is_country ? 'Yes' : 'No'}
                                    </Cell>
                                </Column>
{/*                                 <Column>
                                    <HeaderCell>
                                        Parent
                                    </HeaderCell>
                                    <Cell dataKey="parent_location">
                                        {rowData => rowData.parent_location ? <a>{rowData.parent.name}</a> : 'N/A'}
                                    </Cell>
                                </Column> */}
                                <Column>
                                    <HeaderCell>
                                        ID CARD
                                    </HeaderCell>
                                    <Cell dataKey="verification">
                                        {rowData => rowData.id_card_available ? 'Yes' : 'No'}
                                    </Cell>
                                </Column>
                                <Column>
                                    <HeaderCell>
                                        Passport
                                    </HeaderCell>
                                    <Cell dataKey="verification">
                                        {rowData => rowData.passport_available ? 'Yes' : 'No'}
                                    </Cell>
                                </Column>
                                <Column>
                                    <HeaderCell>
                                        Actions
                                    </HeaderCell>
                                    <Cell dataKey="actions">
                                        Edit | Delete
                                    </Cell>
                                </Column>
                            </Table>
                        )}
                        <LocationsAddNew {...this.props}/>
                    </LocationsSection>
                </Panel>
            </React.Fragment>
        )
    }
}
