# Shop-RestApi
## Shop-API for handling the orders, products, and user data.

Use the URI-: https://shop-restapi.herokuapp.com/ and the below mentioned routes to access the API.


## 1. /user
   * /getMyAllUserJustForME  Request Type [GET],(JWT-Token in header provided during login) -: will give all the users in json format.
   * /signup Request Type [POST], body with 2 fields in json format(email,password) -: This will make the acccount [<b>Note-:Password will be stored after hasing only.</b>].
   * /login  Request Type [POST], body with 2 fields in json format(email,password) -: It will give the JWT access token if credentials are correct to access other routes.
   * /:userId Request Type [Delete],(JWT-Token in header provided during login) -: To delete the user with the specific id provide in params. 
## 2. /products
   * Request Type [GET] -: will give all the products in json format
   * Request Type [POST],(JWT-Token in header provided during login), body in json with 3 fields(name,price,image)-: will post the product.
## 3. /products/:productId
   * Request Type [GET] -: will give the specific product with the requested id in params.
   * Request Type [Patch],(JWT-Token in header provided during login)-: pass those fields in body whose data needed to be patched.
   * Request Type [Delete],(JWT-Token in header provided during login) -: It will delete the product of given ID in the params.
## 4. /orders   
   * Request Type [GET],(JWT-Token in header provided during login) -: will give all the orders in json format
   * Request Type [POST],(JWT-Token in header provided during login), body in json with 3 fields(productId,quantity,producturl{made with passing productId only})-: will post the Order details.
## 5. /orders/:orderId
   * Request Type [GET],(JWT-Token in header provided during login) -: will give the specific details of order with the requested id in params.
   * Request Type [Patch],(JWT-Token in header provided during login)-: pass those fields in body whose data needed to be patched.
   * Request Type [Delete],(JWT-Token in header provided during login) -: It will delete the order details of given ID in the params.
 
   
