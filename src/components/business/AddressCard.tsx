import { AddressClass } from "../../services/address/AddressTypes";

interface AddressCardProps {
  address: AddressClass;
  className?: string;
}
const AddressCard = (props: AddressCardProps) => {
  const { address, className = "shadow" } = props;
  return (
    <div className={`flex flex-col p-2 rounded ${className}`}>
      <div className="flex flex-col">
        <span>{`${address.state}, ${address.city}`}</span>
        <span>{address.country}</span>
      </div>
      <span className="truncate mt-2">{address.addressLine1}</span>
    </div>
  );
};

export default AddressCard;
