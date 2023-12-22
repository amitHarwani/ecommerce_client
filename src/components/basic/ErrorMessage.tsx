import { useAppSelector } from "../../store";
import ErrorIcon from "../icons/ErrorIcon";


interface ErrorMessageProps {
    message: string;
    className?: string;
}
const ErrorMessage = (props: ErrorMessageProps) => {
    const {message, className} = props;

    const isRTL = useAppSelector((state) => state.language.isRTL);
    return (
        <div className={`flex items-center text-darkRed ${isRTL ? 'flex-row-reverse': ''} ${className}`}>
            <ErrorIcon className="w-8 h-8" />
            <span className={`capitalize ${isRTL ? 'mr-4': 'ml-4'}`}>{message}</span>
        </div>
    )
}

export default ErrorMessage;