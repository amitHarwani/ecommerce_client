## ecommerce frontend application

This is an ecommerce client app which is made by consuming freeapi: https://github.com/hiteshchoudhary/apihub.

### Steps to run the code locally
* Download the freeapi project from: https://github.com/hiteshchoudhary/apihub, and set the project up.
* In .env, Replace:
  * VITE_SERVER_URI: With the path where freeapi server is running
  * VITE_PAYPAL_CLIENT_ID: With your own paypal client id.
* Run ```javascript npm i ```
* Run ```javascript npm run dev```, the development server will start on port 3000: Visit http://localhost:3000 to view the client app.


