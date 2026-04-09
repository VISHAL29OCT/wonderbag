import React from 'react'
import { useEffect, useState } from 'react'
import "../App.css"
import { Link } from 'react-router-dom'


function Myorders() {
    const [orders, setOrders] = useState([])
    const [openOrderId, setOpenOrderId] = useState(null)
   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) return

        fetch(`${API_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
                console.log("API data:", data)
                setOrders(sorted)

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            < div className='container-nav'>
                <Link to="/">
                    <h5 style={{ color: "white" }}>Home </h5>
                </Link>

                <span> /</span>
                <Link to="/myprofile">
                    <h5 style={{ color: "white" }}>Profile </h5>
                </Link>
                <span> /</span>
                <Link to="/orders">
                    <h5 style={{ color: "white" }}>Orders</h5>
                </Link>
            </div>

            <div className="orders-container">
                <h2>My Orders</h2>

                {orders.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                        No Orders Found please Order something !
                    </p>
                ) : (
                    orders.map(order => (
                        <div className="order-card" key={order._id}>

                            <div className="order-top">

                                <div>
                                    <p>Order Number</p>
                                    <h5>#{order._id}</h5>
                                </div>

                                <div>
                                    <p>Date Placed</p>
                                    <h5>{new Date(order.date).toLocaleDateString()}</h5>
                                </div>

                                <div>
                                    <p>Total Amount</p>
                                    <h5>Rs {order.total}</h5>
                                </div>

                            </div>



                            {order.cart.map((item) => (
                                <div className="order-container" key={item.id}>
                                    <div className='order-row'>

                                        <img src={item.image} alt={item.name} />
                                        <div className="order-details">
                                            <h4>{item.name}</h4>
                                            <p>Rs {item.price}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>


                                        <div className="order-status">
                                            <span>{order.status || "Delivered"}</span>
                 <button onClick={() => setOpenOrderId(openOrderId === order._id ? null : order._id)}>
                                                View Details
                                            </button>

                                            <div className="return">
                                                <button>Return</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                            {openOrderId === order._id && (
                                <div className="order-footer">
                                    <h4>Details:</h4>
                                    <p> Name : {order.name}</p>
                                    <p>Phone No.: +91{order.phone}</p>
                                    <p>Address: <b>{order.houseno}</b> / {order.address}</p>
                                    <p><b>{order.pincode} | </b>{order.state}</p>

                                </div>
                            )}

                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Myorders