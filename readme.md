
3/22/16:

This is my authentication api.  The createUser route allows you to create a user by doing the following curl command:

curl -X POST --data '{"name":"user", "password":"pass"}' localhost:4000/api/createUser

After entering this command you can now login with this username in password on the login page.  To do this use the following curl command:

curl -X POST -u user:pass localhost:4000/public/login

This will send back a JSON object with the corresponding user token.  Not that when testing this application using 'mocha', the database will be emptied.  
