import React, { Component } from 'react'
import {Modal, Button, Input, CheckTreePicker} from 'rsuite'
import styled from 'styled-components';

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
    justify-content: space-between;
`

export default class ClientManageLocation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        locations_ids: null
      };
    }

    close = () => {
      this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    parseData = () => {
        const {country} = this.props;
        if (!country) return [];
        const data = 
            country.location.childrens.map(state => {
                return {
                    label: state.name,
                    value: state.id
                }
            })
        
        return data;
    }

    handleChange = (values) => {
        console.log(values)
    }

    

    render() {
        return (
            <CheckTreePicker 
                style={{margin: '-5px 0 0 -10px'}}
                size="lg"
                appearance="subtle"
                placeholder="Manage"
                data={this.parseData()}
                block
                searchable={false}
                cleanable={false}
                onChange={this.handleChange}
            />
        );
    }
  }
  