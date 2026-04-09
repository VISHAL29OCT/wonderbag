import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'

const ProductDetails = () => {
    const { addToCart, setCartOpen } = useContext(CartContext)
    const [wishlisted, setWishlisted] = useState(false)
    const [activeDetails, setActiveDetails] = useState(null)
    const { id } = useParams()
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}/product/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setProduct("notfound")
                } else {
                    setProduct(data)
                }
            })

    }, [id])

    const [qty, setQty] = useState(1)


    useEffect(() => {
        if(!product) return
  const token = localStorage.getItem("token")

  fetch(`${API_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const exists = data.some(item => item.id === product.id)
      setWishlisted(exists)
    })
}, [product])



    if (product === "notfound") {
        return <h2>product not found</h2>
    }

    if (!product) {
        return <h2>Loading...</h2>
    }


   const toggleWishlist = async (product) => {
  const token = localStorage.getItem("token")

  if (wishlisted) {
    // ❌ REMOVE
    await fetch(`${API_URL}/wishlist/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id: product.id })
    })
  } else {
    // ✅ ADD
    await fetch(`${API_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ product })
    })
  }

  // UI update
  setWishlisted(!wishlisted)
}

  const toggledesc = (section) => {
    setActiveDetails(activeDetails === section ? null : section);
  };



    return (
        <div className="details">
            <Link to="/">
                <h5 style={{ color: "white", display: "inline" }}>Home </h5>
            </Link>
            <span>/</span>
            <Link to={`/products/${product.category}`}>
                <h5 style={{ color: "white", display: "inline", margin: "10px" }}>{product.category} </h5>
            </Link>
            <span>/</span>
            <span>{product.name}</span>


            <div className='productdetails'>

                {/* leftpart */}
                <div className="leftimg">

                    <button className="wishlist" onClick={() => toggleWishlist(product)}>
                        {wishlisted ? "❤️" : "🤍"}
                    </button>

                    <img src={product.image} alt={product.name} />

                    <div className='review' >
                        <h2>Reviews</h2>
                        <p>{"⭐".repeat(Math.floor(product.rating))}</p>
                        <button className='reviewbtn' >Leave a review</button>
                    </div>
                </div>

                {/* rightpart */}


                <div className="rightdata">
                    <span>SKU:{product.id}</span>
                    <h2>{product.name}</h2>
                    <h4>{"⭐".repeat(Math.floor(product.rating))}</h4>
                    <h3>Rs {product.price}</h3>
                    <h5>Quantity*</h5>

                    <button className='minusbtn' onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
                    <span>{qty}</span>
                    <button className='plusbtn' onClick={() => qty < 10 && setQty(qty + 1)}>+</button>


                    <button className='addbtn' onClick={() => addToCart(product, qty)}>Add To Cart</button>


                    <button className='buybtn' onClick={() => {
                        addToCart(product, qty)
                        setCartOpen(true)
                    }}>
                        Buy now</button>



                    {/* <h5>PRODUCT DESCRIPTION :</h5> */}
                    {/* <p>A stylish and durable bag designed for everyday use and travel. It offers smart storage, comfort, and a modern look to match your lifestyle.</p> */}

                    {/* <h4>PRODUCT INFO -</h4> */}

                  

                    {/* <h4>RETURN AND REFUND POLICY</h4> */}
              
                    
                    <div className='des-details'>
                        <div className="products-info" onClick={() => toggledesc("info")}>
            Product Info
            <span>{activeDetails === "info" ? "-" : "+"}</span>
          </div>

            {activeDetails ===  "info" && (
            <div className="info-answwer">
                 <p>Water-resistant material with multiple compartments for easy organization. Lightweight, comfortable, and perfect for daily use or travel.</p>
                </div>
          )}

<div className="return-info" onClick={() => toggledesc("return")}>
  <h4>Return And Refund Policy</h4>
  <span>{activeDetails === "return" ? "-" : "+"}</span>
</div>

{activeDetails === "return" && (
  <div className="return-answer">
        <p>We offer a hassle-free return and refund policy to ensure a smooth shopping experience. If you are not satisfied with your purchase, you can request a return within 7 days of delivery. The product must be unused and in its original condition. Once approved, refunds will be processed within a few working days.</p>
  </div>
)}

                    </div>



            </div>
                </div>
        </div>
    )
}

export default ProductDetails