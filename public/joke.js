const btn = document.getElementById("fetchJokeBtn");
const jokeDisplay = document.getElementById("jokeDisplay");
const categoriesDisplay = document.getElementById("categoriesDisplay");
const categoriesBtn = document.getElementById("fetchCategoriesBtn");
btn.addEventListener("click", async function () {
    const response = await fetch('/jokebook/random');
    const jokeData = await response.json();
    jokeDisplay.innerText = jokeData.joke + "\n" + jokeData.response;
    });
categoriesBtn.addEventListener("click", async function () {
    const response = await fetch('/jokebook/categories');
    const categories = await response.json();
    var content = '';
    categories.forEach(element => {
        content += `<button id="${element}">${element}</button>`
    });
    categoriesDisplay.innerHTML = content;
    getJokes();
});
function getJokes(){
    const lameJokebtn = document.getElementById("lameJoke");
    const funnyJokebtn = document.getElementById("funnyJoke");

    lameJokebtn.addEventListener("click", async function () {
        const response = await fetch('/jokebook/joke/lameJoke');
        const joke = await response.json();
        jokeDisplay.innerText = joke.joke + "\n" + joke.response;
    })
    funnyJokebtn.addEventListener("click", async function () {
        const response = await fetch('/jokebook/joke/funnyJoke');
        const joke = await response.json();
        jokeDisplay.innerText = joke.joke + "\n" + joke.response;
    })
}