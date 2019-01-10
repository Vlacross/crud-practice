const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
const assert = require('chai').assert;


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


    it('should create new blog POST', function() {

        /*make content to send as test */
        const practicePost = {
            "title": "tanning in a Jif Jar ",
            "content": "Creamy skin paste",
            "author": "Willy Skinner",
            "publishDate": 1547085051036
        }

        return chai.request(app)
        .post('/blog-posts')
        .send(practicePost)
        .then(function(res) {
            /*make sure our post routes returns proper status */
            expect(res).to.have.status(201)
            /*make GET req to obtain updated list(after POST) */
            return chai.request(app)
            .get('/blog-posts')
            .then(function(res) {
                /*validate the existence of the post we made in the blog db */
                const matcher = res.body.filter(post => post.title === practicePost.title)
                // (could write conditional based on whether more than one post has same title)assert.lengthOf(matcher, 1)
                expect(matcher[0]).to.be.an('object')
                assert.propertyVal(matcher[0], 'content', practicePost.content)
    
                //  res.body.forEach(function(post) {
                //      if(post.title === practicePost.title)
                //      assert.propertyVal(post, 'content', practicePost.content)
                //  })
            })
        })
    })

    it('should UPDATE existing post', function() {

        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
            expect(res).to.have.status(200)
            assert.isNotEmpty(res.body)
            const target = res.body[0].id;
            
            return chai.request(app)
            .put(`/blog-posts/${target}`)
            .send({
                "id": `${target}`,
                "title": "tanning in a Jif Jar ",
                "content": "Creamy skin paste",
                "author": "Willy Skinner",
                "publishDate": 1547085051036
            })
            .then(function(res) {
                expect(res).to.have.status(204)
            })
            

        })
    })


})