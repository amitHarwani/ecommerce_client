import { useTranslation } from "react-i18next";
import { UserCart } from "../../services/cart/CartTypes";
import { DEFAULT_CURRENCY } from "../../data/applicationData";
import { useMemo } from "react";
import { useAppSelector } from "../../store";
import { formatAmount } from "../../utils/commonHelper";

interface InvoiceAmountSummaryProps {
  userCart: UserCart;
  className?: string
}
const InvoiceAmountSummary = (props: InvoiceAmountSummaryProps) => {
  const { userCart, className = '' } = props;

  const { t } = useTranslation();
  const isRTL = useAppSelector(state => state.language.isRTL)

  const currency = useMemo(() => {
    return userCart.items[0].product.currency || DEFAULT_CURRENCY
  }, [userCart])

  return (
    <div className={`flex flex-col ${className}`}>
      <div className={`flex border-b border-grey justify-between pb-1 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="capitalize">{t("subtotal")}</span>
        <span>{formatAmount(userCart.cartTotal, currency)}</span>
      </div>
      {userCart.cartTotal !== userCart.discountedTotal && (
        <div className={`flex border-b border-grey justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="capitalize">{t("discount")}</span>
          <span>{formatAmount(userCart.cartTotal - userCart.discountedTotal, currency)}</span>
        </div>
      )}
      <div className={`flex justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="capitalize font-bold">{t("total")}</span>
        <span className="font-bold">{formatAmount(userCart.discountedTotal, currency)}</span>
      </div>
    </div>
  );
};

export default InvoiceAmountSummary;
