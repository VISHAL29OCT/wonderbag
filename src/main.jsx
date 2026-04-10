import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import Products from './pages/Products.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import { useState, useEffect, useContext } from 'react'
import Cartpage from './components/Cartpage.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/Signup.jsx'
import Profile from './components/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Checkout from './pages/Checkout.jsx'
import CartContext, { CartProvider } from './context/CartContext.jsx'
import Myorders from './components/Myorders.jsx'
import Myprofile from './components/Myprofile.jsx'
import Terms from './pages/Terms.jsx'
import SavedAddress from './pages/SavedAddress.jsx'
import Shipping from './pages/Shipping.jsx'
import Payment from './pages/Payment.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Faq from './pages/faq.jsx'

function AppContent() {

  const location = useLocation()
  const [search, setSearch] = useState("")

  const { cartOpen, setCartOpen } = useContext(CartContext)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) return

    fetch("http://localhost:3000/cart", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setCart(data))
  }, [])

  const addToCart = async (product, qty) => {
    const token = localStorage.getItem("token")

    if (!token) {
      Navigate("/SignIn")
      return
    }

    const res = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({
        product,
        quantity: qty
      })
    })

    const data = await res.json()
    setCart(data)
  }
  const hideLayout =
    location.pathname === "/SignIn" ||
    location.pathname === "/SignUp"

  return (
    <div className='page-wrapper'>
      <>

        {!hideLayout && <Navbar search={search} setSearch={setSearch} />}
        <div className="main-wrapper">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cartpage" element={<Cartpage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/shipping" element={<Shipping/>} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/faq" element={<Faq/>} />


            <Route path="/saved-address" element={
              <ProtectedRoute>
                <SavedAddress />
              </ProtectedRoute>
            } />

            <Route path="/orders" element={
              <ProtectedRoute>
                <Myorders />
              </ProtectedRoute>
            }
            />

            <Route path="/myprofile" element={
              <ProtectedRoute>
                <Myprofile />
              </ProtectedRoute>
            }
            />



            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
            />

            <Route path='/checkout' element={
              <ProtectedRoute>
                <Checkout cart={cart} setCart={setCart} />
              </ProtectedRoute>
            } />
          </Routes>
        </div>

        {cartOpen && (
          <>
            <div className='overlay' onClick={() => setCartOpen(false)}></div>
            <Cartpage />
          </>
        )}

        {!hideLayout && <Footer />}
      </>
    </div>
  )
}

function Root() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>

    </BrowserRouter>
  )
}



createRoot(document.getElementById('root')).render(<Root />)