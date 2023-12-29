const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      return res.status(404).json({ message: "User already exists" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});



// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

public_users.get('/books', async function (req, res) {
  try {
    await new Promise((resolve) => {
      resolve(res.send(JSON.stringify({ books }, null, 4)));
    });
    console.log("Promise for Task 10 resolved");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

// Get book details based on ISBN
//public_users.get('/isbn/:isbn', function (req, res) {
//Write your code here
//const isbn = req.params.isbn;
//res.send(books[isbn]);
//});

//AaAw for finding books by isbn
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    await new Promise((resolve) => {
      resolve(res.send(JSON.stringify({ books }, null, 4)));
    });
    console.log("Promise for Task 11 resolved");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;

  getBooksByAuthor(author, (error, book) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });
});

function getBooksByAuthor(author, callback) {
  process.nextTick(() => {
    try {
      const book = Object.values(books).find(book => book.author === author);
      callback(null, book);
    } catch (error) {
      callback(error, null);
    }
  });
}

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;

  getBooksByTitle(title, (error, book) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });
});

function getBooksByTitle(title, callback) {
  process.nextTick(() => {
    try {
      const book = Object.values(books).find(book => book.title === title);
      callback(null, book);
    } catch (error) {
      callback(error, null);
    }
  });
}

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const ISBN = parseInt(req.params.isbn) - 1;
  let bookDetailsISBN = Object.values(books)
  book_review = (bookDetailsISBN[ISBN]);
  console.log(book_review);
  res.send(book_review.reviews);
});

module.exports.general = public_users;
