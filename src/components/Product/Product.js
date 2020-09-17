import React, { Component } from 'react'
import './Product.css';
import AddCart from '../AddCart/AddCart';

export default class Product extends Component {
    constructor() {
        super()
        this.state = {
            addcart: false,
            checkout: false,
            isLoaded: false,
            error: '',
            item: [],
            cart: [],
            myquantity: 0,
            tquantity: 0,
            price: 0,
            eachiq: 0,
        }
    }

    componentDidMount() {
        fetch('./data.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    isLoaded: true,
                    items: data
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    addItemToCartHandler = (item) => {
        if (this.state.cart.length > 0) {
            this.state.cart.map((c, index) => {
                // condition for updating value
                if (c.id == item.id) {
                    let cartCopy = [...this.state.cart]
                    cartCopy[index].tquantity += 1
                    this.setState({ cart: cartCopy }, () =>
                        console.log("updated cart2", this.state.cart)
                    )
                } else {
                    this.setState((prevState) => ({
                        cart: [...prevState.cart, item],
                    }))
                }
            }
            )
        }
        else {
            this.setState((prevState, props) => ({
                cart: [...prevState.cart, item],
            }), () =>
                console.log("updated cart1", this.state.cart)
            )
        }

        // ========================= total update ======================
        this.setState(prevState => ({
            addcart: true,
            myquantity: prevState.myquantity + 1,
            price: prevState.price + item.price,
        }))

    }

    removeCartHandler(item) {

        if (this.state.cart.length > 0) {
            this.state.cart.map((c, index) => {
                // condition for updating value
                if (c.id == item.id) {
                    let cartCopy = [...this.state.cart]
                    cartCopy[index].tquantity -= 1
                    this.setState({ cart: cartCopy })
                } else {
                    if (this.state.myquantity > 0) {

                        this.setState(prevState => ({
                            cart: [...prevState.cart, item],
                        }))
                    }
                }
            }
            )
        }
        else {
            if (this.state.myquantity > 0) {

                this.setState(prevState => ({
                    cart: [...prevState.cart, item],
                }))
            }
        }

        if (this.state.myquantity > 0) {
            this.setState(prevState => ({
                ...this.state,
                myquantity: prevState.myquantity - 1,
                price: prevState.price - item.price,
            }))
        }
    }

    getDerivedSttaeFromProps() {
        this.addItemToCartHandler()
        this.removeCartHandler()
    }

    clearCart = () => {
        this.setState({
            addcart: false,
            checkout: false,
            item: [],
            cart: [],
            myquantity: 0,
            tquantity: 0,

        })
    }

    checkoutHandler = (item) => {
        this.setState({
            checkout: true,
            price: item.price
        })
    }

    closeCheckoutHandler = () => {
        this.setState({
            checkout: false
        })
    }

    render() {
        const { items, error, isLoaded, eachiq, price, addcart, checkout, cart, myquantity } = this.state;
        console.log(' items ====', items)
        console.log('this.state.cart ===>', this.state.cart)
        // console.log('cart each quatitiy', eachiq)
        // console.log('mytquantity', myquantity)
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    {
                        items.map(item => (
                            <div className="product" key={item.id}>
                                <div className="product-img">
                                    <img src={item.image} alt="product" className="productimg" />
                                    <p>flat {item.offer} off</p>
                                </div>
                                <div className="product-details">
                                    <ul>
                                        <li>{item.brand_name}</li>
                                        <li>{item.product_name}</li>
                                        <li>{item.quatity}</li>
                                        <li>MRP: {item.mrp}</li>
                                        <li>Rs: {item.price}</li>
                                        <li className="add-cart">
                                            <button onClick={(e) => this.addItemToCartHandler(item)} >Add Cart</button>
                                            {
                                                item.tquantity > 0 ?
                                                    <button onClick={() => this.removeCartHandler(item)}>-</button>
                                                    :
                                                    <button onClick={() => this.removeCartHandler(item)} className="btn-disabled" disabled>-</button>


                                            }
                                            <button>
                                                {item.tquantity === 1 ? "0" : item.tquantity}
                                            </button>
                                            <button onClick={() => this.addItemToCartHandler(item)}>+</button>
                                        </li>
                                    </ul>
                                </div>
                                {
                                    addcart ? <AddCart
                                        quatity={myquantity} checkout={checkout} price={price}
                                        clearCart={this.clearCart}
                                        checkoutHandler={() => this.checkoutHandler(item)}
                                        closeCheckoutHandler={this.closeCheckoutHandler}
                                    />
                                        : ''
                                }
                            </div>
                        ))
                    }
                </React.Fragment>

            )
        }
    }
}
