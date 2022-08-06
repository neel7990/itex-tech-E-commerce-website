import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import "./card.css";
import moment from 'moment'
import { addItem, removeItem, updateItem } from './cartHelpers'
const Card = ({
  product,
  removeButton = false,
  cartUpdate = false,
  cartButton = true,
  showButton = true,
  de = false,
}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)
  const showStock = (qu) => {
    return qu > 0 ? (
      <span  id="s-1"className="badge badge-primary badge-pill p-2">In Stock</span>
    ) : (
      <span id="s-2"className="badge badge-danger badge-pill p-2">Out of Stock</span>
    )
  }
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }
  const showAddToCartButton = (qu) => {
    if (qu > 0) {
      return (
        cartButton && (
          <div id="btt" onClick={addToCart} className="ui positive button">
            Add to cart
          </div>
        )
      )
    } else {
      return (
        cartButton && <div id="out" className="ui negative button">Out of Stock</div>
      )
    }
  }
  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }
  const showCartUpdate = () => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
            <input
              type="number"
              value={count}
              onChange={handleChange(product._id)}
              className="form-control ml-3"
              style={{ width: '60px' }}
            />
          </div>
        </div>
      )
    )
  }
  const showCartRemove = () => {
    return (
      removeButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-outline-dark-green"
        >
          {' '}
          Remove
        </button>
      )
    )
  }
  //console.log(product);
  return (
    <div className="max-w-sm bg-stone-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 " >
      <div  className="card-header bg-dark text-white" style={{display:"flex", justifyContent:"center", fontWeight: "bolder"}}>{product.name} </div>
      <div className="card-body">
        
        {shouldRedirect(redirect)}
        
        <div id ="image"className="p-8 rounded-t-lg responsive">
          <ShowImage item={product} url="product" />
        </div>
        
        <p className="lead mt-2 responsive">
          {de === false
            ? product.description.substring(0, 60) + '...'
            : product.description}
        </p>
        <p id ="badge-1"className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white responsive">${product.price}</p>
        <p id="badge-2"className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white responsive">
          Category: {product.category && product.category.name}
        </p>
        <p id="badge-3"className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white responsive">
          Added:{moment(product.createdAt).fromNow()}{' '}
        </p>
        {showStock(product.quantity)} <br />
        <br />
        <div className="ui two buttons">
          {showButton && (
            <Link id= "btn-1"
              className="ui basic green button"
              to={`/product/${product._id}`}
            >
              View Product
            </Link>
          )}
           {/* <div className="ui basic green button" style={{borderRadius:"20px"}}><Link id= "btn-1"
              className="ui basic green button"
              to={`/product/${product._id}`}
            >
              View Product
            </Link> */}
            {/* </div> */}
                  {showAddToCartButton(product.quantity)}     
       
        </div>
        {/* <hr /> */}
        {showCartUpdate()}
        {showCartRemove()}
      </div>
    </div>
  )
}

export default Card