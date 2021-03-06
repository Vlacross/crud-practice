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

    it('should return single blog post when supplied with post id', function() {

        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
            const testTarget = res.body[0].id;

            return chai.request(app)
            .get(`/blog-posts/${testTarget}`)
            .then(function(res) {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.equal(testTarget);
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

                // ([IDEA]could write conditional based on whether more than one post has same title)assert.lengthOf(matcher, 1)

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

        /*get list to obtain 'id' to test */
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
            expect(res).to.have.status(200)
            assert.isNotEmpty(res.body)
            const target = res.body[0].id;
            
            /*send update with new material using test 'id' */
            const updateData = {
                "id": `${target}`,
                "title": "Scrumptious Dumpsterous Lamb Bars",
                "content": "Offer Rings Offerings",
                "author": "Don't Eat Friends",
                "publishDate": 'twenty-fours&&twenty-sevens'
            };
            return chai.request(app)
            .put(`/blog-posts/${target}`)
            .send(updateData)
            .then(function(res) {
                expect(res).to.have.status(204)
                
                /*get list to check that id was updated */
                return chai.request(app)
                .get(`/blog-posts/${target}`)
                .then(function(res) {
                    
                })
            })
            

        })
    });

    it('should DELETE post', function() {

        /*get list to obtain 'id' to test */
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
            expect(res).to.have.status(200)
            assert.isNotEmpty(res.body)
            const target = res.body[0].id;

            return chai.request(app)
            .delete(`/blog-posts/${target}`)
            .then(function(res) {

                return chai.request(app)
                .get('/blog-posts')
                .then(function(res) {
                    
                    var search = res.body.filter(post => post.id === `${target}`)
                    expect(search).be.a('array')
                    assert.isEmpty(search)
                })
            })
        });
    });


})