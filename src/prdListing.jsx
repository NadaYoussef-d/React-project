import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import PrdItem from "./prdItem";
import Category from "./category";
import { GetAllProducts } from "./services/prdService";
import { GetAllCategoryItems } from "./services/catService";
import Paging from "./paging";

class PrdListing extends Component {
  state = {
    products: [],
    category: [],
    categoryId: 0,
    pageSize: 4,
    currentPage: 1,
    searchInput: ""
  };

  async componentDidMount() {
    const { data } = await GetAllProducts();
    const { data: catData } = await GetAllCategoryItems();
    const all = { id: 0, name: "All" };
    const mainCategory = [all, ...catData];
    this.setState({ products: data, category: mainCategory });
    // console.log(this.state.products);
    // console.log(this.state.category);
  }

  handleFilter = item => {
    this.setState({ categoryId: item.id, currentPage: 1 });
    // console.log(item);
    // console.log(item.id);
    // console.log(this.state.categoryId);
  };
  handleSorting = products => {
    // products.map(prd =>  prd.data.name )
    // console.log(prd)
    // const sortedPrds = _.orderBy(products, ["name"]);
    // console.log(sortedPrds);
    console.log("sortedPrds");
  };

  handlePageChange = pg => {
    // console.log(pg);
    this.setState({ currentPage: pg });
  };
  handleSearch = e => {
    this.setState({ searchInput: e.target.value });
    console.log(e.target.value);
  };

  render() {
    let {
      products,
      category,
      categoryId,
      pageSize,
      currentPage,
      searchInput
    } = this.state;
    // console.log(currentPage);
    //search
    if (searchInput !== "") {
      products = products.filter(product =>
        product.data[0].name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    //filter by category
    if (categoryId !== 0) {
      products = products.filter(prd => prd.catId === categoryId);
    }
    //paging
    const startIndex = (currentPage - 1) * pageSize;
    const activePg = _(products)
      .slice(startIndex)
      .take(pageSize) // use take instead of slice second parameter to not cut from products array
      .value();
    console.log(activePg);

    return (
      <React.Fragment>
        <div className="container">
          {/* <!-- filters --> */}
          <section className="filters">
            {/* <!-- search box --> */}
            <div className="search-box">
              <input
                className="search-box__input"
                placeholder="Search..."
                type="text"
                name="txt_search"
                id=""
                onChange={e => this.handleSearch(e)}
              />
              <button type="submit" className="search-box__btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
            {/* <!-- filter list --> */}
            <div>
              {/* <!-- filter header --> */}
              <h5>Categories</h5>
              {category.map(cat => (
                <Category
                  key={cat.id}
                  categoryItem={cat}
                  onChange={this.handleFilter}
                />
              ))}
            </div>
            {/* <!-- related items --> */}
            <div>
              {/* <!-- title --> */}
              {/* <h5></h5> */}
              {/* <!-- small item --> */}
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>
          {/* <!-- Items --> */}
          <section className="item-listing">
            {/* <!-- tools (sorting , change view , exporting) --> */}
            <div className="item-listing__tools">
              <select
                className="form-control"
                name=""
                id=""
                onChange={() => this.handleSorting(products)}
              >
                <option value="1">Featured</option>
                <option value="2">Price low to high</option>
                <option value="3">Price high to low</option>
                <option value="4">Name</option>
              </select>
              <Link className="action-btn" to="#">
                <i className="fas fa-plus"></i>
              </Link>
            </div>
            {/* <!-- items --> */}
            <div className="item-listing__items item-listing--3items">
              {/* <!-- medium item --> */}
              {activePg.map((
                prd // repaced the (products)by activepg to run paging
              ) => (
                <PrdItem key={prd.id} product={prd} />
              ))}
            </div>
            {/* <!-- paging --> */}
            {pageSize < products.length && (
              <Paging
                count={products.length}
                pagesize={pageSize}
                current={currentPage}
                onChange={this.handlePageChange}
              />
            )}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default PrdListing;
