import React from 'react'
import "../App.css"
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Profile from './Profile'
import { CartContext } from '../context/cartContext'
import { NavLink } from 'react-router-dom'

const Navbar = ({ search, setSearch }) => {
  const { cart, setCartOpen } = useContext(CartContext)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const totalItems = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0

  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?search=${search}`)
    }
  }


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])



  return (
    <nav className='navbar'>
      <Link to="/" className='logo'>wonder</Link>

      <ul className="navright">

        <li className='menu'>
          <NavLink to="/products" className='nav-link '>SHOP</NavLink>

          <ul className='dropdown'>
            <li><Link to="/products/backpack"  >BACKPACK</Link></li>
            <li><Link to="/products/travel-pack">TravelPacks</Link></li>
            <li><Link to="/products/duffle-bag" >Duffle Bag</Link> </li>
            <li> <Link to="/products/dufflebag" >Others</Link></li>
          </ul>
        </li>

        <li className='nav-link'>GROUP</li>
        <li><Link to="/#about" className={`nav-link ${location.hash === "#about" ? "active" : ""}`}>ABOUT</Link> </li>
        <li><Link to="/#contact" className={`nav-link ${location.hash === "#contact" ? "active" : ""}`}>CONTACT</Link> </li>

        <input className='search' type="text" placeholder='SEARCH..' value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} />

        <span className='cartimg' onClick={() => setCartOpen(prev => !prev)}>🛒<span> {totalItems || 0}</span></span>


        <span className='profile desktop-only' onClick={() => setSidebarOpen(true)}>
          👤
        </span>

        <div className="hamburger" onClick={() => setSidebarOpen(true)}>
          ☰
        </div>
      </ul>

      <div className={`sidebar3 ${sidebarOpen ? "open" : ""}`}>

        <span className="close" onClick={() => setSidebarOpen(false)}>✖</span>

        {isMobile && (
          <>
            <Link to="/products" onClick={() => setSidebarOpen(false)}>Shop</Link>
            <Link to="/#about" onClick={() => setSidebarOpen(false)}>About</Link>
            <Link to="/#contact" onClick={() => setSidebarOpen(false)}>Contact</Link>
            
          </>
        )}

        <h3>My Account</h3>
        <hr/>
        <Link to="/myprofile"onClick={() => setSidebarOpen(false)}>My Profile</Link>
        <Link to="/saved-address"onClick={() => setSidebarOpen(false)}>Saved Address</Link>
        <Link to="/orders"onClick={() => setSidebarOpen(false)}>My Orders</Link>
        <Link to="/wishlist" style={{ color: "orange" }}onClick={() => setSidebarOpen(false)}>WishList</Link>
        <Link to="/SignIn" style={{ color: "blue" }}onClick={() => setSidebarOpen(false)}>LOG OUT</Link>


      </div>

      {sidebarOpen && (
        <div className='overlay' onClick={() => setSidebarOpen(false)}> </div>
      )}
    </nav>
  )
}

export default Navbar