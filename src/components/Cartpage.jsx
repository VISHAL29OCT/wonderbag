import React from 'react'
import { useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import CartContext from '../context/cartContext'

const Cartpage = () => {
    const { cart, removeItem, updateQty, setCartOpen } = useContext(CartContext)
    const total = Array.isArray(cart) ?
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0

    const [showCoupon, setShowCoupon] = useState(false)
    const navigate = useNavigate()

    const handleCheckout = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/SignIn")
        } else {
            navigate("/checkout")
        }
    }



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
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>

                                <button className='apply' onClick={() => setShowCoupon(!showCoupon)}>Have a Promo code</button>
                                {showCoupon && (
                                    <>
                                        <input className='apply' type="text" placeholder='Enter coupan code' />
                                        <button className='apply'>Apply</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="total">
                        <h2>Estimeted total </h2>
                        <span>$ {total.toFixed(2)}</span>
                    </div>
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