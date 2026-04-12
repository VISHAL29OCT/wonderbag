import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../App.css"

function Wishlist() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch("https://wonderbagbackend.onrender.com/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setWishlist(Array.isArray(data) ? data : []))
  }, [])

  const removeItem = async (id) => {
    const token = localStorage.getItem("token")

    const res = await fetch("https://wonderbagbackend.onrender.com/wishlist/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    })

    const data = await res.json()
    setWishlist(data)
  }

  return (
    <>
      <div className="container-nav">
        <Link to="/">Home</Link> / Wishlist
      </div>

      <div className="wishlist-container">
        <h2>My Wishlist ❤️</h2>

        {wishlist.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            Your wishlist is empty 💔
          </p>
        ) : (
          wishlist.map(item => (
            <div className="wishlist-card" key={item.id}>

              <img src={item.image} alt={item.name} />

              <div className="wishlist-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>

              <div className="wishlist-actions">
                <button onClick={() => removeItem(item.id)}>
                  Remove ❌
                </button>

                <Link to={`/product/${item.id}`}>
                  <button>View </button>
                </Link>
              </div>

            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Wishlist