import React from 'react'

function Products({ product }) {
  return (
    <div className='product__card'>
        <h5>{product.title}</h5>
        <img src={product.imgUrl} alt={product.title} width={"100%"} />
        <p>{product.price}</p>
        <a href={product.link}>{product.title}</a>
    </div>
  )
}

export default Products