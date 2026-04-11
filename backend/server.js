const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas connected "))
    .catch(err => console.log(err))

const express = require('express')
const Razorpay = require("razorpay")

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})
const app = express()
const port = 3000
const cors = require("cors")
const orderSchema = new mongoose.Schema({
    userId: String,
    name: String,
    address: String,
    phone: String,
    cart: Array,
    state: String,
    pincode: String,
    houseno: String,
    total: Number,
    date: {
        type: Date,
        default: Date.now
    }
})
const Order = mongoose.model("Order", orderSchema)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    birthday: String,
    country: String,


    addresses: [
        {
            name: String,
            phone: String,
            address: String,
            state: String,
            pincode: String,
            houseno: String,
            isDefault: { type: Boolean, default: false }
        }
    ]
}


)
const User = mongoose.model("User", userSchema)

const cartSchema = new mongoose.Schema({
    userId: String,
    items: Array
})
const Cart = mongoose.model("Cart", cartSchema)

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const wishlistSchema = new mongoose.Schema({
  userId: String,
  items: Array
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    about: String,
    message: String
})

const Contact = mongoose.model("Contact", contactSchema)


const products = [
    {
        id: 1,
        name: "Canvas Backpack",
        category: "backpack",
        price: 800,
        tag: "new",
        image: "/img1.png",
        rating: 4.5
    },

    {
        id: 2,
        name: "Urban Travel Pack",
        category: "travel-pack",
        price: 1200,
        image: "/img2.png",
        rating: 4.8
    },

    {
        id: 3,
        name: "Explorer Duffle-Bag",
        category: "duffle-bag",
        price: 905,
        image: "/img4.png",
        rating: 4.4
    },

    {
        id: 4,
        name: "Adventure Backpack",
        category: "backpack",
        price: 1100,
        tag: "new",
        image: "/img3.png",
        rating: 4.9
    },

    {
        id: 5,
        name: "Compact Travel Pack",
        category: "travel-pack",
        price: 700,
        image: "/img13.png",
        rating: 4.1
    },

    {
        id: 6,
        name: "Heavy Duty Duffle",
        category: "duffle-bag",
        price: 1400,
        image: "/img6.png",
        rating: 4.7
    },

    {
        id: 7,
        name: "Hiking Backpack",
        category: "backpack",
        price: 1300,
        image: "/img15.png",
        rating: 4.6
    },

    {
        id: 8,
        name: "Premium Travel Pack",
        category: "travel-pack",
        price: 1050,
        tag: "new",
        image: "/img18.png",
        rating: 4.9
    },

    {
        id: 9,
        name: "Lightweight Duffle",
        category: "duffle-bag",
        price: 650,
        image: "/img6.png",
        rating: 4.0
    },

    {
        id: 10,
        name: "Classic Backpack",
        category: "backpack",
        price: 705,
        image: "/img3.png",
        rating: 4.3
    },

    {
        id: 11,
        name: "Weekend Travel Pack",
        category: "travel-pack",
        price: 900,
        image: "/img11.png",
        rating: 4.5
    },

    {
        id: 12,
        name: "Sport Duffle-Bag",
        category: "duffle-bag",
        price: 850,
        image: "/img12.png",
        rating: 4.2
    },

    {
        id: 13,
        name: "Outdoor Backpack",
        category: "backpack",
        price: 1005,
        image: "/img13.png",
        rating: 4.6
    },

    {
        id: 14,
        name: "Minimal Travel Pack",
        category: "travel-pack",
        price: 950,
        tag: "new",
        image: "/img14.png",
        rating: 4.4
    },

    {
        id: 15,
        name: "Gym Duffle-Bag",
        category: "duffle-bag",
        price: 600,
        image: "/img11.png",
        rating: 4.1
    },

    {
        id: 16,
        name: "Trail Backpack",
        category: "backpack",
        price: 1205,
        image: "/img17.png",
        rating: 4.7
    },

    {
        id: 17,
        name: "Luxury Travel Pack",
        category: "travel-pack",
        price: 1080,
        image: "/img17.png",
        rating: 4.9
    },

    {
        id: 18,
        name: "Expedition Duffle",
        category: "duffle-bag",
        price: 1055,
        tag: "new",
        image: "/img18.png",
        rating: 4.8
    }

]

app.get("/products", (req, res) => {
    res.json(products)
})

// single product 

app.get("/product/:id", (req, res) => {
    const id = Number(req.params.id)

    const product = products.find(p => p.id === id)

    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    res.json(product)
})

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "No token" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch {
        res.status(401).json({ message: "Invalid token" })
    }
}

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name, email, password: hashedPassword
        })

        await user.save()

        res.json({ message: "Signup successful 🔥" })
    } catch (err) {
        res.status(500).json({ messsage: "server error" })
    }
})



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }

        //  TOKEN BANAYA
        const token = jwt.sign(
            { id: user._id },   // user id store
            process.env.JWT_SECRET,        // secret
            { expiresIn: "1d" }
        )

        res.json({
            message: "Login successful ",
            token,
            user: {
                id: user._id,
                email: user.email
            }

        })

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

