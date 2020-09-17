// reach the API for rhymes

const url = "https://api.datamuse.com/words?";
const myParam = "rel_rhy=";

// page elements for rhymes

const inputCuvant = document.querySelector("#cuvant");
const buton = document.querySelector("#trimite");
const listare = document.querySelector("#lista");

// render results for rhymes

const renderResponse = (res) => {
  if (!res.length) {
    listare.innerHTML = `<p>Try again!</p><p>There were no suggestions found!</p>`;
    return;
  }
  let wordList = [];
  for (let i = 0; i < Math.min(res.length, 10); i++) {
    wordList.push(`<li>${res[i].word}</li>`);
  }
  wordList = wordList.join("");
  listare.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
  return;
};

// AJAX function for rhymes
const capteazaRezultate = () => {
  const cuvantulScris = inputCuvant.value;
  const urlFinal = `${url}${myParam}${cuvantulScris}`;
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse(xhr.response);
    }
  };

  xhr.open("GET", urlFinal);
  xhr.send();
};

// display rhymes results

const dispAll = (event) => {
  event.preventDefault();
  while (listare.firstChild) {
    listare.removeChild(listare.firstChild);
  }
  capteazaRezultate();
};

//the button for rhymes
buton.addEventListener("click", dispAll);

// the antonyms part

//api call
const urla = "https://api.datamuse.com/words?";
const param = "rel_ant=";

// my elements
const inputWord = document.querySelector("#cuvantel");
const butonas = document.querySelector("#buton");

// AJAX function
const rezFinal = () => {
  const wordy = inputWord.value;
  const urlComplet = `${urla}${param}${wordy}`;
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderRawResponse(xhr.response);
    }
  };
  xhr.open("GET", urlComplet);
  xhr.send();
};

// display function

const renderRawResponse = (res) => {
  if (!res.length) {
    listare.innerHTML = "Please enter a word";
    return;
  }

  let words = [];
  for (let i = 0; i < Math.min(res.length, 10); i++) {
    words.push(`<li>${res[i].word}</li>`);
  }
  words = words.join("");

  listare.innerHTML = `<p>The opposite words are:</p> <ol>${words}</ol>`;
};

const displayAll = (event) => {
  event.preventDefault();
  while (listare.firstChild) {
    listare.removeChild(listare.firstChild);
  }
  rezFinal();
};

butonas.addEventListener("click", displayAll);
