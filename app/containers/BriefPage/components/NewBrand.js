import React, { Component } from 'react'
import {Modal, Button, Input, DatePicker, InputNumber, Checkbox, SelectPicker, Message} from 'rsuite'
import styled from 'styled-components';

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const FieldContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 1.5em 1em 1em 1em;
`;

const FieldLabel = styled.b`
    margin: 0 0.5em 0.5em 0;
`;

const StocksLabel = styled.p`
    margin: 0.5em 0 0.5em 0;
`;


const StyledButton = styled(Button)`
    margin: 1em 0 1em 0;
`

export default class NewProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        brandsData: null,
        brand_id: null,
        limit: 750,
      };
    }

    close = () => {
      this.setState({ show: false, brand_id: null, limit: 0});
    }

    open = () => {
      this.setState({ show: true });
      this.getPickerData();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleProductChange = (value, name) => {
        this.setState({[name]: value});
    }

    getPickerData = ()  => {
        const {brands, briefs, currentBrief } = this.props;
        if (!brands) return [];
        if (!briefs[currentBrief]) return [];

        const currentBrands = briefs[currentBrief].brands.map(brand => brand.brand_id);

        const brandsData = brands
            .filter(brand => currentBrands.indexOf(brand.id) < 0)
            .map(brand => {
                return {
                    label: `${brand.name} (${brand.product_type} - ${brand.product_subtype})`,
                    value: brand.id,
                    role: brand.name,
                }
            })
        this.setState({brandsData});
    }

    addBrand = async () => {
        const { createBriefBrand, briefs, currentBrief } = this.props;
        const {brand_id, limit} = this.state;
        createBriefBrand(briefs[currentBrief].id, {brand_id, limit});
        this.close();
    }

    goToRoute = (pathname) => {
        this.props.history.push({
            pathname,
            showProductModal: true,
        });
    }

    render() {
        const {show, brandsData, limit, brand_id} = this.state;
        return (
            <React.Fragment>
                <StyledButton onClick={this.open} color="green">+ Add Brand </StyledButton>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldRow>
                                <FieldLabel>Brand</FieldLabel>
                                <a onClick={() => this.goToRoute('/clients')}>+ Add new brand</a>
                            </FieldRow>
                            
                            <SelectPicker 
                                searchable={false}
                                data={brandsData}
                                onChange={(value) => this.handleProductChange(value, 'brand_id')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldRow>
                                <FieldLabel>Limit</FieldLabel> 
                                <FieldLabel>Approx: ~{Math.round(limit / 750 * 100) / 100} units (750ml)</FieldLabel> 
                            </FieldRow>
                            
                            <InputNumber 
                                postfix="ml"
                                step={100}
                                defaultValue={750}
                                min={100}
                                onChange={(value) => this.handleChange(value, 'limit')}
                                value={limit}
                            /> 
                        </FieldContainer>
                        <Message style={{margin: '0 1em 0 1em'}} description="All the Ingredients and POS Materials are enabled by default for the requisition"/>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.addBrand} color="green">
                        Add Brand
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
  }
  