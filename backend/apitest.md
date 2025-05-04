___________________________________________________________________________________
Register
___________________________________________________________________________________
Request Post :  http://localhost:5000/api/users/register

payload json
{
    "name":"Yashvendra",
    "email":"yashvendra@gmail.com",
    "password":"Yash123@#"
}

Response
{
    "user": {
        "name": "Yashvendra",
        "email": "uasjasjasjja@gmail.com",
        "password": "$2b$10$XmIQCnrBYJv4wuutGjnOGOfksb5Y.ShWZtt5mPSjsWvSucdZdKQF2",
        "_id": "67d44f642736be1a406f4099",
        "createdAt": "2025-03-14T15:46:44.748Z",
        "updatedAt": "2025-03-14T15:46:44.748Z",
        "__v": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDQ0ZjY0MjczNmJlMWE0MDZmNDA5OSIsIm5hbWUiOiJZYXNodmVuZHJhIiwiaWF0IjoxNzQxOTY3MjA0LCJleHAiOjE3NDIwMDMyMDR9.A_roGteoEeBSMfzxpoHmYj0gaoHijy0Q70EF8GkorFc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDQ0ZjY0MjczNmJlMWE0MDZmNDA5OSIsIm5hbWUiOiJZYXNodmVuZHJhIiwiaWF0IjoxNzQxOTY3MjA0LCJleHAiOjE3NDI1NzIwMDR9.HNNCnWdQfav545MJvl-aFlUIycnUBnpes5QzEAn6eYQ"
}
___________________________________________________________________________________
Login
___________________________________________________________________________________
Request Post : http://localhost:5000/api/users/login

payload json
{
     "email":"yashvendra@gmail.com",
    "password":"Yash123@#"
}

Response
{
    "success": true,
    "message": "Login successful",
    "user": {
        "_id": "67d467c1d912adedf8e28566",
        "name": "Yashvendra",
        "email": "yyyyy@gmail.com",
        "password": "$2b$10$9ON0heqeoGbS2GT0ckQGIOC.K2mQOi9PL9ZBaWs1Wol056OTennE.",
        "createdAt": "2025-03-14T17:30:41.583Z",
        "updatedAt": "2025-03-14T17:30:41.583Z",
        "__v": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDQ2N2MxZDkxMmFkZWRmOGUyODU2NiIsIm5hbWUiOiJZYXNodmVuZHJhIiwiaWF0IjoxNzQxOTczODAzLCJleHAiOjE3NDIwMDk4MDN9.v_3bFL2nNaKT4g6HqMyGxtI_5OegX_u9edHXwyRjB6Q",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDQ2N2MxZDkxMmFkZWRmOGUyODU2NiIsIm5hbWUiOiJZYXNodmVuZHJhIiwiaWF0IjoxNzQxOTczODAzLCJleHAiOjE3NDI1Nzg2MDN9.LHe0sRII2rp-1KDfn9Eyp2uJBOAlNGbmNo8gjLj-iNQ"
}
___________________________________________________________________________________
Update
___________________________________________________________________________________
Request Put :http://localhost:5000/api/users/update/67d43d9e3340cd52d8edcc69

payload json
{
  "name": "John Updated"
}
Response
{
    "_id": "67d43d9e3340cd52d8edcc69",
    "name": "John Updated",
    "email": "yashvendra@gmail.com",
    "password": "$2b$10$wsjuB5FtTpyD3QkOAHQwJuDlyvFjsUWacuSSvvddej5K1nDb661oy",
    "createdAt": "2025-03-14T14:30:55.011Z",
    "updatedAt": "2025-03-14T15:02:13.936Z",
    "__v": 0
}
__________________________________________________________________________________
Delete
_______________________________________________________________________________
Delete http://localhost:5000/api/users/delete/67d43d9e3340cd52d8edcc69

respone
{
    "message": "User deleted successfully"
}
__________________________________________________________________________________
Get UserDetais
_______________________________________________________________________________
Get http://localhost:5000/api/users/detail/67d44ac893b5ff06253d36d0

respone
{
    "message": "User retrieved successfully",
    "user": {
        "_id": "67d44ac893b5ff06253d36d0",
        "name": "Yashvendra",
        "email": "yashvendra@gmail.com",
        "createdAt": "2025-03-14T15:27:04.138Z",
        "updatedAt": "2025-03-14T15:27:04.138Z",
        "__v": 0
    }
}