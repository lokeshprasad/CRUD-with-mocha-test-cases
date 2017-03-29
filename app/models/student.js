let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//student schema definition
let Student = new Schema(
	{
		name: { type: String, required: true },
		section: { type: String, required: true },
		sex: { type: String},
		std: { type: Number, required: true, min: 1 },
		roll: { type: Number, required: true, min: 1 },
		createdAt: { type: Date, default: Date.now }
	},
	{
		versionKey: false
	}
);

// Sets the createdAt parameter equal to the current time
Student.pre('save', next => {
	now = new Date();
if(!this.createdAt) {
	this.createdAt = now;
}
next();
});

//Exports the StudentSchema for use elsewhere.
module.exports = mongoose.model('student', Student);
