const express = require('express');
const app = express();
const morgan = require('morgan');
const router = express.Router();

/*import  */
const BlogPosts = require('./blog-posts')

/*log activity with every transaction */
app.use(morgan('common'));

/*load html */

app.use(express.static('views'));


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
//   });


app.use('/blog-posts', BlogPosts)

// app.get('/blog-posts', (req, res) => {
//     console.log("GET recieved")
//     res.json(BlogPosts.get())
// })

// app.post('/blog-posts', (req, res) => {
//     console.log("POST recieved")
//     res.send(BlogPosts.post())
// })




app.listen(process.env.PORT || 8080, () => {
    console.log(`Port of Posts in listening @ ${process.env.PORT || 8080}`);
  });
  
