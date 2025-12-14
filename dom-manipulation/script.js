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

// Variable to track current filter
let currentFilter = 'all';

// Variable to track periodic fetch interval
let fetchInterval = null;

// Categories mapping for JSONPlaceholder userId to quote categories
const userIdToCategory = {
    1: 'Motivation',
    2: 'Leadership',
    3: 'Life',
    4: 'Dreams',
    5: 'Inspiration',
    6: 'Success',
    7: 'Opportunity',
    8: 'Wisdom',
    9: 'Growth',
    10: 'Perseverance'
};

// Function to save selected category filter to local storage
function saveCategoryFilter() {
    localStorage.setItem('selectedCategoryFilter', currentFilter);
}

// Function to load selected category filter from local storage
function loadCategoryFilter() {
    const savedFilter = localStorage.getItem('selectedCategoryFilter');
    if (savedFilter) {
        currentFilter = savedFilter;
    }
}

// Function to populate categories dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Extract unique categories from quotes array
    const categories = [...new Set(quotes.map(quote => quote.category))].sort();
    
    // Clear existing options except "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    // Add each unique category as an option
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    // Restore saved filter selection
    categoryFilter.value = currentFilter;
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    currentFilter = categoryFilter.value;
    saveCategoryFilter();
    showRandomQuote();
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Clear previous content
    quoteDisplay.innerHTML = '';
    
    // Filter quotes based on selected category
    let filteredQuotes = quotes;
    if (currentFilter !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === currentFilter);
    }
    
    if (filteredQuotes.length === 0) {
        const noQuoteMsg = document.createElement('p');
        if (quotes.length === 0) {
            noQuoteMsg.textContent = 'No quotes available. Please add a quote first.';
        } else {
            noQuoteMsg.textContent = `No quotes available in the "${currentFilter}" category.`;
        }
        quoteDisplay.appendChild(noQuoteMsg);
        return;
    }
    
    // Get a random quote from filtered quotes
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    
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
    
    // Check if this is a new category
    const isNewCategory = !quotes.some(quote => quote.category.toLowerCase() === category.toLowerCase());
    
    // Add quote to the array
    quotes.push(newQuote);
    
    // Save quotes to local storage
    saveQuotes();
    
    // Post quote to server (simulate server sync)
    postQuoteToServer(newQuote);
    
    // Update categories dropdown if new category was added
    if (isNewCategory) {
        populateCategories();
    }
    
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
            populateCategories();
            showRandomQuote();
            alert('Quotes imported successfully!');
        } catch (e) {
            alert('Error importing quotes. Please check the JSON file format.');
            console.error('Error importing quotes:', e);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to convert JSONPlaceholder posts to quotes format
function convertPostsToQuotes(posts) {
    return posts.map(post => ({
        text: post.title,
        category: userIdToCategory[post.userId] || 'General',
        serverId: post.id, // Track server ID for conflict resolution
        serverTimestamp: Date.now()
    }));
}

// Function to update sync status display
function updateSyncStatus(message, isError = false) {
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) {
        syncStatus.textContent = message;
        syncStatus.style.color = isError ? '#d32f2f' : '#666';
    }
}

// Function to fetch quotes from JSONPlaceholder
async function fetchQuotesFromServer() {
    try {
        updateSyncStatus('Syncing with server...');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        if (!response.ok) {
            throw new Error('Failed to fetch quotes from server');
        }
        const posts = await response.json();
        const serverQuotes = convertPostsToQuotes(posts);
        
        // Resolve conflicts - server data takes precedence
        resolveConflicts(serverQuotes);
        
        // Save last fetch timestamp
        const fetchTime = Date.now();
        localStorage.setItem('lastServerFetch', fetchTime.toString());
        
        const lastFetchDate = new Date(fetchTime);
        updateSyncStatus(`Last synced: ${lastFetchDate.toLocaleTimeString()}`);
        console.log('Quotes fetched and synchronized from server');
        return serverQuotes;
    } catch (error) {
        updateSyncStatus('Sync failed. Check console for details.', true);
        console.error('Error fetching quotes from server:', error);
        return [];
    }
}

// Function to resolve conflicts - server data takes precedence
function resolveConflicts(serverQuotes) {
    // Create a map of server quotes by serverId
    const serverQuotesMap = new Map();
    serverQuotes.forEach(quote => {
        serverQuotesMap.set(quote.serverId, quote);
    });
    
    // Remove existing server quotes from local quotes
    quotes = quotes.filter(quote => !quote.serverId);
    
    // Add server quotes (server takes precedence)
    serverQuotes.forEach(serverQuote => {
        // Check if a similar quote already exists locally
        const existingIndex = quotes.findIndex(q => 
            q.text.toLowerCase() === serverQuote.text.toLowerCase() &&
            q.category === serverQuote.category
        );
        
        if (existingIndex === -1) {
            // Add new server quote
            quotes.push(serverQuote);
        } else {
            // Replace local quote with server quote (server takes precedence)
            quotes[existingIndex] = serverQuote;
        }
    });
    
    // Save updated quotes
    saveQuotes();
    
    // Update categories dropdown
    populateCategories();
    
    // Refresh display if needed
    showRandomQuote();
}

// Function to post a quote to JSONPlaceholder
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: quote.text,
                body: quote.category,
                userId: Object.keys(userIdToCategory).find(
                    key => userIdToCategory[key] === quote.category
                ) || 1
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to post quote to server');
        }
        
        const result = await response.json();
        console.log('Quote posted to server:', result);
        return result;
    } catch (error) {
        console.error('Error posting quote to server:', error);
        return null;
    }
}

// Function to start periodic fetching
function startPeriodicFetch(intervalSeconds = 30) {
    // Clear existing interval if any
    if (fetchInterval) {
        clearInterval(fetchInterval);
    }
    
    // Fetch immediately on start
    fetchQuotesFromServer();
    
    // Set up periodic fetching
    fetchInterval = setInterval(() => {
        fetchQuotesFromServer();
    }, intervalSeconds * 1000);
    
    console.log(`Periodic fetching started (every ${intervalSeconds} seconds)`);
}

// Function to stop periodic fetching
function stopPeriodicFetch() {
    if (fetchInterval) {
        clearInterval(fetchInterval);
        fetchInterval = null;
        console.log('Periodic fetching stopped');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load quotes from local storage
    loadQuotes();
    
    // Load saved category filter
    loadCategoryFilter();
    
    // Populate categories dropdown
    populateCategories();
    
    // Fetch quotes from server on initialization
    fetchQuotesFromServer().then(() => {
        // Display initial random quote after server sync
        showRandomQuote();
    });
    
    // Start periodic fetching (every 30 seconds)
    startPeriodicFetch(30);
    
    // Add event listener to the "Show New Quote" button
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    }
    
    // Clean up interval when page unloads
    window.addEventListener('beforeunload', function() {
        stopPeriodicFetch();
    });
});

