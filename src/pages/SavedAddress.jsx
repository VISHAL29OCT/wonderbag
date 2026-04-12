import React from 'react'
import { useState, useEffect } from 'react'


function SavedAddress() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [houseno, setHouseno] = useState("")
  const [editingIndex, setEditingIndex] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [adding, setAdding] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL 

  const makeDefault = async (index) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/address/default`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ index })
    })

    const data = await res.json()
    setAddresses(data)
  }


  // load address 

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(user => setAddresses(user.addresses || []))
      .catch(err => console.log("Error loading address:", err))

  }, [API_URL])

  const handleUpdate = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/address/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        index: editingIndex,
        name,
        phone,
        address,
        state,
        pincode,
        houseno
      })
    })

    const data = await res.json()

    setAddresses(data)
    setEditingIndex(null)
  }

  const handleEdit = (addr, index) => {
    setName(addr.name)
    setPhone(addr.phone)
    setAddress(addr.address)
    setState(addr.state)
    setPincode(addr.pincode)
    setHouseno(addr.houseno)
    setEditingIndex(index)
  }

  const handleDelete = async (index) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/address/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ index })
    })

    const data = await res.json()
    setAddresses(data)
  }


  const handleAdd = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        state,
        pincode,
        houseno,
        isDefault: false,
      })
    })

    const data = await res.json()
    setAddresses(data)

    setAdding(false)
  }

  return (
    <div className="saved-address">
      <h3>Saved Addresses</h3>

      <div className="address-grid">

        {addresses.map((addr, index) => (
          <div key={index} className={`address-card ${editingIndex === index ? "editing" : ""}`} >

            {addr.isDefault && <div className="default-badge">Default</div>}

            {/* NAME */}
            {editingIndex === index ? (
              <input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <h4>{addr.name}</h4>
            )}

            {/* ADDRESS */}
            {editingIndex === index ? (
              <input value={address} onChange={(e) => setAddress(e.target.value)} />
            ) : (
              <p>{addr.houseno}, {addr.address}</p>
            )}

            {/* STATE + PIN */}
            {editingIndex === index ? (
              <>
                <input value={pincode} onChange={(e) => setPincode(e.target.value)} />
                <input value={state} onChange={(e) => setState(e.target.value)} />
              </>
            ) : (
              <p>{addr.state} - {addr.pincode}</p>
            )}

            {/* PHONE */}
            {editingIndex === index ? (
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              <p>{addr.phone}</p>
            )}

            <div className="card-actions">

              {!addr.isDefault && (
                <button onClick={() => makeDefault(index)}>
                  Default
                </button>
              )}

              {editingIndex === index ? (
                <button onClick={handleUpdate}>Save</button>
              ) : (
                <button onClick={() => handleEdit(addr, index)}>Edit</button>
              )}

              <button onClick={() => handleDelete(index)}>Delete</button>

            </div>

          </div>
        ))}

        {adding && (
          <div className="address-card">

            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input placeholder="House No" value={houseno} onChange={(e) => setHouseno(e.target.value)} />
            <input placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <input placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
            <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <button onClick={handleAdd}>Save</button>
          </div>
        )}
        <div className={`address-card add-card ${adding ? "editing" : ""} `} onClick={() => {
          setAdding(true)
          setEditingIndex(null)

          // reset form
          setName("")
          setPhone("")
          setAddress("")
          setState("")
          setPincode("")
          setHouseno("")
        }}>

          <h2>＋</h2>

          <p>Add New Address</p>

        </div>

      </div>


    </div>
  )


}

export default SavedAddress