import React from 'react';
import './App.css';
import Product from './components/Product/Product';

class App extends React.Component {
  render() {
    return (
      <div className="App">

        {/* <ProductList /> */}
        <div className="products-list">
          <h2>Product List</h2>
          <div className="all-product-list">
            <Product />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
