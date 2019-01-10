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

app.use('/blog-posts', BlogPosts)

let server;

function runServer() {
  console.log('runner')
  const port = process.env.port || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Port of Posts in listening @ ${port}`)
      resolve(server);
    })
    .on('error', err => {
      reject(err);
    })
  })
};

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('closing out');
    server.close(err => {
      if(err) {
        console.log(err)
        reject(err);
        return;
      }
      resolve();
    });
  });
};


if (require.main === module) {
  runServer().catch(err => console.log(err));
};

// app.listen(process.env.PORT || 8080, () => {
//     console.log(`Port of Posts in listening @ ${process.env.PORT || 8080}`);
//   });

  module.exports = {runServer, closeServer, app}
  
