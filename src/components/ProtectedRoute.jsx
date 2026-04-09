import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}){
    const token = localStorage.getItem("token")
    console.log("TOKEN:",token)

    if(!token){
      console.log("Redirecting to login 🚨")
        return <Navigate to= "/SignIn" replace />
    }
  return children 
}

export default ProtectedRoute