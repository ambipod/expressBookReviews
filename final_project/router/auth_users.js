const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let usersNameCheck = users.filter((user) => {
    return user.username === username
  });
  if (usersNameCheck.length > 0) {
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let userNameValid = users.filter((user) => {
    return (user.username === username && user.password === password)
  });

  if (userNameValid.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 });
    //console.log(accessToken);
    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "login error check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  let selected_book = books[isbn]
  if (selected_book) {
    let review = req.query.review;
    let reviewer = req.session.authorization['username'];
    if (review) {
      selected_book['reviews'][reviewer] = review;
      books[isbn] = selected_book;
    }
    res.send(`Review with isbn number  ${isbn} has been updated.`);
  }
  else {
    res.send("Error with isbn number");
  }
});

// Delete a book review 
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let userReview = req.session.authorization['username'];
  let selected_review = books[isbn]["reviews"];
  if (selected_review[userReview]) {
    delete selected_review[userReview];
    res.send(`Reviews for the ISBN  ${isbn} posted by the user ${userReview} deleted.`);
  } else {
    res.send("Review not found");
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
