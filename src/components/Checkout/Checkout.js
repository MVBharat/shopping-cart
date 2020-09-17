import React from 'react';
import './Checkout.css';

function Checkout(props) {
    console.log('checkout from checkout', props.checkout)
    return (props.checkout ?

        <div className="popupModal">
            {props.price}
            <button onClick={props.closeCheckoutHandler} className="closeButton">x</button>
        </div>
        : ''
    )
}

export default Checkout
