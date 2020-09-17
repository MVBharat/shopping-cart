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
        }
    }

    componentDidMount() {
        const URL = './data.json'
        // const URL = "https://fakestoreapi.com/products"
        fetch(URL)
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



    addToCart(item) {
        let cartInd = 0;
        let targetId = 0;
        if (this.state.cart.length <= 0) {
            this.setState({ cart: [...this.state.cart, item] });
        } else {
            this.state.cart.forEach((c, i) => {
                if (c.id === item.id) {
                    cartInd = i;
                    targetId = item.id;
                }
            });
        }
        if (targetId === item.id) {
            let copyCart = this.state.cart;
            copyCart[cartInd].tquantity += 1;
            this.setState({ cart: copyCart });
        } else {
            this.setState({ cart: [...this.state.cart, item] });
        }

        // ========================= total update ======================
        this.setState(prevState => ({
            addcart: true,
            myquantity: prevState.myquantity + 1,
            price: prevState.price + item.price,
        }))

    }

    removeFromCart(item) {
        let cartInd = 0;
        let targetId = 0;
        if (this.state.cart.length <= 0) {
            this.setState({ cart: [...this.state.cart, item] });
        } else {
            this.state.cart.forEach((c, i) => {
                if (c.id === item.id) {
                    cartInd = i;
                    targetId = item.id;
                }
            });
        }
        if (targetId === item.id) {
            let copyCart = this.state.cart;
            copyCart[cartInd].tquantity -= 1;
            this.setState({ cart: copyCart });
        } else {
            this.setState({ cart: [...this.state.cart, item] });
        }

        // ========================= total update ======================
        this.setState(prevState => ({
            addcart: true,
            myquantity: prevState.myquantity - 1,
            price: prevState.price - item.price,
        }))

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
        const { items, error, isLoaded, price, addcart, checkout, cart, myquantity } = this.state;
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
                                            <button onClick={(e) => this.addToCart(item)} >Add Cart</button>
                                            {
                                                item.tquantity > 0 ?
                                                    <button onClick={() => this.removeFromCart(item)}>-</button>
                                                    :
                                                    <button onClick={() => this.removeFromCart(item)} className="btn-disabled" disabled>-</button>


                                            }

                                            {(cart.length === 0 || cart == null) ? <button > 0 </button> :
                                                <button >
                                                    {
                                                        cart.length > 0 &&
                                                        cart.map((citem, cindex) => (
                                                            <p key={cindex}> {citem.id === item.id ? citem.tquantity : ""} </p>
                                                        ))

                                                    }
                                                </button>
                                            }
                                            <button onClick={() => this.addToCart(item)}>+</button>
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
