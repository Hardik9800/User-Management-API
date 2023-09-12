# User-Management-API

A RESTful API for managing user accounts with basic CRUD operations.

### how to run file

* download zip file
* extract zip file in your system
* open file in VS code
* open terminal in Vs code
* run command npm i
* install the required dependencies
* adjust the database connection string
* run command node app.js


## How to call API

#### open PostMan Application and run these commands




We will create individual requests to test various endpoints of your API using Postman. You'll set up requests for each HTTP method (GET, POST, PUT, DELETE) to test the CRUD (Create, Read, Update, Delete) operations of your User Management API.

Let's go through the process:

- **Create a User (POST Request)**:

   1. Open Postman.

   2. Click the "New" button to create a new request. Give it a name like "Create User."

   3. Choose the HTTP method as POST.

   4. Enter the request URL: `http://localhost:8000/api/users` (Assuming your server is running on port 8000). Make sure to replace `localhost` and `8000` with the correct host and port if your server is running elsewhere.

   5. In the request body section, select "raw" and use JSON format to provide user data. For example:

      ```json
      {
        "username": "exampleUser",
        "email": "example@example.com",
        "password": "examplePassword"
      }
      ```

   6. Set the `Content-Type` header to `application/json` to indicate that you are sending JSON data.

   7. Click the "Send" button to execute the request. You should receive a response from your API with the newly created user's data and a JWT token.

- **Retrieve All Users (GET Request)**:

   1. Create a new request in Postman and name it "Get All Users."

   2. Choose the HTTP method as GET.

   3. Enter the request URL: `http://localhost:8000/api/users`.

   4. Click the "Send" button to execute the request. You should receive a response containing a list of all users.

- **Retrieve a Specific User by ID (GET Request)**:

   1. Create another new request and name it "Get User by ID."

   2. Choose the HTTP method as GET.

   3. Enter the request URL, replacing `{userId}` with the actual ID of a user you want to retrieve: `http://localhost:8000/api/users/{userId}`.

   4. Click the "Send" button to execute the request. You should receive a response containing the user's data.

- **Update a User (PUT Request)**:

   1. Create a new request and name it "Update User."

   2. Choose the HTTP method as PUT.

   3. Enter the request URL, replacing `{userId}` with the ID of the user you want to update: `http://localhost:8000/api/users/{userId}`.

   4. In the request body, provide the updated user data in JSON format. For example:

      ```json
      {
        "username": "updatedUsername",
        "email": "updated@example.com"
      }
      ```

   5. Set the `Content-Type` header to `application/json`.

   6. Click the "Send" button to execute the request. You should receive a response indicating that the user has been updated successfully.

- **Delete a User (DELETE Request)**:

   1. Create a new request and name it "Delete User."

   2. Choose the HTTP method as DELETE.

   3. Enter the request URL, replacing `{userId}` with the ID of the user you want to delete: `http://localhost:8000/api/users/{userId}`.

   4. Click the "Send" button to execute the request. You should receive a response indicating that the user has been deleted.

*Create a User (POST Request):
  then Token of jwt will be generated copy that token and go to head, in key write Authorisation, in value write Bearer and copy that token.
* for creating   __localhost:8500/products/create__  method: POST , here you have to give key as produt and value as product name.
* to list products  __localhost:8500/products__ method:Get.,To list all the products
* for deleting products   __localhost:8500/products/Id:__ method: Delete , here you have to give _id of the product which is to be deleted.
* to update quantity of a product (can be incremented or decremented)  __localhost:8500/products/:id/update_quantity__ method Post,In key write number,in value write the desired value.

![Screenshot (329)](https://user-images.githubusercontent.com/51282682/235378155-b5bc2272-fd4c-4d1d-96c5-77283be7da91.png)

![Screenshot (330)](https://user-images.githubusercontent.com/51282682/235378169-10df2d91-5626-4ec7-844a-3fb718da12e0.png)

