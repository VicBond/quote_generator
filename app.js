const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//hide loader
function completeLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}


//new quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author field is empty
  if(!quote.author){
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  //Check quote length to determine the styling
  if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //set a quote and hide Loader
  quoteText.textContent = quote.text;
  completeLoading();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch(err) {
    // catch error
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuotes();