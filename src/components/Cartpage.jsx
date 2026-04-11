import React from 'react'
import { useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import { useContext } from 'react'
import CartContext from '../context/CartContext'


const Cartpage = () => {
    const { cart, removeItem, updateQty, setCartOpen } = useContext(CartContext)
    const total = Array.isArray(cart) ?
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0
    const [coupon, setCoupon] = useState("")
    const [discount, setDiscount] = useState(0)
    const [error, setError] = useState("")
    const [openCouponId, setOpenCouponId] = useState(null)
    const navigate = useNavigate()

    const handleCheckout = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/SignIn")
        } else {
            navigate("/checkout", {
                state: { discount }
            })
        }
    }

    const applyCoupon = () => {
        if (coupon === "SAVE10") {
            setDiscount(total * 0.1)
            localStorage.setItem("discount", total * 0.1)
            setError("")
        } else if (coupon === "FLAT50") {
            setDiscount(50)
            localStorage.setItem("discount", 50)
            setError("")
        } else {
            setDiscount(0)
            setError("Invalid coupon ❌")
        }
    }
    useEffect(() => {
    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
        setDiscount(Number(savedDiscount))
    }
}, [])

useEffect(() => {
  localStorage.removeItem("discount")
  setDiscount(0)
 
}, [cart])




    return (

        <div className='cartpage'>

            {cart.length === 0 && (
                <h2>Your cart is empty 🛒 SHOP Now </h2>

            )}


            {cart.length > 0 && (
                <>
                    <h2>Cart ({cart.length}) items </h2>
                    {cart.map((item) => (
                        <div className="cart" key={item.id}>

                            {/* left side */}
                            <div className="cartimg">
                                <img src={item.image} alt={item.name} />
                            </div>

                            {/* right side */}
                            <div className="cartdata">

                                <h4>{item.name}</h4>
                                <button onClick={() => removeItem(item.id)}>🗑︎</button>
                                <h3>Rs{item.price}</h3>

                                <div className="cartbtn">
                                    <button className='minusbtn' onClick={() => updateQty(item.id, -1)}>-</button>
                                    <span className='cartqty'>{item.quantity}</span>

                                    <button className='plusbtn' onClick={() => updateQty(item.id, 1)}>+</button>
                                    <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                                </div>

                                <button className='apply' onClick={() => setOpenCouponId(openCouponId === item.id ? null : item.id)}>Have a Promo code</button>
                                {openCouponId === item.id && (
                                    <>
                                        <input className='apply' type="text" placeholder='Enter coupon code' value={coupon} onChange={(e) => setCoupon(e.target.value)} />

                                        <button className='apply' onClick={applyCoupon}>Apply</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="total">
                        <h2>Estimated total </h2>
                        <span>Rs {(total - discount).toFixed(2)}</span>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                    <hr />
                    <p>taxes and shippping cost will be added at checkout</p>

                    {cart.length > 0 && (
                        <button className='checkout' onClick={() => {
                            setCartOpen(false);
                            handleCheckout();
                        }}>
                            CHECKOUT
                        </button>
                    )}

                    <p className='checkout2'> 🔒 Secure Checkout</p>

                </>
            )}
        </div>
    )
}

export default Cartpage