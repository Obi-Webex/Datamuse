// reach the API

const url = "https://api.datamuse.com/words?";
const myParam = "rel_rhy=";

// page elements

const inputCuvant = document.querySelector("#cuvant");
const buton = document.querySelector("#trimite");
const listare = document.querySelector("#lista");

// render results

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

// AJAX function
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

// display results

const dispAll = (event) => {
  event.preventDefault();
  while (listare.firstChild) {
    listare.removeChild(listare.firstChild);
  }
  capteazaRezultate();
};

buton.addEventListener("click", dispAll);
