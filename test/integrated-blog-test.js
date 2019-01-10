const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;


chai.use(chaiHTTP);

const {runServer, closeServer, app} = require('../server');

describe('blog-post http routes', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should actuate http GET route', function() { 

        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.an('object');
            expect(res.body).to.be.an('array');
            res.body.forEach(function(post){
                expect(post).to.be.an('object')
                expect(post).to.include.keys(['id', 'author', 'title', 'content', 'publishDate'])
            })
            
        })
    })

    


})