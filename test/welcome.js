var server = require('../server');
var request = require('supertest');

describe('GET /', () => {
  it('respond with html', function(done) {
    request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('has names in body', function(done) {
    request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect(200)
      .expect(/User List/, done);
  });
});
