// get the API
const url = "https://api.datamuse.com/words";
const param = "?sl=";

//get the page elements

const inputWord = document.querySelector("#text");
const buton = document.querySelector("#buton");
const listOfWords = document.querySelector("#lista");

// the AJAX function

const getWords = () => {
  const input = inputWord.value;
  const urlFinal = `${url}${param}${input}`;

  fetch(urlFinal, { cache: "no-cache" })
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("This is an error");
      },

      (networkError = () => {
        console.log(networkError.message);
      })
    )
    .then((jsonResponse) => {
      returnTheResponse(jsonResponse);
    });
};

// render function

const returnTheResponse = (res) => {
  if (!res.length) {
    document.getElementById("lista").innerHTML = "Please enter a word";
    return;
  }

  let cuvinte = [];
  for (let i = 0; i < Math.min(res.length, 10); i++) {
    cuvinte.push(`<li>${res[i].word}</li>`);
  }
  cuvinte = cuvinte.join("");

  listOfWords.innerHTML = `<p>The similar words we got are these:</p> <ol>${cuvinte}</ol>`;
  return;
};

// display and clear function

const displayNice = (event) => {
  event.preventDefault();
  if (listOfWords.firstChild) {
    listOfWords.removeChild(listOfWords.firstChild);
  }
  getWords();
};

// push the button

buton.addEventListener("click", displayNice);
