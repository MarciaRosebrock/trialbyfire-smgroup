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

function deleteArticle(id) {
  document.getElementById(id).remove();

  const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));

  const updatedArticles = (
    articlesFromLocalStorage || articlesNotInLocalStorage
  ).filter((article) => article.id !== id);

  localStorage.setItem("articles", JSON.stringify(updatedArticles));
}

function renderArticles() {
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));

  if (!articlesFromLocalStorage) {
    localStorage.setItem("articles", JSON.stringify(articlesNotInLocalStorage));
  }

  const articlesToUse = JSON.parse(localStorage.getItem("articles"));
  const articleSection = document.querySelector('section[id="articles"]');

  for (article of articlesToUse) {
    //Create article
    const newArticle = document.createElement("article");

    //Set ID
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
    deleteButton.onclick = deleteArticle.bind(null, article.id);
    newArticle.appendChild(deleteButton);

    //Append article to articles section
    articleSection.appendChild(newArticle);
  }
}
renderArticles();
