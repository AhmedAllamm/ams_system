import ProductCard from "./ProductCard";
import "./style/ProductList.css"
import {Products} from "../core/data/Products";

const ProductList = () =>
{ const AuctionProducts = Products;
  const displayProducts = () =>
  {
    return AuctionProducts.map((item) =>{
        return  <ProductCard key = {item.id} name={item.name} desc= {item.description} image = {item.image} category ={item.category}/>

     })

  }  
    return (
        <div className="product-list">
        {
            displayProducts()

        }
       
        </div>
        
    );
};

export default ProductList;