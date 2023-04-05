import "./style/ProductCard.css";
import image from './camera.png';

const ProductCard = () =>
{ return (
    <div className="product-card">
    <div className="card-top">
    <img src={image} alt="logo"/>
    </div>
    <div className="card-info">
        <h4 className="title">Camera</h4>
        <p className="price">Starting Price : 5300 L.E</p>
        <button>Bid Now</button>
    </div>

    </div>
);

};

export default ProductCard;