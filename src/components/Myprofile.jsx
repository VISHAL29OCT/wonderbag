import React from 'react'
import { useState, useEffect } from 'react'

function Myprofile() {
  const [profile, setProfile] = useState({
    firstName: "", lastName: "", email: "", phone: "", gender: "", birthday: "", country: ""
  })

  const [isEditing, setIsEditing] = useState(false)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    await fetch(`${API_URL}/myprofile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        phone: profile.phone,
        gender: profile.gender,
        birthday: profile.birthday,
        country: profile.country
      })
    })

    alert("Profile updated ")
    setIsEditing(false)
  }

  useEffect(() => {
    fetch(`${API_URL}/myprofile`, {
      headers: {
        Authorization: ` Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const names = data.name ? data.name.split(" ") : ["", ""]
        setProfile({
          firstName: names[0] || "",
          lastName: names[1] || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          birthday: data.birthday || "",
          country: data.country || ""
        })
      })

  }, [])

  return (

    <div className="myprofile-container">

      <div className="profile-card">

        <h2>My Profile</h2>

        <div className="profile-row">
          <div className="field">
            <label>First Name</label>
            <input disabled  name='firstName' value={profile.firstName} type="text" placeholder="First name" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Last Name</label>
            <input disabled name='lastName' value={profile.lastName} type="text" placeholder="Last name" onChange={handleChange} />
          </div>
        </div>

        <div className="profile-row">
          <div className="field">
            <label>Email</label>
            <input name='email' value={profile.email} disabled type="email" placeholder="Email" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Mobile No.</label>
            <input disabled={!isEditing} name='phone' value={profile.phone} type="tel" placeholder="Phone number" onChange={handleChange} />
          </div>
        </div>

        <div className="profile-row">
          <div >
            <label>Gender</label>
           <select name="gender" value={profile.gender} onChange={handleChange} disabled={!isEditing}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="field">
            <label>Birthday</label>
            <input disabled={!isEditing} name='birthday' value={profile.birthday} type="date" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Country</label>
            <input disabled={!isEditing} name='country' value={profile.country} type="text" placeholder="Country" onChange={handleChange} />
          </div>
        </div>

        <button className="save-btn"
          onClick={() => {
            if (isEditing) {
              handleSave()
            } else {
              setIsEditing(true)
            }
          }}>{isEditing ? "Save Changes" : "Edit Profile"}</button>
      </div>
    </div>
  )
}

export default Myprofile