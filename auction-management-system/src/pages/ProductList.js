import ProductCard from "./ProductCard";
import "./style/ProductList.css";
import React from "react";
import Products from "../core/data/Products";



const ProductList = () =>
{
  
  
  const displayProducts = () =>
  {
    return Products.map((item) =>{
        return  <ProductCard key = {item.id} id ={item.id} name={item.name} desc= {item.description} image = {item.image} category ={item.category}/>

     })

  }  
    return ( <div className="product-list">
    {
        displayProducts()

    }
   
    </div>)
    
      
         
        

     
    
        
    
};

export default ProductList;