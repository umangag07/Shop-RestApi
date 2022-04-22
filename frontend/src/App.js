import { useEffect, useState } from "react";
import axios from "axios"
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
 
  const getAllProducts = async ()=>{
    const fetchProducts = await axios.get('http://localhost:5000/products/');
    console.log(fetchProducts)
    setProducts(fetchProducts.data);
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h1>Making this frontend to learn the ci/cd pipeline.</h1>
      <h2>Getting all the list of products</h2>
      {
        products.map((product,key)=>{
          return<>
          <ul key={key}>
            <li >Name: {product.name}</li>
            <ol>
              <li>Price: {product.price}</li>
            </ol>
          </ul>
          </>
        })
      }
    </>
  );
}

export default App;
