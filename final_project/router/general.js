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
      return res.status(200).json({ message: "User successfully registered" });
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

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author;
  let bookInfo = Object.values(books)
  console.log(bookInfo);
  let selectBooks = bookInfo.filter(book => book.author === author);
  return res.status(300).json(selectBooks);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  let titleBooks = Object.values(books)
  console.log(titleBooks);
  let selectTitleBooks = titleBooks.filter(book => book.title === title);
  return res.status(300).json(selectTitleBooks);
});

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
