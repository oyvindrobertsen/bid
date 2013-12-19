#Bid - A bidding webapp

A simple webapplication for hosting bidding rounds, written in Javascript using technologies like
Node.js, Express, MongoDB and AngularJS.

## API Endpoints

The backend is a simple RESTful API written with Express with the following endpoints:

|Method     |URL                    |Authenticated      |Description            |
|-----------|-----------------------|-------------------|-----------------------|
|**GET**    |`/api/sessions`        |Yes                |Returns all sessions   |
|**POST**   |`/api/sessions`        |Yes                |Add a new session      |
|**GET**    |`/api/session/:id`     |Yes                |Returns session with specified id|
|**POST**   |`/api/addUser`         |No                 |Adds a user to the database|

More to come.

## Todo

Make the actual app.

## Getting set up

Set up MongoDB.

Clone the repo, run `npm install`, then `node app.js`