app.post("/order", authMiddleware, async (req, res) => {
 console.log("🔥 BACKEND HIT HUA")
    console.log("👉 BACKEND RECEIVED DISCOUNT:", req.body.discount)
    const userId = req.user.id
    const { name, address, phone, cart, pincode, state, houseno, discount = 0 } = req.body

    if (!name || !address || !phone || !cart || cart.length === 0 || !state || !houseno || !pincode) {
        return res.status(400).json({ message: "Invalid order data" })
    }
    if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number" })
    }

    const subtotal = cart.reduce(
  (sum, item) => sum + item.price * item.quantity, 0
)

const total = Math.max(0, subtotal - discount)

    const order = {
        userId,
        id: Date.now(),
        name, address, phone, cart, state, pincode, houseno,
        date: new Date(),
        total
    }

    const newOrder = new Order(order)
    await newOrder.save()
    res.json({ message: "order placed successfully" })
     
}
)

app.post("/cart", authMiddleware, async (req, res) => {
    const { product, quantity } = req.body
    const userId = req.user.id

    let cart = await Cart.findOne({ userId })

    if (!cart) {
        cart = new Cart({ userId, items: [] })
    }

    const existing = cart.items.find(item => item.id === product.id)

    if (existing) {
        existing.quantity += quantity
    } else {
        cart.items.push({ ...product, quantity })
    }

    await cart.save()
    res.json(cart.items)
})

app.post("/address", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id)

  const exists = user.addresses.some(
  a =>
    a.address === req.body.address &&
    a.houseno === req.body.houseno &&
    a.pincode === req.body.pincode
)

if (!exists) {
  user.addresses.push(req.body)
}
    await user.save()
    res.json(user.addresses)
})

app.post("/address/default", authMiddleware, async (req, res) => {
    const { index } = req.body

    const user = await User.findById(req.user.id)

    user.addresses = user.addresses.map((addr, i) => ({
        ...addr, isDefault: i === index
    }))
    await user.save()
    res.json(user.addresses)
})



app.get("/cart", authMiddleware, async (req, res) => {
    const userId = req.user.id
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.json([])
    res.json(cart.items)
})

app.get("/orders", authMiddleware, async (req, res) => {
    const userId = req.user.id

    const orders = await Order.find({ userId })

    res.json(orders)
})

app.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id)
    res.json(user)
})

app.get("/myprofile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id)
    res.json(user)
})

app.put("/myprofile", authMiddleware, async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
       { returnDocument: "after" }
    )

    res.json(updatedUser)
})

// cart se remove karna 

app.post("/cart/remove", authMiddleware, async (req, res) => {
    const userId = req.user.id
    const { id } = req.body

    const cart = await Cart.findOne({ userId })

    cart.items = cart.items.filter(item => item.id !== id)

    await cart.save()
    res.json(cart.items)
})


// qunatity update karna 

app.post("/cart/update", authMiddleware, async (req, res) => {
    const userId = req.user.id
    const { id, change } = req.body

    const cart = await Cart.findOne({ userId })

    cart.items = cart.items.map(item =>
        item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
    )

    await cart.save()
    res.json(cart.items)
})

app.post("/contact", async (req, res) => {
    try {
        const newMessage = new Contact(req.body)
        await newMessage.save()
        res.json({ message: "Message Sent Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Errorj" })
    }
})

app.post("/address/delete", authMiddleware, async (req, res) => {
    const { index } = req.body
    const user = await User.findById(req.user.id)

    user.addresses.splice(index, 1)
    await user.save()

    res.json(user.addresses)
})

app.post("/address/update", authMiddleware, async (req, res) => {
    const { index, ...updatedData } = req.body
    const user = await User.findById(req.user.id)

    user.addresses[index] = {
        ...user.addresses[index],
        ...updatedData
    }

    await user.save()
    res.json(user.addresses)
})

app.post("/create-order", authMiddleware, async (req, res) => {
  const { amount } = req.body

  const options = {
    amount: amount * 100, // ₹ to paise
    currency: "INR",
    receipt: "receipt_" + Date.now()
  }

  try {
    const order = await razorpay.orders.create(options)
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: "Order creation failed" })
  }
})

// whislist product 

app.post("/wishlist", authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { product } = req.body

  let wishlist = await Wishlist.findOne({ userId })

  if (!wishlist) {
    wishlist = new Wishlist({ userId, items: [] })
  }

  const exists = wishlist.items.find(item => item.id === product.id)

  if (!exists) {
    wishlist.items.push(product)
  }

  await wishlist.save()
  res.json(wishlist.items)
})

app.get("/wishlist", authMiddleware, async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user.id })
  res.json(wishlist ? wishlist.items : [])
})

app.post("/wishlist/remove", authMiddleware, async (req, res) => {
  const { id } = req.body
  const wishlist = await Wishlist.findOne({ userId: req.user.id })

  wishlist.items = wishlist.items.filter(item => item.id !== id)

  await wishlist.save()
  res.json(wishlist.items)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
