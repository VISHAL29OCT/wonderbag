import React from 'react'
import { useState } from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.message)
        return
      }
      alert("login successful")
      localStorage.setItem("token",data.token)
      navigate("/")
    } catch (err) {
      console.log(err)
      alert("something went wrong")
    }
  }

  return (
    <div className='auth-container'>
      <div className='heading'>HEY! Welcome Back ,Please Sign In</div>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder=' Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>SIGN IN</button>

      </form>
      <p>Don't Have An Account ?<Link to="/SignUp" href="/SignUp">Create Account</Link></p>
    </div>
  )
}

export default SignIn