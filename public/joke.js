const btn = document.getElementById("fetchJokeBtn");
const jokeDisplay = document.getElementById("jokeDisplay");
const categoriesDisplay = document.getElementById("categoriesDisplay");
const categoriesBtn = document.getElementById("fetchCategoriesBtn");
const jokeCategory = document.getElementById("catselect");
const jokeFirst = document.getElementById("jokeFirst");
const jokeSec = document.getElementById("jokeSecond");
const jokeAddForm = document.getElementById("addjokeform");
const divRes= document.getElementById("res");
const statsBtn = document.getElementById("showstats");
const statsTable = document.getElementById("tablediv");
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
jokeAddForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    //console.log(jokeCategory.value);
    //console.log(jokeFirst.value)
    var joke= {"joke": jokeFirst.value, "response": jokeSec.value};
    //console.log(joke);
    const res = await fetch(`jokebook/joke/${jokeCategory.value}`,
    {method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'host': 'http://127.0.0.1:3000'
        },
    body: JSON.stringify(joke)}
    )
    const wiad = await res;
    const wiadtext= await wiad.json();
    if (wiad.status == 400){
        return divRes.innerHTML = wiadtext.error; 
    }
    if (wiad.status == 201){
        return divRes.innerHTML = wiadtext.message; 
    }
    
    
})

statsBtn.addEventListener('click', async function(){
    const resp = await fetch('/jokebook/stats');
    const content = await resp.json();
    //console.log(content);
    let tableContent = '<table id="statstable"><th>Kategoria</th><th>Liczba żartów</th>'
    content.forEach(elem =>tableContent += `<tr><td>${elem.category}</td><td>${elem.count}</td>`)
    tableContent += '</table>';
    statsTable.innerHTML = tableContent; 
})
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