// Array of quote objects with text and category
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "The only impossible journey is the one you never begin.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Opportunity" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
        try {
            quotes = JSON.parse(savedQuotes);
        } catch (e) {
            console.error('Error loading quotes from local storage:', e);
        }
    }
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Clear previous content
    quoteDisplay.innerHTML = '';
    
    if (quotes.length === 0) {
        const noQuoteMsg = document.createElement('p');
        noQuoteMsg.textContent = 'No quotes available. Please add a quote first.';
        quoteDisplay.appendChild(noQuoteMsg);
        return;
    }
    
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Create quote container
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-container';
    
    // Create quote text element
    const quoteText = document.createElement('p');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${randomQuote.text}"`;
    
    // Create quote category element
    const quoteCategory = document.createElement('p');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = `— ${randomQuote.category}`;
    
    // Append elements to container
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(quoteCategory);
    
    // Append container to display
    quoteDisplay.appendChild(quoteContainer);
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
    
    // Save quotes to local storage
    saveQuotes();
    
    // Clear the form
    quoteTextInput.value = '';
    quoteCategoryInput.value = '';
    
    // Display the newly added quote
    showRandomQuote();
}

// Function to export quotes to JSON file
function exportToJson() {
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            showRandomQuote();
            alert('Quotes imported successfully!');
        } catch (e) {
            alert('Error importing quotes. Please check the JSON file format.');
            console.error('Error importing quotes:', e);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load quotes from local storage
    loadQuotes();
    
    // Display initial random quote
    showRandomQuote();
    
    // Add event listener to the "Show New Quote" button
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    }
});

