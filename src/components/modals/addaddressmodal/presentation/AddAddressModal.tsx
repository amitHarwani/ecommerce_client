import { useTranslation } from "react-i18next";
import {
  ADDRESS_FORM_KEYS,
  AddressFormFields,
  ButtonTypes,
  DropdownItem,
  DropdownTypes,
  REGEX_PATTERNS,
} from "../../../../constants";
import Dropdown from "../../../basic/Dropdown";
import Modal from "../../../basic/Modal";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import Input from "../../../basic/Input";
import FullPageLoadingSpinner from "../../../basic/FullPageLoadingSpinner";
import Button from "../../../basic/Button";
import ErrorMessage from "../../../basic/ErrorMessage";
import { useAppSelector } from "../../../../store";

interface AddAddressModalProps {
  countriesList: Array<DropdownItem>;
  statesList: Array<DropdownItem>;
  citiesList: Array<DropdownItem>;
  dropdownChangeHandlers: (
    key: ADDRESS_FORM_KEYS,
    value: DropdownItem | undefined
  ) => void;
  formSubmitHandler(data: AddressFormFields): void;
  fetchingDropdownLists: boolean;
  isModalButtonLoading: boolean;
  hideModal(): void;
  apiError?: string;
}
const AddAddressModal = (props: AddAddressModalProps) => {
  const {
    countriesList = [],
    statesList = [],
    citiesList = [],
    dropdownChangeHandlers,
    formSubmitHandler,
    fetchingDropdownLists = false,
    isModalButtonLoading = false,
    hideModal,
    apiError = "",
  } = props;

  const { t } = useTranslation();
  const isRTL = useAppSelector(state => state.language.isRTL);

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<AddressFormFields>();

  useEffect(() => {
    const subscription = watch((value, { name }) => {

      if (name === "country" || name === "city" || name === "state") {
        dropdownChangeHandlers(ADDRESS_FORM_KEYS[name], value[name]);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, dropdownChangeHandlers]);

  return (
    <>
      {fetchingDropdownLists && <FullPageLoadingSpinner />}
      <Modal
        heading={t("addAddress")}
        secondaryButtonHandler={hideModal}
        isPrimaryButtonLoading={isModalButtonLoading}
        primaryButtonClassname="uppercase"
        secondaryButtonClassname="uppercase"
        className="px-4 py-4 w-full lg:px-12 lg:w-2/4"
      >
        <>
          {apiError && (
            <ErrorMessage
              message={apiError}
              errorIconClassName="w-4 h-4"
              className="text-sm mb-2"
            />
          )}
          <form
            className="flex flex-col gap-y-6"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <div className="grid grid-cols-2 gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
              <Controller
                name={"country"}
                control={control}
                rules={{ required: t("countryIsRequired") }}
                render={({ field }) => (
                  <Dropdown
                    label={t("selectCountry")}
                    itemsList={countriesList}
                    type={DropdownTypes.borderedLightBg}
                    mainButtonClassNames="w-full"
                    errorMessage={errors.country?.message || ""}
                    {...field}
                  />
                )}
              />

              <Controller
                name={"state"}
                control={control}
                rules={{ required: t("stateIsRequired") }}
                render={({ field }) => (
                  <Dropdown
                    label={t("selectState")}
                    itemsList={statesList}
                    type={DropdownTypes.borderedLightBg}
                    mainButtonClassNames="w-full"
                    errorMessage={errors.state?.message || ""}
                    {...field}
                  />
                )}
              />

              <Controller
                name={"city"}
                control={control}
                rules={{ required: t("cityIsRequired") }}
                render={({ field }) => (
                  <Dropdown
                    label={t("selectCity")}
                    itemsList={citiesList}
                    type={DropdownTypes.borderedLightBg}
                    mainButtonClassNames="w-full"
                    errorMessage={errors.city?.message || ""}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6" dir={isRTL ? 'rtl': 'ltr'}>
              <Input
                type="text"
                placeholder={t("enterAddress1")}
                {...register("addressLine1", {
                  required: t("addressIsRequired"),
                })}
                className="placeholder:capitalize placeholder:text-sm"
                errorMessage={errors.addressLine1?.message || ""}
              />

              <Input
                type="text"
                placeholder={t("enterAddress2")}
                {...register("addressLine2")}
                className="placeholder:capitalize placeholder:text-sm"
              />

              <Input
                type="text"
                placeholder={t("enterPincode")}
                {...register("pincode", {
                  required: t("pincodeIsRequired"),
                  minLength: { value: 6, message: t("invalidPincode") },
                  maxLength: { value: 6, message: t("invalidPincode") },
                  pattern: {value: new RegExp(REGEX_PATTERNS.numberPattern), message: t('invalidPincode')}
                })}
                {...{maxLength:6}}
                className="placeholder:capitalize placeholder:text-sm"
                errorMessage={errors.pincode?.message || ""}
              />
            </div>

            <div className="flex flex-col justify-center gap-2">
              <Button
                type="submit"
                buttonType={ButtonTypes.primaryButton}
                className={`px-12 py-1 flex justify-center uppercase`}
                onClickHandler={() => {}}
                isLoading={isModalButtonLoading}
              >
                <span>{t("add")}</span>
              </Button>
              <Button
                buttonType={ButtonTypes.secondaryButton}
                className={`px-12 py-1 flex justify-center uppercase`}
                onClickHandler={hideModal}
              >
                <span>{t("cancel")}</span>
              </Button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default AddAddressModal;
