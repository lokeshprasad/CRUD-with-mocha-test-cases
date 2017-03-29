let Promise = require("bluebird");
let Student = require('../models/student');

/*
@returns array of students
 */
function getStudents() {
	return new Promise((resolve, reject) => {
		//Query the DB and if no errors, send all the students
		let query = Student.find({});
		query.exec((err, students) => {
			if(err) reject(err);
			//If no errors, send them back to the client
			resolve(students);
		});
	});
}

/*
@params id - studentId
@returns student object
 */
function getStudent(id) {
	return new Promise((resolve, reject) => {
			//Query the DB and if no errors, send all the students
			let query = Student.findById(id, (err, student) => {
					query.exec((err, students) => {
					if(err) reject(err);
					resolve(students);
					});
			});
	})
}

/*
@params : name, section, sex, rollno, std
@returns : object with message and student object
 */
function saveStudent (data) {
	return new Promise((resolve, reject) => {
			let newStudent = new Student(data);
			newStudent.save((err, student) => {
			if (err) {
				reject(err);
			}
			else {
				//If no errors, send it back to the client
				resolve({message: "Student successfully added!", student});
			}
		})
	})
}

/*
@params: student Id
@returns : Object with message and result
 */
function deleteStudent(id) {
	return new Promise((resolve, reject) => {
		Student.remove({_id : id}, (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				//If no errors, send it back to the client
				resolve({ message: "Student successfully deleted!", result});
			}
		})
	})
}

/*
 @ data to update object
 @returns Object with message and updated data
 */
function updateStudent(id, data) {
	return new Promise((resolve, reject) => {
		Student.findById({_id: id}, (err, student) => {
			if(err) res.send(err);
			Object.assign(student, data).save((err, student) => {
				if(err) reject(err);
				resolve({message: 'Student updated!', student});
			});
		});
	});
}

//export all the functions
module.exports = { getStudents, saveStudent, getStudent, deleteStudent, updateStudent};