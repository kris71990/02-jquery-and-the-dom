'use strict';

let articles = [];

// DONE: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE
// This is a constructor function that can be used to create instances of articles
// rawDataObj represents data that is passed into the constructor and is used to
// create object instances

function Article (dataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = dataObj.title;
  this.category = dataObj.category;
  this.author = dataObj.author;
  this.authorUrl = dataObj.authorUrl;
  this.publishedOn = dataObj.publishedOn;
  this.body = dataObj.body;
}

Article.prototype.toHtml = function() {
  // DONE: What is the benefit of cloning the article? (see the jQuery docs)
  // PUT YOUR RESPONSE HERE
  // the .clone() method creates a representative copy of the targeted elements in
  // order to do some other task like adding a class or appending to the DOM

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  $newArticle.find('h1').text(this.title);
  $newArticle.find('a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').text(this.publishedOn);
  $newArticle.removeClass('template');

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  console.log($newArticle);
  return $newArticle;
};

rawData.sort(function(a,b) {
  // DONE: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  // without callback, articles would be sorted by converting to strings and comparing the unicode values of the strings
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// // DONE: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(dataObj) {
  articles.push(new Article(dataObj));
})

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
})

