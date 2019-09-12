# server-side

## User 
### Login
Route : `/login`  
Method : `POST`  
Headers : -   
Body : 
```
{
	"email" : "johnDoe@email.com",
	"password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "status": 200,
    "token": <TOKEN>
}

Error :
{
    "status": 400,
    "message": "Invalid Email/Password"
}
```
# 

### Register
Route : `/register`  
Method : `POST`  
Headers : -   
Body : 
```
{
	"email" : "johnDoe@email.com",
	"password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "status": 201,
    "createdUser": <user>
}

Error :
{
    "status": 400,
    "message": [<error message>]
}
```