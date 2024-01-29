import SearchProductListContainer from "../../../components/widgets/searchproductlist/container/SearchProductListContainer";


interface ProductSearchPageProps {
    productNameSearched: string;
}
const ProductSearchPage = (props: ProductSearchPageProps) => {
    const {productNameSearched = ''} = props;
    return (
        <div className="px-2 py-4 lg:px-10">
            <SearchProductListContainer productNameSearched={productNameSearched} />
        </div>
    )
}

export default ProductSearchPage;