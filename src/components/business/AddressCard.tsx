import { useState } from "react";
import { AddressClass } from "../../services/address/AddressTypes";
import Button from "../basic/Button";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import AddAddressModalContainer from "../modals/addaddressmodal/container/AddAddressModalContainer";
import DeleteAddressModalContainer from "../modals/deleteaddressmodal/container/DeleteAddressModalContainer";

interface AddressCardProps {
  address: AddressClass;
  className?: string;
  onAddressUpdated?(): void;
}
const AddressCard = (props: AddressCardProps) => {
  const {
    address,
    className = "shadow",
    onAddressUpdated,
  } = props;

  const [isAddressUpdateModalShown, setIsAddressUpdateModalShown] =
    useState(false);
  const [isDeleteAddressModalShown, setIsDeleteAddressModalShown] =
    useState(false);

  return (
    <>
      {isAddressUpdateModalShown && (
        <AddAddressModalContainer
          hideModal={() => setIsAddressUpdateModalShown(false)}
          address={address}
          onAddressAddedOrUpdatedCallback={onAddressUpdated}
        />
      )}
      {
        isDeleteAddressModalShown && (
          <DeleteAddressModalContainer 
            address={address}
            hideModal={() => setIsDeleteAddressModalShown(false)}
            onAddressDeletedCallback={onAddressUpdated}
          />
        )
      }
      <div className={`flex flex-col p-2 rounded ${className}`}>
        <div className="flex flex-col">
          <span>{`${address.state}, ${address.city}`}</span>
          <span>{address.country}</span>
        </div>
        <span className="truncate mt-2">{address.addressLine1}</span>
        <div className="self-end flex gap-x-2">
          <Button
            onClickHandler={() => setIsAddressUpdateModalShown(true)}
            type="button"
          >
            <EditIcon className="w-4 h-4" />
          </Button>
          <Button type="button" onClickHandler={() => {setIsDeleteAddressModalShown(true)}}>
            <DeleteIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
