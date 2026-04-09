import './App.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
function Home() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [about, setAbout] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState("")


  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    if (!firstName || !email || !message) {
      alert("please fill required fields")
      return
    }

    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        about,
        message
      })
    })

    const data = await res.json()
  setSuccess(data.message)
  setFirstName("")
  setLastName("")
  setEmail("")
  setAbout("")
  setMessage("")
  }


  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])
  const product1 = products.find(p => p.id === 1)
  const product2 = products.find(p => p.id === 2)
  const product3 = products.find(p => p.id === 3)

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

  }, [location])

  if (products.length === 0) {
    return <h2>Loading...</h2>
  }



  return (
    <div>
      <div className='hero'>
        <h1>PLAN YOUR ADVENTURE</h1>
        <Link to="/products">
          <button>SHOP NOW</button>
        </Link>
        <div className='arrow'>
          <Link style={{ color: "white", textDecoration: "none", fontSize: "70px" }} to="/#arrow">⌵</Link>
        </div>
      </div>

      <div id='arrow' className='hero2'>
        <div className='left'>
          <h1>NEW ARRIVALS</h1>
          <Link to="/products">
            <button>SHOP NOW</button>
          </Link>
        </div>
        <div className='right'>
        </div>

      </div>

      <div className="hero3">
        <Link to="/products/backpack" className="left1">
          <h2>BAGPACK</h2>
        </Link>
        <Link to="/products/travel-pack" className="middle">
          <h2>TRAVEL BAG</h2>
        </Link>
        <Link to="/products/duffle-bag" className="right1">
          <h2> DUFFLE BAG</h2>
        </Link>

      </div>

      <div className='hero4'>
        <h1> NOW ON SALE </h1>
        <h2> upto 50% off </h2>

        <div className='hero4img'>

          <div className='hero4left'>

            <div className='imgsec'>
              <Link to={`product/${product1.id}`}>
                <img src={product1.image} alt={product1.name} />
              </Link>
            </div>
            <p className='bagname'>{product1.name}</p>
            <Link to={`product/${product1.id}`}>
              <button className='viewbtn'>VIEW DETAILS</button>
            </Link>
            <span className='oldrate'> Rs 1100</span>
            <span className='newrate'> Rs 800</span>
          </div>

          <div className='hero4middle'>
            <div className='imgsec'>
              <Link to={`product/${product2.id}`}>
                <img src={product2.image} alt={product2.name} />
              </Link>
            </div>
            <p className='bagname'>{product2.name}</p>
            <Link to={`product/${product2.id}`}>
              <button className='viewbtn'>VIEW DETAILS</button>
            </Link>
            <span className='oldrate'> Rs 1500</span>
            <span className='newrate'> Rs 1200</span>
          </div>

          <div className='hero4right'>
            <div className='imgsec'>
              <Link to={`product/${product3.id}`}>
                <img src={product3.image} alt={product3.name} />
              </Link>
            </div>
            <p className='bagname'>{product3.name}</p>
            <Link to={`product/${product3.id}`}>
              <button className='viewbtn'>VIEW DETAILS</button>
            </Link>
            <span className='oldrate'> Rs 1300</span>
            <span className='newrate'> Rs 900</span>
          </div>
        </div>


      </div>

      <div className='hero5'>
        <div id='about' className='about'>
          <h3>About Us</h3>
          <p>We provide high-quality travel bags designed for comfort, durability, and style. Our collection includes backpacks, duffle bags, and travel packs suitable for every journey. We focus on practical designs that make carrying your essentials easy and organized. Our goal is to make travel simpler and more convenient for everyone. Whether it’s a short trip or a long adventure, we have the perfect bag for you.</p>
        </div>
      </div>

      <div className='hero6'>
        <div className='form'>

          <div className='row'>
            <div className='field'>
              <label>First Name*</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div className='field'>
              <label>Last Name*</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className='field'>
            <label>Email*</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='field'>
            <label>About</label>
            <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>

          <div className='field'>
            <label>Meassage</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <div>
            <button className='sendbtn' onClick={handleSubmit}>SEND</button>
          </div>
          {success && <p style={{color:"green"}}>{success}</p>}
        </div>

        <div id='contact' className='contact'>
          <h2>CONTACT</h2>
          <p>Our team is always ready to assist you with any inquiries regarding orders, products, or support. You can reach us through email or phone, and we will get back to you as soon as possible.</p>
          <p>info@wonder.com</p>
          <p>Tel:+911234567890</p>
        </div>

      </div>



    </div>


  )
}

export default Home
