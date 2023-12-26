import { LOGIN_TYPES, USER_ROLES } from "../../constants";
import { ImageClass } from "../product/ProductTypes";

export class LoginResp {
    constructor(
        public accessToken: string,
        public refreshToken: string,
        public user: User
    ){}
}

export class User {
    constructor(
        public _id: string,
        public __v: number,
        public avatar: ImageClass,
        public createdAt: string,
        public email: string,
        public isEmailVerified: boolean,
        public loginType: LOGIN_TYPES,
        public role: USER_ROLES,
        public updatedAt: string,
        public username: string
    ){}
}
