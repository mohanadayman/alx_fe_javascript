// Array of quote objects with text and category
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "The only impossible journey is the one you never begin.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Opportunity" }
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available. Please add a quote first.</p>';
        return;
    }
    
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Update the DOM with the random quote
    quoteDisplay.innerHTML = `
        <div class="quote-container">
            <p class="quote-text">"${randomQuote.text}"</p>
            <p class="quote-category">— ${randomQuote.category}</p>
        </div>
    `;
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    const formContainer = document.getElementById('addQuoteFormContainer');
    
    // Check if form already exists
    if (formContainer) {
        return; // Form already exists
    }
    
    // Create form container
    const container = document.createElement('div');
    container.id = 'addQuoteFormContainer';
    container.innerHTML = `
        <h2>Add a New Quote</h2>
        <form id="addQuoteForm">
            <div class="form-group">
                <label for="quoteText">Quote Text:</label>
                <textarea id="quoteText" rows="3" placeholder="Enter your quote" required></textarea>
            </div>
            <div class="form-group">
                <label for="quoteCategory">Category:</label>
                <input type="text" id="quoteCategory" placeholder="Enter category (e.g., Motivation, Life)" required>
            </div>
            <button type="submit">Add Quote</button>
        </form>
    `;
    
    // Insert form after the quote display
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.parentNode.insertBefore(container, quoteDisplay.nextSibling);
    
    // Add event listener to form
    const form = document.getElementById('addQuoteForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addQuote();
    });
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const quoteTextInput = document.getElementById('newQuoteText');
    const quoteCategoryInput = document.getElementById('newQuoteCategory');
    
    // Get values from form
    const text = quoteTextInput.value.trim();
    const category = quoteCategoryInput.value.trim();
    
    // Validate inputs
    if (!text || !category) {
        alert('Please fill in both quote text and category.');
        return;
    }
    
    // Create new quote object
    const newQuote = {
        text: text,
        category: category
    };
    
    // Add quote to the array
    quotes.push(newQuote);
    
    // Clear the form
    quoteTextInput.value = '';
    quoteCategoryInput.value = '';
    
    // Display the newly added quote
    showRandomQuote();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display initial random quote
    showRandomQuote();
    
    // Add event listener to the "Show New Quote" button
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    }
});

