// Event listener for delete buttons
document.getElementById('articles').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const article = event.target.closest('article');
        article.remove();
        calculateAndDisplayReadTime(); // Recalculate read time after deletion
    }
});

const articlesNotInLocalStorage = [
{date: '2/3/24',
content: 'I enacted my superpower: Ladderly with John.'
},

{
date: '2/10/24',
content: 'I completed the trial by fire. It went a lot like this: play, pause, play, pause, rewind, play, pause. You get the gist.',
}
]

function renderArticles() {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    const articleSection = document.getElementById('articles');
    const articlesToUse = articlesFromLocalStorage
        ? articlesFromLocalStorage
        : articlesNotInLocalStorage 

    for (let article of articlesNotInLocalStorage) {
        const newArticle = document.createElement('article');

        //Set date
        const date = document.createElement('h2');
        date.classList.add('date');
        date.textContent = article.date;
        newArticle.appendChild(date);

        //Set content
        const content = document.createElement('p');
        content.textContent = article.content;
        newArticle.appendChild(content);

        //Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');
        newArticle.appendChild(deleteButton);

        //Append article to articles section
        articleSection.appendChild(newArticle);
    }
}

renderArticles()


// Function to handle form submission
document.getElementById('new-entry-form').addEventListener('submit', function(event) {
event.preventDefault(); // Prevent form submission

// Get values from the form
    const date = document.getElementById('date').value;
    const entry = document.getElementById('entry').value;
    const font = document.getElementById('font-select').value;
    const backgroundColor = document.getElementById('background-color').value;

// Render the new article
renderNewArticle(date, entry, font, backgroundColor);

// Recalculate read time
calculateAndDisplayReadTime();

// Clear form fields
document.getElementById('new-entry-form').reset();
});_

function renderNewArticle(date, content, font, backgroundColor) {
    // Create a new article element
    const entry = document.createElement('article');
    entry.innerHTML = '<h2 class="date">' + date + '</h2><p>' + content + '</p>';

    // Add custom font
    entry.querySelector('p').style.fontFamily = font;

    // Add custom background color
    entry.style.backgroundColor = backgroundColor;

    // Add a delete button to the new article
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-btn';
    entry.appendChild(deleteButton);

    // Add the new article to the articles section
    document.getElementById('articles').appendChild(entry);
}



function getWordCount() {
    let paragraphs = document.getElementsByTagName('p');
    let h2s = document.getElementsByTagName('h2');
    let wordCount = 0;

    for (let i = 0; i < paragraphs.length; i++) {
        wordCount += paragraphs[i].innerText.split(/\s+/).length;
    }

    for (let i = 0; i < h2s.length; i++) {
        wordCount += h2s[i].innerText.split(/\s+/).length;
    }

    return wordCount;
}

function calculateAndDisplayReadTime() {
    const wordCount = getWordCount();
    const readingSpeed = 4; // words per second
    const readTimeSeconds = wordCount / readingSpeed;
    const readTimeMinutes = Math.ceil(readTimeSeconds / 60); // Round up to nearest minute

    // Update read time in the top right-hand corner
    document.getElementById('read-time').textContent = `Read Time: ${readTimeMinutes} min`;
}