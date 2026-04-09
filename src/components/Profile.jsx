import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Profile({ setProfileOpen }) {
    const navigate = useNavigate()
    const handlelogout = () => {
        localStorage.clear()
        navigate("/SignIn")
    }
    const handleProtectedNav = (path) => {
        setProfileOpen(false)
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/SignIn")
        } else {
            navigate(path)
        }
    }
    return (
        <div className="profile-container">
            <div className='sidebar2'>
                <h3>My Account</h3>
                <span>__________________</span>
                <p onClick={() => 
                    handleProtectedNav("/myprofile")
                }
                    >
                    My Profile
                </p>
                <p onClick={() => handleProtectedNav("/orders")}>
                    My Orders
                </p>

                <p onClick={() => handleProtectedNav("/saved-address")}>
                    Saved Address
                </p>
                <p onClick={() => handleProtectedNav("/wishlist")}>
                    My WhisList
                </p>
                <p onClick={handlelogout} style={{ color: "black", textDecoration: "none", cursor: "pointer" }}>Logout</p>
            </div>



        </div>
    )
}

export default Profile