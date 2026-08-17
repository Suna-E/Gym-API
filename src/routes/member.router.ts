"post        /signup"
"post       /signin"
"get       /sessions/" // also support search: ?title=yoga
"get      /bookings/"
"post    /sessions/:sessionId/book"
"delete /bookings/:bookingId"


/*
Person 1
MongoDB models
Swagger doc
Person 2
auth
authz both middlewares
Person 3
search get /sessions
validation middlewares
*/ 