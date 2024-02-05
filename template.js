function createArticle(data, img) {
  console.log(typeof img);

  const { description, name } = data;
  const article = document.createElement("article");
  article.classList.add("character");

  article.innerHTML = `<img src=${img} alt=${name}/>
    <h2 class="charaterName">${name}</h2>
        <p>${description}</p>`;

  return article;
}
