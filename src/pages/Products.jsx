import { useState ,useEffect} from 'react'
import { Link, useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom'

const Products = () => {
    const { category } = useParams()

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const search = query.get("search")
 const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

    const [activecategory, setActiveCategory] = useState(category || "all")
    const [price, setPrice] = useState(1500)
    const [sort, setSort] = useState("recommended")

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
      fetch(`${API_URL}/products`)
        .then(res =>res.json())
        .then(data =>{
            setProducts(data)
            setLoading(false)
        })
    }, [])
    

let filteredProducts = [...products]

    // price filter

    filteredProducts = filteredProducts.filter(
        p => p.price <= price
    )

    // category filter 
    if (activecategory !== "all") {
        filteredProducts = filteredProducts.filter(
            p => p.category === activecategory
        )
    }

    // search filter
if(search){
    filteredProducts =filteredProducts.filter (
        p=> p.name.toLowerCase().includes(search.toLowerCase())
    )
}

// sorting 

    if (sort === "low") {
       filteredProducts =  [...filteredProducts].sort((a, b) => a.price - b.price)
    }
    if (sort === "high") {
       filteredProducts= [...filteredProducts].sort((a, b) => b.price - a.price)
    }
    if (sort === "az") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sort === "za") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name))
    }

    useEffect(() => {
setActiveCategory(category || "all")
}, [category])

if (loading) return <h2>Loading...</h2>

    return (
        <div className='product'>
            <div>
                <Link to="/">
                    <h5 style={{ color: "white" }}>Home </h5>
                </Link>

                <span> /</span>
                <h5>Products</h5>

                <h2>All Products</h2>
                <p>Explore our collection of thoughtfully designed travel bags and backpacks, built for every journey. Whether you're heading out for a weekend getaway or a long adventure, our products combine durability, comfort, and style to keep up with your lifestyle.
</p>
            </div>


            <div className='shop'>

                {/* left wala  */}
                

                <div className="sidebar">
                    <h3>Browse By</h3>
                    <span>_______________</span>
                    <ul>
                        <li onClick={() => setActiveCategory("all")}>All Products</li>
                        <li onClick={() => setActiveCategory("backpack")}>Backpacks</li>
                        <li onClick={() => setActiveCategory("duffle-bag")}>Duffle bags</li>
                        <li onClick={() => setActiveCategory("travel-pack")}>Travel Packs</li>
                    </ul>

                    <h3 className='filtertitle'>Filter by</h3>
                    <span>_______________</span>
                    <span className='price-container'>Price:</span>

                    <span className='price'>Rs0 - Rs{price}</span>
                    <input type="range" min="0" max="1500" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>


                {/* right wala  */}

                <div className="productarea">
                    <div className="topbar">
                        <p>{filteredProducts.length} products</p>
                        <h4>Sort by:</h4>
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="recommended">Recommended</option>
                            <option value="low">Price(low-highh)</option>
                            <option value="high" >Price(high-low)</option>
                            <option value="az">Name(A-Z)</option>
                            <option value="za">Name(Z-A)</option>
                        </select>
                    </div>

                    <div className="productGrid">
                        {filteredProducts.map(item => (
                            <div className="card" key={item.id}>
                                <Link to ={`/product/${item.id}`}>
                                <img src={item.image} alt={item.name} />
                                </Link>
                                <h4>{item.name}</h4>
                                <h3>Rs {item.price}</h3>
                                <span className="rating">
                                    {"⭐".repeat(Math.floor(item.rating))}
                                </span>
                                <span className='ratenumber'>{item.rating}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Products