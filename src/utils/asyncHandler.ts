import ApiError from "../services/ApiError";

type asyncFunctionSignature = () => object;

export const asyncHandler = async (func: asyncFunctionSignature): Promise<object> => {
  return Promise.resolve(func())
    .then(data => data)
    .catch((error) => {
      return new ApiError(error)
    })
};
