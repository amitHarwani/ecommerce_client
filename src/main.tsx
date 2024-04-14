import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import axios from "axios";

/* Configuring base URL for axios */
if (import.meta.env.MODE === "production") {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI;
}

/* Axios Instance For Country API */
export const axiosCountryApi = axios.create({
  baseURL: import.meta.env.VITE_COUNTRY_API,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
