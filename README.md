http://localhost:3000/auth/login

{
  "email": "admin@admin.com",
  "password": "admin123"
}

yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTczODI0ODA2MSwiZXhwIjoxNzM4MjUxNjYxfQ.hIKE5boeffTLWrDUxbYbEJ-1OtjsJasiVBxuX2I2kO0

http://localhost:3000/users/register-vulnerable

Authorization: Bearer TOKEN_DO_LOGIN
Content-Type: application/json

{
  "username": "adminUser",
  "email": "admin@email.com",
  "password": "123456",
  "isAdmin": true
}

http://localhost:3000/users/register-secure

{
  "username": "userNormal",
  "email": "user@email.com",
  "password": "123456",
  "isAdmin": true
}


npm install

npm start

node server.js

