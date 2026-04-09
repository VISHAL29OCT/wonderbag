import React from 'react'
import { useState, useEffect, useContext } from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/cartContext'

function Checkout() {
    const { cart, setCart } = useContext(CartContext)
    const [orderSuccess, setOrderSuccess] = useState(false)
    const navigate = useNavigate()
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [state, setState] = useState("")
    const [houseno, setHouseno] = useState("")
    const [phone, setPhone] = useState("")

    const total = (cart || []).reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    )


    const handlePincode = (value) => {
        setPincode(value)
        if (value.length === 6) {
            fetch(`https://api.postalpincode.in/pincode/${value}`)
                .then(res => res.json())
                .then(data => {
                    if (data[0].Status === "Success") {
                        const postOffice = data[0].PostOffice[0]
                        setState(postOffice.State)
                    } else {
                        alert("Invalid pincode")
                    }
                })
                .catch(() => {
                    alert("Error fetching pincode data")
                })
        }
    }


    const handleProceed = () => {
  navigate("/payment", {
    state: {
      name,
      address,
      phone,
      pincode,
      state,
      houseno,
      cart,
      total
    }
  })
}


    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // ✅ FIXED
            }
        })
            .then(res => res.json())
            .then(user => {
                if (!user || !user.addresses) return
                const defaultAddr =
                    user.addresses?.find(a => a.isDefault) || user.addresses?.[0]

                if (defaultAddr) {
                    setName(defaultAddr.name)
                    setPhone(defaultAddr.phone)
                    setAddress(defaultAddr.address)
                    setState(defaultAddr.state)
                    setPincode(defaultAddr.pincode)
                    setHouseno(defaultAddr.houseno) 
                }
            })
    }, [])


    

    if (cart.length === 0 && !orderSuccess) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Your cart is empty 🛒</h2>
                <Link to="/products">
                    <button>Go Shopping</button>
                </Link>
            </div>
        )
    }

    return (
        <div className='checkout-container'>
            <div className="checkoutWrapper">

                <form id='checkoutForm' className='shipping-form'>
                    <h3>Address Details</h3>
                    <input type="text" placeholder='Full name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder='house No.' value={houseno} onChange={(e) => setHouseno(e.target.value)} />
                    <input type="text" placeholder='pincode' value={pincode} onChange={(e) => handlePincode(e.target.value)} />
                    <input type="text" placeholder='State' value={state} readOnly />
                    <input type="tel" placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </form>

                <div className="order-summary">
                    <h3>Order Summary</h3>

                    {cart.map(item => (
                        <div className='summary-item' key={item.id}>
                            <img style={{ width: "100px" }} src={item.image} alt="" />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p>
                                    price : Rs {item.price} * qty : {item.quantity}
                                </p>
                            </div>
                        </div>
                    ))}

                    <h4>Total : Rs {total.toFixed(2)}</h4>

                    <Link to="/products">
                        <button type='button'>Back</button>
                    </Link>

                    {/* <button type='submit' form='checkoutForm'>Pay Now</button> */}
                    <button type='button' onClick={handleProceed}>Proceed</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout