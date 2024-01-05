import { useEffect, useReducer, useState } from "react";
import { COUNTRIES_DROPDOWN_LIST } from "../../../../data/applicationData";
import AddAddressModal from "../presentation/AddAddressModal";
import {
  ADDRESS_FORM_KEYS,
  AddressFormFields,
  DropdownItem,
} from "../../../../constants";
import CountryApiService from "../../../../services/CountryApiService";
import ApiError from "../../../../services/ApiError";
import AddressService from "../../../../services/AddressService";
import FeedbackModal from "../../feedbackmodal/presentation/FeedbackModal";
import { useTranslation } from "react-i18next";

type DropdownListActions = {
  type:
    | "FETCHING"
    | "UPDATE_CITIES"
    | "UPDATE_STATES"
    | "UPDATE_LOADING_STATUS"
    | "UPDATE_ERROR_STATUS"
    | "COUNTRY_SELECTED"
    | "STATE_SELECTED"
    | "CITY_SELECTED";
  payload?: DropdownItem[] | string | DropdownItem;
};
type DropdownListState = {
  selectedCountry: DropdownItem | undefined;
  selectedState: DropdownItem | undefined;
  selectedCity: DropdownItem | undefined;
  countries: DropdownItem[];
  cities: DropdownItem[];
  states: DropdownItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
interface AddAddressModalContainerProps {
  hideModal(): void;
}

function dropdownListsReducer(
  state: DropdownListState,
  action: DropdownListActions
) {
  switch (action.type) {
    case "FETCHING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    }
    case "COUNTRY_SELECTED": {
      if (
        typeof action.payload !== "string" &&
        !(action.payload instanceof Array)
      ) {
        return {
          ...state,
          selectedCountry: action.payload,
        };
      }
      return state;
    }
    case "STATE_SELECTED": {
      if (
        typeof action.payload !== "string" &&
        !(action.payload instanceof Array)
      ) {
        return {
          ...state,
          selectedState: action.payload,
        };
      }
      return state;
    }
    case "CITY_SELECTED": {
      if (
        typeof action.payload !== "string" &&
        !(action.payload instanceof Array)
      ) {
        return {
          ...state,
          selectedCity: action.payload,
        };
      }
      return state;
    }
    case "UPDATE_STATES": {
      if (action.payload instanceof Array) {
        return {
          ...state,
          states: action.payload,
          cities: [],
          isLoading: false,
          isError: false,
          errorMessage: "",
        };
      }
      return state;
    }
    case "UPDATE_CITIES": {
      if (action.payload instanceof Array) {
        return {
          ...state,
          cities: action.payload,
          isLoading: false,
          isError: false,
          errorMessage: "",
        };
      }
      return state;
    }
    case "UPDATE_ERROR_STATUS": {
      if (typeof action.payload === "string") {
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      }
      return state;
    }
    default:
      return state;
  }
}
const AddAddressModalContainer = (props: AddAddressModalContainerProps) => {
  const { hideModal = () => {} } = props;

  const {t} = useTranslation();

  /* Loading state for Saving the address to DB  */
  const [updateInProgress, setUpdateInProgress] = useState(false);

  const [isSuccessModalShown, setIsSuccessModalShown] = useState(false);

  const [state, dispatch] = useReducer(dropdownListsReducer, {
    selectedCountry: undefined,
    selectedState: undefined,
    selectedCity: undefined,
    countries: COUNTRIES_DROPDOWN_LIST,
    cities: [],
    states: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  const fetchStatesOfCountry = async (countryName: string) => {
    dispatch({ type: "FETCHING" });
    const response = await CountryApiService.getStatesOfACountry(countryName);
    if (!(response instanceof ApiError)) {
      const statesList = response.states.map((state) => {
        return {
          id: state.state_code,
          text: state.name,
        };
      });

      dispatch({ type: "UPDATE_STATES", payload: statesList });
    } else {
      // Error
      dispatch({
        type: "UPDATE_ERROR_STATUS",
        payload: response.errorResponse?.message || response.errorMessage,
      });
    }
  };

  const fetchCitiesOfState = async (stateName: string) => {
    const country = state.selectedCountry?.text || "";

    dispatch({ type: "FETCHING" });

    const response = await CountryApiService.getCitiesOfAState(
      country,
      stateName
    );
    if (!(response instanceof ApiError)) {
      const citiesList = response.map((city, index) => {
        return {
          id: index,
          text: city,
        };
      });
      dispatch({ type: "UPDATE_CITIES", payload: citiesList });
    } else {
      // Error
      dispatch({
        type: "UPDATE_ERROR_STATUS",
        payload: response.errorResponse?.message || response.errorMessage,
      });
    }
  };

  const dropdownChangeHandlers = async (
    key: ADDRESS_FORM_KEYS,
    value: DropdownItem | undefined
  ) => {
    console.log("Dropdown Change Handler", key, value);
    switch (key) {
      case ADDRESS_FORM_KEYS.country: {
        // Fetch States
        if (value?.text) {
          dispatch({ type: "COUNTRY_SELECTED", payload: value });
          await fetchStatesOfCountry(value?.text);
        }
        return;
      }
      case ADDRESS_FORM_KEYS.state: {
        // Fetch States
        if (value?.text) {
          dispatch({ type: "STATE_SELECTED", payload: value });
          await fetchCitiesOfState(value?.text);
        }
        return;
      }
      case ADDRESS_FORM_KEYS.city: {
        // Fetch States
        if (value?.text) {
          dispatch({ type: "CITY_SELECTED", payload: value });
        }
        return;
      }
    }
  };

  const formSubmitHandler = async (data: AddressFormFields) => {
    setUpdateInProgress(true);
    const response = await AddressService.createAddress(
      data.country.text || "",
      data.state.text || "",
      data.city.text || "",
      data.addressLine1,
      data.addressLine2,
      data.pincode
    );
    setUpdateInProgress(false);
    if (!(response instanceof ApiError)) {
      // Success
      setIsSuccessModalShown(true);
    } else {
      dispatch({
        type: "UPDATE_ERROR_STATUS",
        payload: response.errorResponse?.message || response.errorMessage,
      });
    }
  };
  return (
    <>
      {isSuccessModalShown ? (
        <FeedbackModal
          messageType="SUCCESS"
          message={t("addressAddedSuccessfully")}
          hideModal={hideModal}
        />
      ) : (
        <AddAddressModal
          countriesList={state.countries}
          citiesList={state.cities}
          statesList={state.states}
          dropdownChangeHandlers={dropdownChangeHandlers}
          formSubmitHandler={formSubmitHandler}
          fetchingDropdownLists={state.isLoading}
          isModalButtonLoading={updateInProgress}
          hideModal={hideModal}
          apiError={state.errorMessage}
        />
      )}
    </>
  );
};

export default AddAddressModalContainer;
