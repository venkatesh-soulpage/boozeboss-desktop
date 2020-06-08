import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-center: center;
    position: fixed;
    bottom: 5px;
    right: 20px;
    border-radius: 5px;
    background-color: green;
    padding: 5px;
    z-index: 99;
`

const StyledField = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 5px 0 
    ;
    color: white;
`

export default class VersioningMenu extends Component {
    render() {
        return (
            <StyledMenu>
                <StyledField>
                    <p>V{process.env.PACKAGE_VERSION}</p>
                </StyledField>
                <StyledField>
                    <Link to="/changelog" style={{color: 'white'}}>Changelog</Link>
                </StyledField>
            </StyledMenu>
        )
    }
}
