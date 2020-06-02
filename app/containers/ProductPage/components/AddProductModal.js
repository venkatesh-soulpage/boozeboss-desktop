import React, { Component } from 'react';
import {
  Modal,
  Button,
  Input,
  SelectPicker,
  Radio,
  RadioGroup,
  InputNumber,
  InputGroup,
} from 'rsuite';
import styled from 'styled-components';
import CocktailBuilder from './CocktailBuilder';

const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1em 1em 1em 1em;
`;

const FieldLabel = styled.b`
  display: flex;
  flex: 1;
  margin: 0 0.5em 0.5em 0;
`;

const metricOptions = [
  {
    label: 'Liters (L)',
    value: 'l',
  },
  {
    label: 'Milliliters (ml)',
    value: 'ml',
  },
  {
    label: 'Units (U)',
    value: 'u',
  },
  {
    label: 'Killogram (Kg)',
    value: 'kg',
  },
  {
    label: 'Gram (g)',
    value: 'g',
  },
];

const typeOptions = [
  { label: 'Product', value: 'PRODUCT' },
  { label: 'Cocktail', value: 'COCKTAIL' },
  { label: 'Brand Asset', value: 'BRAND_ASSET' },
  { label: 'Mixer', value: 'MIXER' },
  { label: 'Ingredient', value: 'INGREDIENT' },
  { label: 'Consumable', value: 'CONSUMABLE' },
];

const subtypesOptions = {
  MIXER: [
    { label: 'Soda', value: 'SODA' },
    { label: 'Packed Juice', value: 'PACKED_JUICE' },
    { label: 'Fresh Juice', value: 'FRESH_JUICE' },
    { label: 'Syrup', value: 'SYRUP' },
    { label: 'Other', value: 'OTHER' },
  ],
  CONSUMABLE: [{ label: 'Consumable', value: 'CONSUMABLE' }],
  INGREDIENT: [
    { label: 'Whole Fruit', value: 'WHOLE_FRUIT' },
    { label: 'Flavoring Bitter', value: 'FLAVORING_BITTER' },
    { label: 'Other', value: 'OTHER' },
  ],
  BRAND_ASSET: [
    { label: 'Mobile Bar', value: 'MOBILE_BAR' },
    { label: 'POS', value: 'POS' },
    { label: 'Cocktail Equipment', value: 'COCKTAIL_EQUIPMENT' },
    { label: 'Other', value: 'OTHER' },
  ],
};

export default class AddProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      brandOptions: null,
      name: null,
      description: null,
      is_cocktail: false,
      brand_id: null,
      metric: 'l',
      metric_amount: 0,
      sku: null,
      base_price: 1,
      product_type: 'PRODUCT',
      product_subtype: null,
      ingredients: [],
    };
  }

  componentDidMount = () => {
    const { showProductModal } = this.props.location;

    if (showProductModal) {
      this.open();
    }
  };

  close = () => {
    this.setState({ show: false });
  };

  open = () => {
    this.setState({ show: true });
    this.getBrandPickerData();
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  addIngredient = async ingredient => {
    await this.setState({
      ingredients: [...this.state.ingredients, ingredient],
    });
    await this.getCocktailAmount();
    await this.calculateBasePrice();
  };

  getBrandPickerData = () => {
    const { brands } = this.props;
    const brandOptions = brands.map(brand => {
      return {
        label: `${brand.name} (${brand.product_type})`,
        value: brand.id,
        role: brand.name,
      };
    });
    this.setState({ brandOptions });
  };

  addProduct = () => {
    const { addProduct } = this.props;
    const {
      name,
      brand_id,
      description,
      is_cocktail,
      metric,
      metric_amount,
      sku,
      base_price,
      ingredients,
      product_type,
      product_subtype,
    } = this.state;

    // Validate depending wether is cocktail or product
    if (product_type === 'PRODUCT') {
      if (
        !name ||
        !brand_id ||
        !description ||
        !metric ||
        !metric_amount ||
        !sku ||
        !base_price ||
        !product_type
      )
        return alert('Missing fields');

      addProduct({
        brand_id,
        name,
        description,
        is_cocktail: false,
        metric,
        metric_amount,
        sku,
        base_price,
        product_type,
        product_subtype: 'SPIRIT',
      });
    }

    // Get the ingredients for the cocktail and submit
    if (product_type === 'COCKTAIL') {
      if (
        !name ||
        !description ||
        !metric ||
        !metric_amount ||
        !sku ||
        !base_price ||
        !product_type
      )
        return alert('Missing fields');
      if (!ingredients || ingredients.length < 1)
        return alert('Missing ingredients');

      const cocktail_ingredients = ingredients.map(ingredient => {
        return {
          product_id: ingredient.product.id,
          quantity: ingredient.amount,
        };
      });

      addProduct({
        brand_id,
        name,
        description,
        is_cocktail: true,
        metric: 'ml',
        metric_amount,
        sku,
        base_price,
        cocktail_ingredients,
        product_type,
        product_subtype: 'COCKTAIL',
      });
    }

    if (['BRAND_ASSET', 'CONSUMABLE'].indexOf(product_type) > -1) {
      if (
        !name ||
        !description ||
        !sku ||
        !base_price ||
        !product_type ||
        !product_subtype
      )
        return alert('Missing fields');
      addProduct({
        name,
        description,
        is_cocktail: false,
        metric: 'u',
        metric_amount: 1,
        sku,
        base_price,
        product_type,
        product_subtype,
      });
    }

    if (['MIXER', 'INGREDIENT'].indexOf(product_type) > -1) {
      if (
        !name ||
        !description ||
        !metric ||
        !metric_amount | !sku ||
        !base_price ||
        !product_type ||
        !product_subtype
      )
        return alert('Missing fields');
      addProduct({
        name,
        description,
        metric,
        metric_amount,
        is_cocktail: false,
        sku,
        base_price,
        product_type,
        product_subtype,
      });
    }

    this.reset();
  };

  getMetricTag = () => {
    const { metric } = this.state;
    if (!metric) return '(metric)';
    const selected_metric = metricOptions.find(m => m.value === metric);
    return selected_metric.label;
  };

  reset = () => {
    this.setState({
      name: null,
      description: null,
      is_cocktail: false,
      brand_id: null,
      metric: 'l',
      metric_amount: 0,
      sku: null,
      base_price: 1,
      product_type: 'PRODUCT',
      product_subtype: null,
      ingredients: [],
    });
    this.close();
  };

  getCocktailAmount = () => {
    const { ingredients } = this.state;
    if (!ingredients || ingredients.length < 0) return 0;

    const metric_amount = ingredients.reduce((acc, curr) => {
      if ('l' === curr.product.metric || 'kg' === curr.product.metric) {
        return acc + new Number(curr.amount * 1000);
      }

      if ('ml' === curr.product.metric || 'g' === curr.product.metric) {
        return acc + new Number(curr.amount);
      }
    }, 0);

    this.setState({ metric_amount });
  };

  calculateBasePrice = () => {
    const { ingredients } = this.state;
    if (!ingredients || ingredients.length < 0) return 0;

    const raw_base_price = ingredients.reduce((acc, curr) => {
      if ('l' === curr.product.metric || 'kg' === curr.product.metric) {
        let price_per_ml =
          curr.product.base_price / (curr.product.metric_amount * 1000);
        return acc + new Number(curr.amount * 1000) * price_per_ml;
      }

      if ('ml' === curr.product.metric || 'g' === curr.product.metric) {
        let price_per_ml = curr.product.base_price / curr.product.metric_amount;
        return acc + new Number(curr.amount) * price_per_ml;
      }
    }, 0);

    const base_price = Math.round(raw_base_price * 100) / 100;

    this.setState({ base_price });
  };

  goToRoute = pathname => {
    this.props.history.push({
      pathname,
      showBrandModal: true,
    });
  };

  render() {
    const {
      show,
      brandOptions,
      name,
      description,
      is_cocktail,
      metric,
      metric_amount,
      sku,
      base_price,
      ingredients,
      product_type,
      product_subtype,
    } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.open} color="green">
          + Add Product
        </Button>

        <Modal show={show} onHide={this.close}>
          <Modal.Body>
            <FieldContainer>
              <FieldLabel>Name</FieldLabel>
              <Input
                value={name}
                onChange={value => this.handleChange(value, 'name')}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Description</FieldLabel>
              <Input
                componentClass="textarea"
                rows={3}
                value={description}
                onChange={value => this.handleChange(value, 'description')}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Product Type</FieldLabel>
              <SelectPicker
                data={typeOptions}
                searchable={false}
                value={product_type}
                onChange={val => this.handleChange(val, 'product_type')}
              />
            </FieldContainer>
            {['MIXER', 'INGREDIENT', 'CONSUMABLE', 'BRAND_ASSET'].indexOf(
              product_type,
            ) > -1 && (
              <FieldContainer>
                <FieldLabel>Product Subtype</FieldLabel>
                <SelectPicker
                  data={subtypesOptions[product_type]}
                  searchable={false}
                  value={product_subtype}
                  onChange={val => this.handleChange(val, 'product_subtype')}
                />
              </FieldContainer>
            )}
            {product_type === 'PRODUCT' && (
              <FieldContainer>
                <FieldRow>
                  <FieldLabel>Brand </FieldLabel>
                  <a onClick={() => this.goToRoute('/clients')}>
                    + Add new brand
                  </a>
                </FieldRow>
                <SelectPicker
                  searchable={false}
                  data={brandOptions}
                  onChange={value => this.handleChange(value, 'brand_id')}
                />
              </FieldContainer>
            )}
            {product_type === 'COCKTAIL' && (
              <CocktailBuilder
                {...this.props}
                ingredients={ingredients}
                addIngredient={this.addIngredient}
              />
            )}
            {['PRODUCT', 'COCKTAIL', 'MIXER', 'INGREDIENT'].indexOf(
              product_type,
            ) > -1 && (
              <FieldContainer>
                <FieldLabel>Metric</FieldLabel>
                <SelectPicker
                  disabled={product_type === 'COCKTAIL'}
                  searchable={false}
                  defaultValue={metric}
                  value={product_type === 'COCKTAIL' ? 'ml' : metric}
                  data={metricOptions}
                  onChange={value => this.handleChange(value, 'metric')}
                />
              </FieldContainer>
            )}
            {['PRODUCT', 'COCKTAIL', 'MIXER', 'INGREDIENT'].indexOf(
              product_type,
            ) > -1 &&
              metric && (
                <FieldContainer>
                  <FieldLabel>Metric Amount</FieldLabel>
                  <InputGroup>
                    <InputNumber
                      disabled={product_type === 'COCKTAIL'}
                      defaultValue={metric_amount}
                      value={metric_amount}
                      onChange={value =>
                        this.handleChange(value, 'metric_amount')
                      }
                    />
                    <InputGroup.Addon>
                      {product_type === 'COCKTAIL' ? 'ml' : this.getMetricTag()}
                    </InputGroup.Addon>
                  </InputGroup>
                </FieldContainer>
              )}
            <FieldContainer>
              <FieldLabel>SKU</FieldLabel>
              <Input
                value={sku}
                onChange={value => this.handleChange(value, 'sku')}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Base Price</FieldLabel>
              <InputNumber
                defaultValue={base_price}
                value={base_price}
                step={0.01}
                onChange={value => this.handleChange(value, 'base_price')}
              />
            </FieldContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addProduct} color="green">
              Add
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
