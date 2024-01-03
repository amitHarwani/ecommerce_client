import { useTranslation } from "react-i18next";
import { ButtonTypes } from "../../constants";
import { UserCart } from "../../services/cart/CartTypes";
import Button from "../basic/Button";
import InvoiceAmountSummary from "./InvoiceAmountSummary";
import Text from "../basic/Text";

interface CartSummaryProps {
    userCart: UserCart,
    checkoutClickHandler(): void;
    className?: string
}
const CartSummary = (props: CartSummaryProps) => {
    const {userCart, checkoutClickHandler, className = ''} = props;
    const {t} = useTranslation();
    return (
        <div className={`flex flex-col lg:border lg:border-grey p-4 rounded-md ${className}`}>
            <Text className="font-poppinsMedium text-xl tracking-wider capitalize mb-4">{t('summary')}</Text>
            <InvoiceAmountSummary userCart={userCart} className="mb-4" />
            <Button onClickHandler={checkoutClickHandler} buttonType={ButtonTypes.primaryButton}
            className="px-4 py-1">
                <span className="capitalize">{t('proceedToCheckout')}</span>
            </Button>
        </div>
    )
}

export default CartSummary;