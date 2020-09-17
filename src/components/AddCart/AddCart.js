import React from 'react'
import Checkout from '../Checkout/Checkout';
import "./AddCart.css";
import checkmark from '../../checkmark.png'
function AddCart(props) {
    // console.log('props from addcart', props)

    return (
        <React.Fragment>
            {
                props.checkout ?

                    <div className="popupModal">
                        <h2>Checkout</h2>
                        <img src={checkmark} alt="checkmark" className="checkmark-icon" />
                        <p>
                            Total Price of Rs {props.price}-/ paid successfully

                        </p>
                        <button onClick={props.closeCheckoutHandler} className="closeButton">x</button>
                    </div>
                    : ''
            }


            <div className="addcart">
                <span className="cart-qp">
                    <button>Qty: {props.quatity}</button>
                    <button>Total Price: {props.price}</button>
                </span>
                <div className="flexgap"></div>
                <div className="cart-cc">

                    <button onClick={props.clearCart}>Clear Cart</button>
                    <button onClick={props.checkoutHandler}>Checkout</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddCart
