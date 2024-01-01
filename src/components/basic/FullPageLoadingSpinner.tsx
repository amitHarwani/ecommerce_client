import LoadingSpinner from "../icons/LoadingSpinner"


const FullPageLoadingSpinner = () => {
    return (
        <div className="fixed top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-10">
            <LoadingSpinner className="w-20 h-20 fill-black text-gray-200" />
        </div>
    )
}

export default FullPageLoadingSpinner