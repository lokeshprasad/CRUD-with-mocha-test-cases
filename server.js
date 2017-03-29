let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let student = require('./app/routes/student');
let db = require('./app/db');
let config  = require('./config');
let port = config.APPLICATION_PORT;
let middleware = require('./app/middlewares');
let authenticate = require('./app/authenticate');

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// API ROUTES -------------------
var apiRoutes = express.Router();
var authenticateRoute = express.Router();

authenticateRoute.post('/authenticate', authenticate.verify);

authenticateRoute.get("/", (req, res) => res.json({message: "Welcome to homepage!"}));

// route middleware to verify a token
apiRoutes.use(middleware.authenticate());

apiRoutes.route("/student")
	.get(student.getStudents)
	.post(student.postStudent);


apiRoutes.route("/student/:id")
	.get(student.getStudent)
	.delete(student.deleteStudent)
	.put(student.updateStudent);

apiRoutes.route("/upload")
	.post(student.uploadImage);

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
app.use('/', authenticateRoute);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
