import ProductCard from "./ProductCard";
import "./style/ProductList.css"

const ProductList = () =>
{
    return (
        <div className="product-list">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
        
    );
};

export default ProductList;