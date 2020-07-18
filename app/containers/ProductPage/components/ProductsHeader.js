import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Checkbox, SelectPicker } from 'rsuite'
import AddProductModal from './AddProductModal';
import RoleValidator from 'components/RoleValidator';

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-between;
    flex: 1;
`

const HeaderSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.reverse ? 'flex-end' : 'flex-start'};
    flex: 1;
`

const typeOptions = [
    { label: 'Show All', value: 'ALL' },
    { label: 'Product', value: 'PRODUCT' },
    { label: 'Cocktail', value: 'COCKTAIL' },
    { label: 'Brand Asset', value: 'BRAND_ASSET' },
    { label: 'Mixer', value: 'MIXER' },
    { label: 'Ingredient', value: 'INGREDIENT' },
    { label: 'Consumable', value: 'CONSUMABLE' },
];
  
const subtypesOptions = {
    ALL: [
        { label: 'All Subtypes', value: 'ALL' },
    ],
    MIXER: [
    { label: 'All Subtypes', value: 'ALL' },
      { label: 'Soda', value: 'SODA' },
      { label: 'Packed Juice', value: 'PACKED_JUICE' },
      { label: 'Fresh Juice', value: 'FRESH_JUICE' },
      { label: 'Syrup', value: 'SYRUP' },
      { label: 'Other', value: 'OTHER' },
    ],
    CONSUMABLE: [
        { label: 'All Subtypes', value: 'ALL' }, 
        { label: 'Consumable', value: 'CONSUMABLE' }
    ],
    INGREDIENT: [
        { label: 'All Subtypes', value: 'ALL' },
        { label: 'Whole Fruit', value: 'WHOLE_FRUIT' },
        { label: 'Flavoring Bitter', value: 'FLAVORING_BITTER' },
        { label: 'Other', value: 'OTHER' },
    ],
    BRAND_ASSET: [
        { label: 'All Subtypes', value: 'ALL' },
        { label: 'Mobile Bar', value: 'MOBILE_BAR' },
        { label: 'POS', value: 'POS' },
        { label: 'Cocktail Equipment', value: 'COCKTAIL_EQUIPMENT' },
        { label: 'Other', value: 'OTHER' },
    ],
};

export default class ProductsHeader extends Component {

    handleToggle = (filter) => {
        const {toggleFilter} = this.props;
        toggleFilter(filter);
    }

    handleChangeFilter = (value, name) => {
        const {handleChange} = this.props;
        handleChange(value, name);
    }

    render() {
        const {productsEnabled, product_type_filter, product_subtype_filter} = this.props;
        return (
            <StyledHeader>
                <HeaderSection>
                    <RoleValidator
                        {...this.props}
                        scopes={['BRAND']}
                        roles={['OWNER', 'MANAGER', 'WAREHOUSE_MANAGER']}
                    >
                        <AddProductModal {...this.props}/>
                    </RoleValidator>
                </HeaderSection>
                <HeaderSection reverse>
                    <SelectPicker 
                        style={{width: 200}}
                        searchable={false}
                        cleanable={false}
                        data={typeOptions}
                        value={product_type_filter}
                        onChange={(value) => this.handleChangeFilter(value, 'product_type_filter')}
                    />
                    { ['MIXER', 'CONSUMABLE', 'INGREDIENT', 'BRAND_ASSET'].indexOf(product_type_filter) > -1 && ( 
                        <SelectPicker 
                            style={{width: 200, margin: '0 0 0 1em'}}
                            searchable={false}
                            cleanable={false}
                            data={subtypesOptions[product_type_filter]}
                            value={product_subtype_filter}
                            onChange={(value) => this.handleChangeFilter(value, 'product_subtype_filter')}
                        />
                    )}
                </HeaderSection>
            </StyledHeader>
        )
    }
}
