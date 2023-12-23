import { generateRandomNumber } from "../utils/commonHelper";
import ApiError from "./ApiError";
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";
import { Product, Products } from "./product/ProductTypes";

class ProductService {
  defaultPageNumber: number = 1;
  defaultPageLimit: number = 50;
  BASE_URL: string = "/api/v1/ecommerce/products";

  async getFeaturedProducts(): Promise<Product[] | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);

    const response = await apiRequest.getRequest<Products>({
      page: this.defaultPageNumber,
      limit: this.defaultPageLimit,
    });

    if (response instanceof ApiResponse && response.success) {
      const products = response.data.products;
      products.sort(() => Math.random() - 0.5);
      const featuredProducts = products.slice(0, 8);
      return featuredProducts;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getBestSellingProducts(): Promise<Product[] | ApiError> {
    const apiRequest = new ApiRequest(this.BASE_URL);

    const response = await apiRequest.getRequest<Products>({
      page: this.defaultPageNumber,
      limit: this.defaultPageLimit,
    });

    if (response instanceof ApiResponse && response.success) {
      const products = response.data.products;
      products.sort(() => Math.random() - 0.5);
      const bestSellingProducts: Product[] = []

      for(let counter = 0; counter < 4;counter++){

        const discountPercent =  generateRandomNumber(10, 20)
        products[counter].previousPrice = Math.round((100 *products[counter].price) / (100 - discountPercent));

        bestSellingProducts.push(products[counter]);
      }

      return bestSellingProducts;
      
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new ProductService();
