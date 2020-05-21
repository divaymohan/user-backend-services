# User Back End Service

## Prerequisites to Use
  * Node
  * MongoDB compass to work with mongoDB
  * Postman For Testing

## How to use:
  * Install Node.
  * Install Git
  * Run the command 
     
        git clone https://github.com/divaymohan/user-backend-services.git 

  * Go to the cloned directory and run
    
         npm install 

 * To install nodemon globally run :

       npm i nodemon -g

 * Go to cmd/shell and run :
    * for windows users:

             set DEBUG=* & nodemon index.js
    * for linux users:
        
             DEGUB =* & nodemon index.js

    * If above commands are not working

            nodemon index.js
            
    * if it shows message like `listening at 3000` then API is ready to use you can request.


## Requests :
 * ### Get Request
    * Get all users :
                    
            localhost:3000/api/users/

    * Get One user using id:
            
            
            localhost:3000/api/users/id/(userid)
    * Get One user by username:

            localhost:3000/api/users/name/(usename)

* ## Post Request
    * To add user in database 
            
          localhost:/3000/api/users/

         body:
       ```json 
       {
        "fisrtName": "fname",
        "lastName": "lname",
        "age": 24,
        "userName": "uname.lname",
        "password": "uname@123"
        } 
        ```
* ## Put Request
    * To update a users data
    
            localhost:/3000/api/users/(userid)

         body ( you can skip any property ):
       ```json 
       {
        "fisrtName": "fname",
        "lastName": "lname",
        "age": 24,
        "userName": "uname.lname",
        "password": "uname@123"
        } 
        ```
* ## Delete Request
    * To delete a user by it's id

          localhost:/3000/api/users/(userid)
          