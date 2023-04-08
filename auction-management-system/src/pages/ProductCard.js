import { Link } from "react-router-dom";
import "./style/ProductCard.css";
import React from "react";


const ProductCard = (props) =>
{  
    return (
    <div className="product-card">
    <div className="card-top">
    <img src={props.image} alt="logo"/>
    </div>
    <div className="card-info">
        <h4 className="title">{props.name}</h4>
        <p className="price">{props.desc}</p>
        <p className="category">{props.category}</p>
        <button>
        <Link to={"/product-list/"+props.id}> Bid Now</Link>
        
       </button>
       
    </div>

    </div>
);

};

export default ProductCard;