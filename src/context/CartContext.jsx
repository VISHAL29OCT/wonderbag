import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setCart(Array.isArray(data) ? data : []))
  }, [])


  const addToCart = async (product, qty) => {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("Please login first")
      return
    }

    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        product,
        quantity: qty
      })
    })

    const data = await res.json()
    setCart(data)
  }

  const removeItem = async (id) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    })

    const data = await res.json()
    setCart(Array.isArray(data) ? data : [])
  }

  const updateQty = async (id, change) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id, change })
    })

    const data = await res.json()
    setCart(Array.isArray(data) ? data : [])
  }

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      addToCart,
      removeItem,
      cartOpen,
      setCartOpen,
      updateQty
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext