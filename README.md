## ecommerce frontend application

This is an ecommerce client app which is made by consuming freeapi: https://github.com/hiteshchoudhary/apihub.

### Steps to run the code locally
* Download the freeapi project from: https://github.com/hiteshchoudhary/apihub, and set the project up.
* Create a .env file in the root directory of this project, and copy paste the contents of .env.sample into it.
* In .env, Replace:
  * VITE_SERVER_URI: With the path where freeapi server is running example http://localhost:8080 by default
  * VITE_PAYPAL_CLIENT_ID: With your own paypal client id.
* Run ```npm i ```
* Run ```npm run dev```, the development server will start on port 3000: Visit http://localhost:3000 to view the client app.

### Credits
 * FreeAPI Project:    https://github.com/hiteshchoudhary/apihub
 * API for countries & states: https://countriesnow.space/
 * Design Inspiration: https://www.figma.com/community/file/1219312065205187851

### Dependencies
* [React](https://github.com/facebook/react) : v18.2.0
* [Vite](https://vitejs.dev/) : v5.0.12
* [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) : v3.3.6 
* State Management
    * [React Redux](https://github.com/reduxjs/react-redux) : v9.0.4
    * [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) : v2.0.1
* API Calls
    * [Axios](https://github.com/axios/axios) : v1.6.2
* Payments
    * [React Paypal JS](https://github.com/paypal/react-paypal-js) : v8.1.3
    * [Paypal JS](https://github.com/paypal/paypal-js) : v8.0.0
* Date Picker
    * [React Day Picker](https://github.com/gpbl/react-day-picker) : v8.10.1
    * [Date fns](https://github.com/date-fns/date-fns) : v3.6.0
* Multilingual
    * [i18n](https://github.com/i18next/i18next) : v23.7.11
    * [react-i18next](https://github.com/i18next/react-i18next) : v6.20.1
* Form Handling
    * [React Hook Form](https://github.com/react-hook-form/react-hook-form) : v7.49.2
 

