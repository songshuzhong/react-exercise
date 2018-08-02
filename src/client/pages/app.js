import React, { Component } from 'react';
import Helmet from 'react-helmet';

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/app.css';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = { products: [] };
    this.handleSubmit = this.handleSubmit.bind( this );
    this.renderTable = this.renderTable.bind( this );
  }

  componentDidMount() {
    fetch( 'http://localhost:3000/api/products' )
      .then( res => res.json() )
      .then( products => this.setState( { products: products.products } ) );
  }

  renderTable() {
    return this.state.products.map( ( product, index ) => <tr key={ index }>
      <td>
        <img className="media-object" style={{width: '40px', height: '40px' }} src="http://localhost:3000/assets/icon.png" />
      </td>
      <td>
        <h4 className="media-heading">${ product.name }</h4>
        <p><span>${ product.manufacturer }</span> <span><a>delete</a></span></p>
      </td>
      <td>
        <p>¥ <span>${ product.price }</span></p>
      </td>
      <td><a target="_blank">Buy</a></td>
    </tr> );
  }

  handleSubmit( e ) {
    let i = new FormData( this.productForm ).entries();
    let form = {};
    for ( let [ key, value ] of i ) {
      if ( key ) {
        form[ key ] = value;
      }
    }

    fetch( 'http://localhost:3000/api/products', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        body: JSON.stringify( form )
    } )
      .then( res => res.json() )
      .then( product => {
        let products = this.state.products;

        products.push( product );
        this.setState( { products } );
      } );
    e.preventDefault();
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>Apps</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title"><span className="glyphicon glyphicon-th-list"></span> Products</h3>
                </div>
                <div className="panel-body">
                  <table id="product-list" className="table table-hover">
                    <thead>
                    <tr>
                      <th style={{width: '50px'}}></th>
                      <th>Product</th>
                      <th style={{width: '150px'}}>Price</th>
                      <th style={{width: '50px'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderTable() }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title"><span className="glyphicon glyphicon-user"></span> Create New Product</h3>
                </div>
                <div className="panel-body">
                  <form ref={ ref => this.productForm = ref } id="form">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" name="name" className="form-control" placeholder="Product name" />
                    </div>
                    <div className="form-group">
                      <label>Manufacturer</label>
                      <input type="text" name="manufacturer" className="form-control" placeholder="Manufacturer name" />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="number" name="price" className="form-control" placeholder="Product price" />
                    </div>
                    <div className="form-group">
                      <button onClick={ this.handleSubmit } className="btn btn-primary">Create</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { App };
export default App;