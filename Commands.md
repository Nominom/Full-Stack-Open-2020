## Create new react project
npx create-react-app nameofapp

## Start app
npm start

## Start app with environment variable (Powershell)
($env:REACT_APP_API_KEY = "abcdef") -and (npm start)

## Start json server
npx json-server --port 3001 --watch db.json

## Install module to project
npm install modulename --save

## Install axios
npm install axios --save

## Install global npm package
npm install -g packagename

## Copying project (if doesn't work after)
remove node_modules directory
npm install

## Login to heroku
heroku login

## Create heroku app
heroku create

## Update heroku app
git push heroku master

## Open heroku app
heroku open

## Set heroku configs
heroku config:set MONGODB_URI="mongodb+srv://fullstack:<password>@example.net/database?retryWrites=true"

