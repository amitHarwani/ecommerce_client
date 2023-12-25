import { generateRandomNumber } from "../utils/commonHelper";
import ApiError from "./ApiError";
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";
import { Product, Products } from "./product/ProductTypes";

class ProductService {
  defaultPageNumber: number = 1;
  defaultPageLimit: number = 30;
  BASE_URL: string = "/api/v1/ecommerce/products";
  CATEGORY_WISE_URL: string = "/api/v1/ecommerce/products/category";

  async getTopProducts(
    numberOfProducts: number
  ): Promise<Product[] | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);

    const response = await apiRequest.getRequest<Products>({
      page: this.defaultPageNumber,
      limit: this.defaultPageLimit,
    });

    if (response instanceof ApiResponse && response.success) {
      const products = response.data.products;
      products.sort(() => Math.random() - 0.5);
      const featuredProducts = products.slice(0, numberOfProducts);
      return featuredProducts;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getTopOnSaleProducts(
    numberOfProducts: number
  ): Promise<Product[] | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);

    const response = await apiRequest.getRequest<Products>({
      page: this.defaultPageNumber,
      limit: this.defaultPageLimit,
    });

    if (response instanceof ApiResponse && response.success) {
      const products = response.data.products;
      products.sort(() => Math.random() - 0.5);
      const bestSellingProducts: Product[] = [];

      for (let counter = 0; counter < numberOfProducts; counter++) {
        const discountPercent = generateRandomNumber(10, 20);
        products[counter].previousPrice = Math.round(
          (100 * products[counter].price) / (100 - discountPercent)
        );

        bestSellingProducts.push(products[counter]);
      }

      return bestSellingProducts;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getProducts(pageNumber: number, categoryId?: string): Promise<Products | ApiError> {
    const url = categoryId ? `${this.CATEGORY_WISE_URL}/${categoryId}` : this.BASE_URL;
    
    const apiRequest = new ApiRequest(url);

    const response = await apiRequest.getRequest<Products>({
      page: pageNumber,
      limit: this.defaultPageLimit,
    });

    if (response instanceof ApiResponse && response.success) {
      const productsResponse = response.data;
      return new Products(
        productsResponse.products,
        productsResponse.totalProducts,
        productsResponse.limit,
        productsResponse.page,
        productsResponse.totalPages,
        productsResponse.serialNumberStartFrom,
        productsResponse.hasPrevPage,
        productsResponse.hasNextPage,
        productsResponse.prevPage,
        productsResponse.nextPage,
        productsResponse.category
      );
    } else if (response instanceof ApiResponse) {
      /* Error */
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getProduct(productId: string): Promise<Product | ApiError> {

    const apiRequest = new ApiRequest(`${this.BASE_URL}/${productId}`);

    const response = await apiRequest.getRequest<Product>();

    if(response instanceof ApiResponse && response.success){
      return response.data;
    }
    else if(response instanceof ApiResponse){
      return new ApiError(response.message);
    }
    else{
      return response;
    }
  }
}

export default new ProductService();
