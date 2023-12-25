import { Product } from "../../../../services/product/ProductTypes";
import ProductDetails from "../presentation/ProductDetails";


interface ProductDetailsContainerProps {
    product: Product,
    addToCart(product: Product, quantity: number): void;
    removeFromCart(product: Product): void;
}
const ProductDetailsContainer = (props: ProductDetailsContainerProps) => {
    const {product, addToCart, removeFromCart} = props;
    return (
        <ProductDetails product={product} addToCart={addToCart} removeFromCart={removeFromCart} />
    )
}

export default ProductDetailsContainer;