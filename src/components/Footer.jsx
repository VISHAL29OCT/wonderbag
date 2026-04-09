import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <div className="footer">
        <div>
        <p>@2026 by VISHAL . powered and secured</p>
        </div>
        <div className='extra'>
          <Link to = "/faq">
          <u>FAQ</u>
          </Link>
          <Link to= "/groups">
          <u>Groups</u>
          </Link>
          <Link to = "/shipping">
          <u>Shipping & Charges</u>
          </Link>
          <Link to = "/terms">
          <u>Terms & Condition</u>
          </Link>
        </div>
      </div>

  )
}

export default Footer