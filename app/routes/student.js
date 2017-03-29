let services = require("../services/");
let fs = require("fs");
let formidable = require("formidable");
let path = require("path");
/*
 * GET /students route to retrieve all the students.
 */
function getStudents(req, res) {
	services.getStudents()
			.then(function (student) {
				res.json(student);
			})
			.catch(function (err) {
				res.send(err);
			});
}

/*
 * POST /student to save a new student.
 */
function postStudent(req, res) {
	//Creates a new students
	var data = req.body;
	services.saveStudent(data)
			.then(function (student) {
				res.json(student);
			})
			.catch(function (err) {
				res.send(err);
			});

}

/*
 * GET /student/:id route to retrieve a student given its id.
 */
function getStudent(req, res) {
	services.getStudent(req.params.id)
			.then(function (student) {
				res.json(student);
			})
			.catch(function (err) {
				res.send(err);
			});
}

/*
 * DELETE /student/:id to delete a student given its id.
 */
function deleteStudent(req, res) {
	services.deleteStudent(req.params.id)
			.then(function (result) {
				res.json(result);
			})
			.catch(function (err) {
				res.send(err);
			});
};

function updateStudent(req, res) {
	services.updateStudent(req.params.id, req.body)
		.then(function (result) {
			res.json(result);
		})
		.catch(function (err) {
			res.send(err);
		});
};

function uploadImage(req, res, next) {
	// create an incoming form object
	let form = new formidable.IncomingForm();
	
	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;
	// store all uploads in the /uploads directory
	form.uploadDir = path.dirname(require.main.filename) + "/uploads";
	fs.exists(form.uploadDir, exists => {
		if (!exists) {
			fs.mkdir(form.uploadDir, function () {
				// parse the incoming request containing the form data
				form.parse(req);
			});
		} else {
			// parse the incoming request containing the form data
			form.parse(req);
		}
	});
	// every time a file has been uploaded successfully,
	// rename it to it"s orignal name
	form.on("file", (field, file) => {
		fileName = file.name;
		fs.rename(file.path, path.join(form.uploadDir, file.name));
	});
	
	// log any errors that occur
	form.on("error", err => {
		return next({"inner": "An error has occured while uploading"});
	});
	
	// once all the files have been uploaded, send a response to the client
	form.on("end", () => {
		res.status(200).json({"message": "success", "code": 200});
	});
}

//export all the functions
module.exports = { getStudents, postStudent, getStudent, deleteStudent, uploadImage, updateStudent};
