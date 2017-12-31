'use strict';

const chai = require('chai');
const faker = require('faker');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();
const {TEST_DATABASE_URL} = require('../config');
const {Badge, Chore, Family} = require('../models');

let cookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjVhMzAyOTEyMzc2Y2U0NWE4YzIxZmU2YyIsInVzZXJuYW1lIjoiZ3JlZW5zZXJ2byIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIn0sImlhdCI6MTUxNDQ5NDgwMywiZXhwIjoxNTE1MDk5NjAzLCJzdWIiOiJncmVlbnNlcnZvIn0.qDbUE6UAOqaXsaOgGKFSae-gw1xqPJvTKv6UowBRR14';

chai.use(chaiHttp);

describe('Root', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});
	after(function() {
		return closeServer();
	});
	it('should have status code of 200 and HTML', function() {
		return chai.request(app)
			.get('/')
			.then(res => {
				res.should.have.status(200);
				res.should.be.html;
			});
	});
});

/*function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedBadgeData() {
  console.info('seeding badge data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      badgename: faker.lorem.sentence(),
      badgeCost: 10,
      createdBy: '5a302912376ce45a8c21fe6c'
    });
  }
  return Badge.insertMany(seedData);
}

describe('badge API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return seedBadgeData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });
  describe('GET endpoint', function() {
  	it('should return all existing badges', function() {
  		let res;
  		return chai.request(app)
  			.get('/api/api/badge')
  			.set('Authorization', 'Bearer ' + cookie)
  			.then(_res => {
  				res = _res;
  				res.should.have.status(200);
  				res.body.should.have.length.of.at.least(1);
  				return Badge.count();
  			})
  			.then(count => {
  				res.body.should.have.lengthOf(count);
  			});
  	});
  });
  describe('POST endpoint', function() {
  	it('should post a new badge', function() {
  		const newBadge = {
      		badgename: faker.lorem.sentence(),
      		badgeCost: 10
    	};
    	return chai.request(app)
    		.post('/api/api/badge')
        .set('Authorization', 'Bearer ' + cookie)
    		.send(newBadge)
    		.then(function(res) {
    			res.should.have.status(201);
    		});
  	});
  });
  describe('PUT endpoint', function() {
  	it('should update a badge', function() {
  		const updateData = {
  			badgename: faker.lorem.sentence(),
      		badgeCost: 10
  		};
  		return Badge
  			.findOne()
  			.then(post => {
  				updateData.id = post.id;
  				return chai.request(app)
  					.put(`/api/api/badge/${post.id}`)
            .set('Authorization', 'Bearer ' + cookie)
  					.send(updateData);
  			})
  			.then(res => {
  				res.should.have.status(204);
  			});
  	});
  });
  describe('DELETE endpoint', function() {
  	it('should delete a badge', function() {
  		let post;
  		return Badge
  			.findOne()
  			.then(_post => {
  				post = _post;
  				return chai.request(app)
  				.delete(`/api/api/badge/${post.id}`)
          .set('Authorization', 'Bearer ' + cookie)
  			})
  			.then(res => {
  				res.should.have.status(204);
  			});
  	});
  });
});

function seedChoreData() {
  console.info('seeding badge data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      chore: faker.lorem.sentence(),
      pointValue: 10,
      createdBy: '5a302912376ce45a8c21fe6c'
    });
  }
  return Chore.insertMany(seedData);
};

describe('chore API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return seedChoreData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });
  describe('GET endpoint', function() {
  	it('should return all existing chores', function() {
  		let res;
  		return chai.request(app)
  			.get('/api/api/chore')
        .set('Authorization', 'Bearer ' + cookie)
  			.then(_res => {
  				res = _res;
  				res.should.have.status(200);
  				res.body.should.have.length.of.at.least(1);
  				return Chore.count();
  			})
  			.then(count => {
  				res.body.should.have.lengthOf(count);
  			});
  	});
  });
  describe('POST endpoint', function() {
  	it('should post a new chore', function() {
  		const newChore = {
      		chore: faker.lorem.sentence(),
      		pointValue: 10
    	};
    	return chai.request(app)
    		.post('/api/api/chore')
        .set('Authorization', 'Bearer ' + cookie)
    		.send(newChore)
    		.then(function(res) {
    			res.should.have.status(201);
    		});
  	});
  });
  describe('PUT endpoint', function() {
  	it('should update a chore', function() {
  		const updateData = {
  			chore: faker.lorem.sentence(),
      		pointValue: 10
  		};
  		return Chore
  			.findOne()
  			.then(post => {
  				updateData.id = post.id;
  				return chai.request(app)
  					.put(`/api/api/chore/${post.id}`)
            .set('Authorization', 'Bearer ' + cookie)
  					.send(updateData);
  			})
  			.then(res => {
  				res.should.have.status(204);
  			});
  	});
  });
  describe('DELETE endpoint', function() {
  	it('should delete a chore', function() {
  		let post;
  		return Chore
  			.findOne()
  			.then(_post => {
  				post = _post;
  				return chai.request(app)
  				.delete(`/api/api/chore/${post.id}`)
          .set('Authorization', 'Bearer ' + cookie)
  			})
  			.then(res => {
  				res.should.have.status(204);
  			});
  	});
  });
});

function seedFamilyData() {
  console.info('seeding family data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      name: faker.name.firstName(),
      pointsAccrued: 10,
      createdBy: '5a302912376ce45a8c21fe6c'
    });
  }
  return Family.insertMany(seedData);
};

describe('family API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return seedFamilyData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });
  describe('GET endpoint', function() {
  	it('should return all existing family members', function() {
  		let res;
  		return chai.request(app)
  			.get('/api/api/family')
        .set('Authorization', 'Bearer ' + cookie)
  			.then(_res => {
  				res = _res;
  				res.should.have.status(200);
  				res.body.should.have.length.of.at.least(1);
  				return Family.count();
  			})
  			.then(count => {
  				res.body.should.have.lengthOf(count);
  			});
  	});
  });
  describe('POST endpoint', function() {
  	it('should post a new family member', function() {
  		const newFamily = {
      		name: faker.name.firstName(),
      		pointsAccrued: 10,
    	};
    	return chai.request(app)
    		.post('/api/api/family')
        .set('Authorization', 'Bearer ' + cookie)
    		.send(newFamily)
    		.then(function(res) {
    			res.should.have.status(201);
    		});
  	});
  });
  describe('PUT endpoint', function() {
  	it('should update a family member', function() {
  		const updateData = {
  			name: faker.name.firstName(),
      		pointsAccrued: 10,
  		};
  		return Family
  			.findOne()
  			.then(post => {
  				updateData.id = post.id;
  				return chai.request(app)
  					.put(`/api/api/family/${post.id}`)
            .set('Authorization', 'Bearer ' + cookie)
  					.send(updateData);
  			})
  			.then(res => {
  				res.should.have.status(204);
  			});
  	});
  });
  describe('DELETE endpoint', function() {
  	it('should delete a family member', function() {
  		let post;
  		return Family
  			.findOne()
  			.then(_post => {
  				post = _post;
  				return chai.request(app)
  				.delete(`/api/api/family/${post.id}`)
          .set('Authorization', 'Bearer ' + cookie)
  			})
  			.then(res => {
  				res.should.have.status(204);
  			});
  	});
  });
});*/