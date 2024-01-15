import { useCallback, useEffect, useState } from "react";
import ApiError from "../../../../services/ApiError";
import ProfileService from "../../../../services/profile/ProfileService";
import EditProfile from "../presentation/EditProfile";
import { ProfileFormFields, TOAST_MESSAGE_TYPES } from "../../../../constants";
import ErrorMessage from "../../../basic/ErrorMessage";
import { useAppDispatch } from "../../../../store";
import { postMessageAction } from "../../../../store/ToastMessageSlice";
import { useTranslation } from "react-i18next";

const EditProfileContainer = () => {
  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  const [currentProfile, setCurrentProfile] = useState<ProfileFormFields>();
  const [errorFetchingProfile, setErrorFetchingProfile] = useState("");
  const [updateInProgress, setUpdateInProgress] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    setErrorFetchingProfile("");
    const response = await ProfileService.getUserProfile();
    if (!(response instanceof ApiError)) {
      setCurrentProfile({
        firstName: response.firstName,
        lastName: response.lastName,
        countryCode: response.countryCode,
        phoneNumber: response.phoneNumber,
      });
    } else {
      /* Error fetching profile */
      setErrorFetchingProfile(
        response.errorResponse?.message || response.errorMessage
      );
    }
  }, []);

  const updateProfileHandler = async (data: ProfileFormFields) => {
    setUpdateInProgress(true);
    const response = await ProfileService.updateUserProfile(
      data.countryCode,
      data.firstName,
      data.lastName,
      data.phoneNumber
    );
    setUpdateInProgress(false);
    if (!(response instanceof ApiError)) {
      setCurrentProfile({
        firstName: response.firstName,
        lastName: response.lastName,
        countryCode: response.countryCode,
        phoneNumber: response.phoneNumber,
      });
      dispatch(
        postMessageAction({
          type: TOAST_MESSAGE_TYPES.success,
          message: t("profileUpdatedSuccessfully"),
        })
      );
    } else {
      /* Error */
      dispatch(
        postMessageAction({
          type: TOAST_MESSAGE_TYPES.error,
          message: response.errorResponse?.message || response.errorMessage,
        })
      );
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <>
      {currentProfile ? (
        <EditProfile
          currentProfile={currentProfile}
          updateProfileHandler={updateProfileHandler}
          updateInProgress={updateInProgress}
        />
      ) : errorFetchingProfile ? (
        <ErrorMessage message={errorFetchingProfile} />
      ) : (
        <></>
      )}
    </>
  );
};

export default EditProfileContainer;
