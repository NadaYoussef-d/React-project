import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

class PrdItem extends Component {
  state = {};
  render() {
    const { product } = this.props;
    const prdData = product.data;
    return (
      <React.Fragment>
        <div className="item-medium-1">
          {product.discount ? (
            <div className="item-medium-1__alert">Sale</div>
          ) : null}
          <div
            className="item-medium-1__image image"
            style={{
              backgroundImage: "url('img/products/product-grey-1.jpg')"
            }}
          >
            <Link to="#" className="item-medium-1__action">
              Add to Cart
            </Link>
          </div>
          <Link to="#">
            {prdData.map(data => (
              <h4 key={data}>{data.name}</h4>
            ))}
            <div className="flex-row">
              <div>
                {product.discount ? <del>${product.price}</del> : null}
                <span className="lable">
                  {product.discount
                    ? product.price - product.discount
                    : product.price}
                </span>
              </div>
            </div>
          </Link>
          <div className="crud-actions">
            <Link to="#">
              <i className="far fa-eye"></i>
            </Link>
            <Link to="#">
              <i className="fas fa-edit"></i>
            </Link>
            <Link to="#">
              <i className="fas fa-trash-alt"></i>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrdItem;
