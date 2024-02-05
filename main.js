const formInput = document.getElementById("cardGeneratorForm");
const section = document.querySelector("#cardContainer");

const waitDiv = document.querySelector("#wait");

let newCharacter;
let newCharacterImage;

const countdownDiv = document.querySelector("#countdown");

function startCountdown() {
  let count = 10;

  formInput.style.display = "none";
  section.style.display = "none";
  countdownDiv.style.display = "block";
  waitDiv.style.display = "block";

  function updateCount() {
    countdownDiv.textContent = count;
    count--;

    if (count >= 0) setTimeout(updateCount, 1000);
    else {
      countdownDiv.style.display = "none";
      waitDiv.style.display = "none";
      section.style.display = "grid";
      formInput.style.display = "block";
    }
  }
  updateCount();
}

formInput.addEventListener("submit", function (event) {
  event.preventDefault();

  const { characterDescription } = event.target;

  // loader.style.display = "block";

  // setTimeout(() => {
  //   // Hide the loader when the API call is resolved
  //   section.style.display = "grid";
  //   formInput.style.display = "block";
  //   loader.style.display = "none";
  // }, 10000);

  startCountdown();

  generateCardText(characterDescription.value)
    .then((textDescription) => {
      newCharacter = textDescription;
      return textDescription;
    })
    .then((textDescription) => generateCardImage(textDescription))
    .then((img) => createArticle(newCharacter, img))
    .then((article) => section.append(article))
    .catch((error) => {
      console.error("Error generating card:", error);
    });

  formInput.reset();
});
