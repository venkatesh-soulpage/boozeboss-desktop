import React, { Component } from 'react';
import { Drawer, Button } from 'rsuite';
import styled from 'styled-components';
import LastEventsContainer from './LastEventsContainer';

const StyledFooter = styled(Drawer.Footer)`
    padding: 0 2em 2em 2em;
`

export default class DrawerContainer extends React.Component {
    render() {
        const {show, toggleDrawer} = this.props;
        return (
            <Drawer
                placement="left"
                show={show}
                onHide={toggleDrawer}
            >
                <Drawer.Header>
                    <Drawer.Title>Last Events</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <LastEventsContainer 
                        {...this.props}
                    />
                </Drawer.Body>
                <StyledFooter>
                    <Button onClick={toggleDrawer} appearance="subtle">
                        Close
                    </Button>
                </StyledFooter>
            </Drawer>
        )
    }
}
