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
|**GET**    |`/api/participants`    |Yes                |Returns a list of the participants of a session. Session id must be in request body.
|**POST**   |`/api/participants`    |Yes                |Adds a participant to a session. Session id must be in request body. Also registers the participant in the user db, this leads to simpler authentication.|
|**GET**    |`/api/users/:id`       |Yes                |Gets user by id.       |


More to come.

## Todo
* Set up a session admin overview
* Make a participants session view
* Allow a user to "upgrade" from participant to host
* Set up some realtime stuff

## Getting set up

Set up MongoDB.

Clone the repo, run `npm install`, then `node app.js`
