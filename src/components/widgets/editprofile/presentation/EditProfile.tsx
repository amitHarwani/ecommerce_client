import { useTranslation } from "react-i18next";
import Input from "../../../basic/Input";
import Button from "../../../basic/Button";
import {
  ButtonTypes,
  ProfileFormFields,
  REGEX_PATTERNS,
} from "../../../../constants";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";

interface EditProfileProps {
  currentProfile: ProfileFormFields;
  updateProfileHandler(data: ProfileFormFields): void;
  updateInProgress: boolean
}
const EditProfile = (props: EditProfileProps) => {
  const { currentProfile, updateProfileHandler, updateInProgress } = props;

  const [isValuesUpdated, setIsValuesUpdated] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormFields>();


  useEffect(() => {
    let key: keyof typeof currentProfile;
    for (key in currentProfile) {
      setValue(key, currentProfile[key]);
    }
  }, [currentProfile, setValue]);

  useEffect(() => {
    const subscribe = watch((value, {name}) => {
      if(name && currentProfile[name] !== value[name]){
        setIsValuesUpdated(true);
      }
      else{
        setIsValuesUpdated(false);
      }
    })

    return () => {
      subscribe.unsubscribe();
    }
  }, [currentProfile, watch])

  const { t } = useTranslation();
  return (
    <form
      className="flex flex-col gap-y-8"
      onSubmit={handleSubmit(updateProfileHandler)}
    >
      <span className="capitalize text-darkRed text-xl font-semibold">
        {t("editYourProfile")}
      </span>
      <div className="flex flex-col gap-y-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <Input
          placeholder={t("firstName")}
          className="placeholder:capitalize"
          type="text"
          errorMessage={errors.firstName?.message || ""}
          {...register("firstName", { required: t("firstNameIsRequired") })}
        />

        <Input
          placeholder={t("lastName")}
          className="placeholder:capitalize"
          type="text"
          errorMessage={errors.lastName?.message || ""}
          {...register("lastName", { required: t("lastNameIsRequired") })}
        />

        <Input
          placeholder={t("countryCode")}
          className="placeholder:capitalize"
          type="text"
          errorMessage={errors.countryCode?.message || ""}
          {...register("countryCode", {
            required: t("countryCodeIsRequired"),
            validate: {
              matchPattern: (value) =>
                REGEX_PATTERNS.countryCodePattern.test(value) ||
                t("invalidCountryCode"),
            },
          })}
        />

        <Input
          placeholder={t("phoneNumber")}
          className="placeholder:capitalize"
          type="number"
          errorMessage={errors.phoneNumber?.message || ""}
          {...register("phoneNumber", {
            required: t("phoneNumberIsRequired"),
            validate: {
              matchPattern: (value) =>
                REGEX_PATTERNS.phoneNumberPattern.test(value) ||
                t("invalidPhoneNumber"),
            },
          })}
        />
      </div>

      <Button
        type="submit"
        buttonType={ButtonTypes.primaryButton}
        className="px-4 py-2 flex items-center justify-center lg:w-fit lg:self-center"
        onClickHandler={() => {}}
        isLoading={updateInProgress}
        isDisabled={!isValuesUpdated}
      >
        <span className="capitalize">{t("update")}</span>
      </Button>
    </form>
  );
};

export default EditProfile;
