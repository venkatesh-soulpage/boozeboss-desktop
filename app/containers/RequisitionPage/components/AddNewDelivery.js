import React, { Component } from 'react'
import {Modal, Button, Input, SelectPicker, Radio, RadioGroup, InputNumber, InputGroup, Checkbox, Divider} from 'rsuite'
import styled from 'styled-components';

const StyledButton = styled(Button)`
    margin: 0 0 0 0;
`

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1em 0 0 0;
`

const FieldDeliveryRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1em 0 0 0;
    padding: ${props => props.isFirst ? '15px' : '10px'} 0 10px 0;
    border-bottom-color: gray;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    ${props => props.isFirst && `
        border-top-color: gray;
        border-top-style: solid;
        border-top-width: 1px;
    `}
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em 0 0 0;
`;

const FieldLabel = styled.b`
    display: flex;
    flex: 1;
    margin: 0 0.5em 0.5em 0;
`;

const FieldDeliveryLabel = styled.p`
    display: flex;
    flex: ${props => props.flex || 1};
    margin: 0 0.5em 0.5em 0;
`;

const FieldDeliveryAction= styled.a`
    display: flex;
    flex: ${props => props.flex || 1};
    margin: 0 0.5em 0.5em 0;
`;

const Field = styled.div`
    display: flex;
    flex: 1;
`

const ProductsSection = styled.div`
    margin: 0.5em 0 1em 0;
`

const StatusesData = [
    {label: 'ON PROGRESS', value: 'ON PROGRESS'},
    {label: 'SENT', value: 'SENT'},
    {label: 'DELIVERED', value: 'DELIVERED'},
    {label: 'ON HOLD', value: 'ON HOLD'},

]

class AddNewDeliveryProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        product: null,
        units: null,
      };
    }


    close = () => {
        this.setState({ show: false });
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChangeProduct = (value, name) => {
        this.setState({[name]: value, base_price: value.base_price});
    }

    handleAddDeliveryProduct = () => {
        const {handleAddDeliveryProduct} = this.props;
        const {product, units} = this.state;
        handleAddDeliveryProduct({product, units});
        this.close();
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    getPickerData = () => {
        const {warehouse_id, warehouses, requisitions, currentRequisition, deliveryProducts, products} = this.props;
        const {orders} = requisitions[currentRequisition];

        if (!orders || !warehouses) return [];

        const currentWarehouse = warehouses.find(wh => wh.id === warehouse_id);
        
        if (!currentWarehouse) return [];

        const deliveryAssigned = deliveryProducts.map(del => del.product.id);
        
        return products
            .filter(prod => deliveryAssigned.indexOf(prod.id))
            .filter(prod => !prod.is_cocktail)
            .map(prod => {
            const stock = currentWarehouse.stocks.find(stock => stock.product_id === prod.id);
            return {
                label: `${prod.name} (${stock && stock.quantity > 0 ? `${stock.quantity} units available` : 'No stock available'})`,
                value: prod,
            }
        })
    }

    reset = () => {
        this.setState({order: null, units: null})
    }
    
    render() {
        const {show, product, units, order } = this.state;
        return (
            <React.Fragment>
                <StyledButton style={{marginTop: '10px'}} onClick={this.open} color="green">+ Add Products</StyledButton>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>
                                Product
                            </FieldLabel>
                            <SelectPicker 
                                value={product}
                                searchable={false}
                                cleanable={false}
                                data={this.getPickerData()}
                                onSelect={(value) => this.handleChange(value, 'product')}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>
                                Units {order && order.units ? `(Max. ${order.units})` : ''}
                            </FieldLabel>
                            <InputNumber 
                                value={units}
                                max={order && order.units}
                                onChange={(val) => this.handleChange(val, 'units')}
                            />
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={order && order.units < units} onClick={this.handleAddDeliveryProduct} color="green">
                            Add Product
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
  

const DeliveryProduct = (props) => (
    <FieldDeliveryRow isFirst={props.isFirst}>
        <FieldDeliveryLabel flex={2.5}>{props.deliveryProduct.product.name}</FieldDeliveryLabel>
        <FieldDeliveryLabel>{props.deliveryProduct.units} units</FieldDeliveryLabel>
        <FieldDeliveryAction onClick={() => props.handleRemoveDeliveryProduct(props.deliveryProduct.product.id)}>Remove</FieldDeliveryAction>
    </FieldDeliveryRow>
)


export default class AddNewDelivery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        waybill: null,
        status: null,
        warehouse_id: null,
        deliveryProducts: [],
      };
    }


    close = () => {
      this.setState({ show: false });
      this.reset();
    }

    open = () => {
      this.setState({ show: true });
    }

    handleChangeProduct = (value, name) => {
        this.setState({[name]: value, base_price: value.base_price});
    }

    handleAddDeliveryProduct = (value) => {
        this.setState({deliveryProducts: [...this.state.deliveryProducts, value]});
    }

    handleRemoveDeliveryProduct = (product_id) => {
        console.log(product_id);
        let delivery_array = this.state.deliveryProducts.slice();
        const delivery_product_ids = delivery_array.map(dp => dp.product.id);
        const remove_index = delivery_product_ids.indexOf(product_id);
        delivery_array.splice(remove_index, 1);
        this.setState({deliveryProducts: delivery_array});
    }

    handleChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleChangeWarehouse = (value, name) => {
        if (value !== this.state.warehouse_id) {
            this.setState({
                [name]:value,
                deliveryProducts: [],
            })
        } else {
            this.setState({[name]: value});
        }
    }


    getPickerData = () => {
        const {warehouses} = this.props;
        if (!warehouses || warehouses.length < 1) return []; 
        return warehouses.map(wh => {
            return {
                label: wh.name,
                value: wh.id
            }
        })
    }

    submit = () => {
        const {requisitions, currentRequisition, createRequisitionDelivery} = this.props;
        const {waybill, warehouse_id, status, deliveryProducts} = this.state;

        createRequisitionDelivery(
            requisitions[currentRequisition].id,
            {waybill, warehouse_id, status, deliveryProducts}
        );
        this.close();
    }

    reset = () => {
        this.setState({
            waybill: null,
            status: null,
            warehouse_id: null,
            deliveryProducts: []
        })
    }

    getCurrentUnits = (product_id) => {
        const {requisitions, currentRequisition} = this.props;
        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;
        

        const currentUnits = orders.reduce((acc, curr) => {

            const ingredient_ids = curr.product.ingredients.map(ing => ing.product_id);

            if ( product_id === curr.product_id ) {
                return Number(acc) + Number(curr.units);
            } else if ( ingredient_ids.indexOf(product_id) > -1 ){
                // Calculate bottles from units
                const ingredient = curr.product.ingredients.find(ing => ing.product_id === product_id );
                const totalml = ingredient.quantity * curr.units;
                const totalUnits = Math.ceil(totalml / ingredient.product.metric_amount); 
                return acc + totalUnits;
            } else {
                return acc;
            }
        }, 0);

        return currentUnits;
    }
    
    autofill = async () => {
        const {requisitions, currentRequisition, products} = this.props;
        const requisition = requisitions[currentRequisition];
        const {orders} = requisition;

        if (!requisitions) return [];
        await this.setState({deliveryProducts: []})

        // Filter the products for the brand
        // Products for brands
        const category_products = 
                orders
                    .filter(order => !order.product.is_cocktail)
                    .map(order => order.product_id);
            
        const cocktail_products_id = [];
        orders
            .filter(order => order.product.is_cocktail)
            .map(order => {
                order.product.ingredients.map(ing => {
                    cocktail_products_id.push(ing.product_id);
                })
            })   

        const all_ids = [...category_products, ...cocktail_products_id];
        const unique_products = [...new Set(all_ids)];

        for (const unique_product of unique_products) {
            const product = await products.find(prod => prod.id === unique_product);
            if (product) {
                await this.handleAddDeliveryProduct({
                    product,
                    units: this.getCurrentUnits(product.id)
                })
            }
        }
               
    }

    render() {
        const {show, waybill, status, warehouse_id, deliveryProducts } = this.state;
        return (
            <React.Fragment>
                <StyledButton onClick={this.open} color="green">+ Add Delivery</StyledButton>
        
                <Modal show={show} onHide={this.close}>
                    <Modal.Body>
                        <FieldContainer>
                            <FieldLabel>Warehouse</FieldLabel>
                            <SelectPicker 
                                value={warehouse_id}
                                searchable={false}
                                cleanable={false}
                                data={this.getPickerData()}
                                onSelect={(value) => this.handleChangeWarehouse(value, 'warehouse_id')}
                            /> 
                        </FieldContainer>
                        <Divider />
                        <FieldContainer> 
                            <FieldLabel>Products on this delivery</FieldLabel>
                            {deliveryProducts 
                            && deliveryProducts.length > 0 ? (
                                <ProductsSection>
                                    {deliveryProducts.map((deliveryProduct, index) => <DeliveryProduct deliveryProduct={deliveryProduct} isFirst={index < 1} handleRemoveDeliveryProduct={this.handleRemoveDeliveryProduct} />)}
                                </ProductsSection>
                            ) : (
                                <p>No products selected</p> 
                            )}
                            <Divider />
                            {warehouse_id && (
                                <AddNewDeliveryProduct 
                                    {...this.props}
                                    warehouse_id={warehouse_id}
                                    deliveryProducts={deliveryProducts}
                                    handleAddDeliveryProduct={this.handleAddDeliveryProduct}
                                    reset={this.reset}
                                />
                            )}
                            {warehouse_id && (
                                <Button onClick={this.autofill}>Autofill</Button>
                            )}
                        </FieldContainer>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.submit} color="green">
                        Add Delivery
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
  