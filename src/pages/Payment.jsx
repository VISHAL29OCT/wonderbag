import React, { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "../App.css"
import CartContext from "../context/CartContext"


function Payment() {
    const { setCart } = useContext(CartContext)
    const { state } = useLocation()
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL 

    const [method, setMethod] = useState("COD")
    const [loading, setLoading] = useState(false)

    if (!state) {
        return <h2 style={{ textAlign: "center" }}>No data found</h2>
    }

    const { name, address, phone, pincode, state: userState, houseno, cart, total, discount } = state
    const finalTotal = total - (discount || 0)
    console.log("👉 PAYMENT PAGE DISCOUNT:", discount)

    const handlePlaceOrder = async () => {
            console.log("👉 SENDING DISCOUNT TO BACKEND:", discount)
            console.log("🔥 FUNCTION CALLED")
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!cart || cart.length === 0) {
            alert("Cart is empty ❌")
            setLoading(false)
            return
        }

        const res = await fetch(`${API_URL}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name, address, phone, pincode,
                state: userState, houseno, cart, discount
            })
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.message)
            setLoading(false)
            return
        }

        // address save
        await fetch(`${API_URL}/address`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name, phone,
                address,
                state: userState,
                pincode, houseno
            })
        })

        // remove cart items
        for (const item of cart) {
            await fetch(`${API_URL}/cart/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: item.id })
            })
        }

        setCart([])
        localStorage.removeItem("discount")
        navigate("/orders")
    }
    const handleOnlinePayment = async () => {
        const token = localStorage.getItem("token")

        // create order from backend
        const res = await fetch(`${API_URL}/create-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ amount: finalTotal })
        })

        const data = await res.json()

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: data.amount,
            currency: "INR",
            name: "Your Store",
            description: "Order Payment",
            order_id: data.id,

            method: {
                upi: true,
                card: true,
                netbanking: true,
                wallet: true
            },

            handler: async function (response) {
                // payment success
                await fetch(`${API_URL}/order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name, address, phone, pincode,
                        state: userState, houseno, cart, discount
                    })
                })
                await fetch(`${API_URL}/address`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name, phone,
                        address,
                        state: userState,
                        pincode, houseno
                    })
                })

                // 3️⃣ 🔥 CART CLEAR (YAHI LIKHNA THA)
                for (const item of cart) {
                    await fetch(`${API_URL}/cart/remove`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ id: item.id })
                    })
                }

                setCart([])
                localStorage.removeItem("discount")
                alert("Payment successful 🎉")
                navigate("/orders")
            },

            theme: {
                color: "#4F46E5"
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    return (
        <div className="payment-wrapper">

            {/* LEFT SIDE */}
            <div className="payment-left">

                {/* delivery address card */}
                <div className="card-payment">
                    <h3>Delivery Address</h3>
                    <p><b>{name}</b></p>
                    <p>{houseno}, {address}</p>
                    <p>{userState} - {pincode}</p>
                    <p>{phone}</p>
                    <button onClick={() => navigate("/checkout")} className="change">Change</button>
                </div>

                {/* payment method card */}
                <div className="card-payment">
                    <h3>Select Payment Method</h3>

                    {/* COD option */}
                    <label className="option">
                        <input
                            type="radio"
                            value="COD"
                            checked={method === "COD"}
                            onChange={() => setMethod("COD")}
                        />
                        Cash on Delivery
                    </label>

                    {/* Online option */}
                    <label className="option">
                        <input
                            type="radio"
                            value="ONLINE"
                            checked={method === "ONLINE"}
                            onChange={() => setMethod("ONLINE")}

                        />
                        Online Payment (UPI / Card)
                    </label>
                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="payment-right">
                <div className="card-payment">
                    <h3>Order Summary</h3>

                    {/* cart items list */}
                    {cart.map(item => (
                        <div key={item.id} className="item">
                            <img style={{ width: "100px" , marginBottom :"5px" }} src={item.image} alt="" />
                            <span>{item.name}</span>
                            <span>Rs {item.price} × {item.quantity}</span>
                        </div>
                    ))}

                    {/* <hr /> */}
                    <h3>Total: Rs {finalTotal}</h3>

                    {/* place order button */}
                    <button
                        className="pay-btn"
                        onClick={method === "COD" ? handlePlaceOrder : handleOnlinePayment}
                        disabled={loading}
                    >
                        {loading ? "Placing..." : method === "COD" ? "Place Order" : "Pay Now"}
                    </button>

                </div>
            </div>

        </div>

    )
}


export default Payment