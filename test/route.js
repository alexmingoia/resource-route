var expect = require('expect.js');

describe('resource-route', function() {
  it('exports route factory function', function() {
    expect(require('..')).to.be.a('function');
  });

  it('creates route function', function() {
    var route = require('..')({});
    expect(route).to.be.a('function');
  });

  describe('.route()', function() {
    it('routes resource middleware with provided models');
    it('uses model factory');
    it('uses middleware factory');
  });
});
