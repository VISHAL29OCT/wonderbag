import React from 'react'
import { useState } from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPasssword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const API_URL = import.meta.env.VITE_API_URL



  const handleSignup = async (e) => {
    e.preventDefault()

    //  email check 
    if (!email.includes("@")) {
      alert("enter a valid email")
      return
    }
    // password check 
    if (password.length < 6) {
      alert("password must be at least 6 characters")
      return
    }
    // confirm password
    if (password !== confirmPassword) {
      alert("password doesnot match ")
      return
    }
    // fill all details 
    if (!name || !email || !password || !confirmPassword) {
      alert("please fill all fields")
      return
    }

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
           password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }
      alert("signup Successfull")
      navigate("/SignIn")

    } catch (err) {
      console.log(err)
      alert("soomething went wrong")
    }
  }
  return (

    <div className='auth-container'>
      <h2 className='heading'>Start your journey with Wonder</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder=' Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPasssword(e.target.value)} />
        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button type='submit'>Signup</button>
      </form>
      <p>Already Have An Account ? <Link to="/SignIn"> signin</Link></p>



    </div>
  )
}

export default SignUp