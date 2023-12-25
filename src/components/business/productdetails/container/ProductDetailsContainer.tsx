import { Product } from "../../../../services/product/ProductTypes";
import ProductDetails from "../presentation/ProductDetails";


interface ProductDetailsContainerProps {
    product: Product
}
const ProductDetailsContainer = (props: ProductDetailsContainerProps) => {
    const {product} = props;
    return (
        <ProductDetails product={product} />
    )
}

export default ProductDetailsContainer;