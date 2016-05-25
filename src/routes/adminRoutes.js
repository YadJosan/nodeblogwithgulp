var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'The Lightning Thief',
        author: 'Rick Riordan',
        genre: 'fantasy',
        bookId: 28187
    },
    {
        title: 'The Sea of Monsters',
        author: 'Rick Riordan',
        genre: 'fantasy',
        bookId: 28186
    },
    {
        title: 'Sophies World : The Greek Philosophers',
        author: 'Jostein Gaarder',
        genre: 'fantasy',
        bookId: 58302
    },
    {
        title: 'Lucene in Action, Second Edition',
        author: 'Michael McCandless',
        genre: 'IT',
        bookId: 22131010
    }
 ];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                });
                db.close();
            });
            //res.send('inserting book');
        });
    return adminRouter;
};

module.exports = router;