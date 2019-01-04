const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const {BlogPosts} = require('./postModels')





BlogPosts.create('homemade bread', 'heres the esp', '11/10/11')
BlogPosts.create('canned fruit', 'pringles prison rules-popTheTop', '11/10/11')
BlogPosts.create('XC-ski brewing kit', 'cross-country ski-brew skidoos', '11/10/11')
BlogPosts.create('Tilde Manny', 'HeresHammy surprise', 'The other Guys did', '04/JANNY/29teen')

router.get('/', (req,res) => {
    res.json(BlogPosts.get())
})

router.post('/', jsonParser, (req, res) => { 
    const requiredFields = ['title', 'content', 'author'];
    for(let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
    if(!(field in req.body)) {
        console.log('not enough stuff to post!')}
    } BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate)
    res.status(201).end()
})

router.put('/:id', jsonParser, (req, res) => {
    
    const requiredFields = ['id', 'title', 'content', 'author'];
    for(i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in body`;
            console.error(message);
            return res.status(400);
        } 
    }
    if(req.params.id !== req.body.id) {
        const message = `Request body id and request parameter id don't match!`
        console.error(message)};
        BlogPosts.update(req.body)
        return res.status(204).end()
})

router.delete('/:id', jsonParser, (req, res) => {
    BlogPosts.delete(req.params.id)
    console.log(`${req.params.title} deleted!`)
    res.send(204).end()
})
module.exports = router;
