import { AxiosError } from "axios";


class ApiError {

    public error: boolean = true;
    constructor(public errorMessage: string, public errorData?: AxiosError, ){   
    }
}

export default ApiError;