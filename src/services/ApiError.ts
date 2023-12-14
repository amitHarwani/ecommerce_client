

class ApiError {

    public error: boolean = true;
    constructor(public errorData: object){   
    }
}

export default ApiError;