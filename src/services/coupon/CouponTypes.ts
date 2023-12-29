export enum COUPON_TYPES {
    FLAT = "FLAT"
}

export class Coupon {
    constructor(
        public _id: string,
        public __v: number,
        public couponCode: string,
        public createdAt: string,
        public discountValue: number,
        public expiryDate: string,
        public isActive: boolean,
        public minimumCartValue: number,
        public name: string,
        public owner: string,
        public startDate: string,
        public type: COUPON_TYPES,
        public updatedAt: string
    ){

    }
}

