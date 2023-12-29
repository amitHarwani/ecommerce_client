import { Coupon } from "../coupon/CouponTypes";
import { Product } from "../product/ProductTypes";

export class CartItem {
    constructor(
        public _id: string,
        public coupon: string,
        public product: Product,
        public quantity: number
    ){}
}

export class UserCart {
    constructor(
        public _id: string,
        public cartTotal: number,
        public coupon: Coupon,
        public discountedTotal: number,
        public items: CartItem[]
    ) {

    }
}