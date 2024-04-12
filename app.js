const articlesNotInLocalStorage = [
  {
    date: "2/3/24",
    content: "I enacted my superpower: Ladderly with John.",
    id: "article-0",
  },

  {
    date: "2/10/24",
    content:
      "I completed the trial by fire. It went a lot like this: play, pause, play, pause, rewind, play, pause. You get the gist.",
    id: "article-1",
  },
];

// Save articlesNotInLocalStorage to local storage when the script initializes
localStorage.setItem("articles", JSON.stringify(articlesNotInLocalStorage));

// Event listener for delete buttons
document.getElementById("articles").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const article = event.target.closest("article");
    const articleId = article.id;
    article.remove();
    removeFromLocalStorage(articleId); // Remove the article from local storage using its ID
    calculateAndDisplayReadTime(); // Recalculate read time after deletion
  }
});

// Function to remove article from local storage using its ID
function removeFromLocalStorage(articleId) {
  let articlesFromLocalStorage =
    JSON.parse(localStorage.getItem("articles")) || [];
  const updatedArticles = articlesFromLocalStorage.filter(
    (article) => article.id !== articleId
  );
  localStorage.setItem("articles", JSON.stringify(updatedArticles));
}

function renderArticles() {
  const articlesFromLocalStorage =
    JSON.parse(localStorage.getItem("articles")) || [];
  const articleSection = document.getElementById("articles");

  for (let i = 0; i < articlesFromLocalStorage.length; i++) {
    const article = articlesFromLocalStorage[i];
    const newArticle = document.createElement("article");

    //Set id
    newArticle.id = article.id;

    //Set date
    const date = document.createElement("h2");
    date.classList.add("date");
    date.textContent = article.date;
    newArticle.appendChild(date);

    //Set content
    const content = document.createElement("p");
    content.textContent = article.content;
    newArticle.appendChild(content);

    //Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");
    newArticle.appendChild(deleteButton);

    //Append article to articles section
    articleSection.appendChild(newArticle);
  }
}

renderArticles();

// Function to handle form submission
document
  .getElementById("new-entry-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get values from the form
    const date = document.getElementById("date").value;
    const entry = document.getElementById("entry").value;
    const font = document.getElementById("font-select").value;
    const backgroundColor = document.getElementById("background-color").value;

    // Create an object for the new article
    const newArticle = {
      date: date,
      content: entry,
    };

    // Save new article to local storage
    let articlesFromLocalStorage =
      JSON.parse(localStorage.getItem("articles")) || [];
    articlesFromLocalStorage.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(articlesFromLocalStorage));

    // Render the new article
    renderNewArticle(date, entry, font, backgroundColor);

    // Recalculate read time
    calculateAndDisplayReadTime();

    // Clear form fields
    document.getElementById("new-entry-form").reset();
  });

function renderNewArticle(date, content, font, backgroundColor) {
  // Create a new article element
  const entry = document.createElement("article");
  entry.innerHTML = '<h2 class="date">' + date + "</h2><p>" + content + "</p>";

  // Add custom font
  entry.querySelector("p").style.fontFamily = font;

  // Add custom background color
  entry.style.backgroundColor = backgroundColor;

  // Add a delete button to the new article
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-btn";
  entry.appendChild(deleteButton);

  // Add the new article to the articles section
  document.getElementById("articles").appendChild(entry);
}

function getWordCount() {
  let paragraphs = document.getElementsByTagName("p");
  let h2s = document.getElementsByTagName("h2");
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
  document.getElementById(
    "read-time"
  ).textContent = `Read Time: ${readTimeMinutes} min`;
}
