let Student = require('../app/models/student');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let token = "";

chai.use(chaiHttp);

describe('Students', () => {
	beforeEach((done) => {
		Student.remove({}, (err) => {
			done();
		});
	});
	/*
	 * GET TOKEN /GET route
	 */
	describe('/POST token', () => {
	  it('it should POST and get the token', (done) => {
		  chai.request(server)
			.post('/authenticate')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('Enjoy your token!');
				res.body.should.have.property('success');
				res.body.should.have.property('token');
				token = res.body.token;
				done();
			});
		});
	});
	/*
	 * Test the /GET route
	 */

	describe('/GET student', () => {
		it('it should GET all the students', (done) => {
			chai.request(server)
			  .get('/api/student?token='+token)
			  .end((err, res) => {
				res.should.have.status(200);
			res.body.should.be.a('array');
			res.body.length.should.be.eql(0);
			done();
		  });
	  });
	});
	/*
	 * Test the /POST route
	 */
	describe('/POST student', () => {
		it('it should not POST a students without required fields roll', (done) => {
		  let student = {
			name: "Lokesh",
			section: "A",
			sex: "male",
			std: 10
		  }
		  chai.request(server)
		  .post('/api/student?token='+token)
		  .send(student)
		  .end((err, res) => {
			  res.should.have.status(200);
			  res.body.should.be.a('object');
			  res.body.should.have.property('errors');
			  res.body.errors.should.have.property('roll');
			  done();
		  });
	  });
	it('it should POST a student ', (done) => {
		let student = {
			name: "Lokesh",
			section: "A",
			sex: "male",
			std: 10,
			roll: 25
		}
		chai.request(server)
		.post('/api/student?token='+token)
		.send(student)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message').eql('Student successfully added!');
			res.body.student.should.have.property('name');
			res.body.student.should.have.property('section');
			res.body.student.should.have.property('sex');
			res.body.student.should.have.property('std');
			res.body.student.should.have.property('roll');
			done();
		});
	});
	});
	/*
	 * Test the /GET/:id route
	 */
	describe('/GET/:id student', () => {
		it('it should GET a student by the given id', (done) => {
			let student = new Student({
				name: "Lokesh",
				section: "A",
				sex: "male",
				std: 10,
				roll: 25
			});
	student.save((err, student) => {
		chai.request(server)
			.get('/api/student/' + student.id + '?token='+token)
			.send(student)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name');
				res.body.should.have.property('section');
				res.body.should.have.property('sex');
				res.body.should.have.property('std');
				res.body.should.have.property('roll');
				res.body.should.have.property('_id').eql(student.id);
				done();
		});
	});
	});
	});
	/*
	 * Test the /PUT/:id route
	 */
	describe('/PUT/:id student', () => {
		it('it should UPDATE a student given the id', (done) => {
			let student = new Student({
				name: "Lokesh",
				section: "A",
				sex: "male",
				std: 10,
				roll: 25
			})
			student.save((err, student) => {
			chai.request(server)
			.put('/api/student/' + student.id + '?token='+token)
			.send({
				name: "Lokesh",
				section: "A",
				sex: "male",
				std: 10,
				roll: 26
			})
			.end((err, res) => {
		  res.should.have.status(200);
		  res.body.should.be.a('object');
		  res.body.should.have.property('message').eql('Student updated!');
		  res.body.student.should.have.property('roll').eql(26);
		  done();
		});
		});
	  });
	});
	/*
	 * Test the /DELETE/:id route
	 */
	describe('/DELETE/:id student', () => {
		it('it should DELETE a student given the id', (done) => {
			let student = new Student({
				name: "Lokesh",
				section: "A",
				sex: "male",
				std: 10,
				roll: 25
			})
			student.save((err, student) => {
				chai.request(server)
				.delete('/api/student/' + student.id + '?token='+token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Student successfully deleted!');
					res.body.result.should.have.property('ok').eql(1);
					res.body.result.should.have.property('n').eql(1);
					done();
				});
			});
		});
	});
});

