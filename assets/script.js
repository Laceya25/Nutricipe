const form = document.querySelector('form');
let searchBtn = document.querySelector("#search");
const article = document.querySelector('article');
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

let searchHistory = []
const existingSearchHistory = localStorage.getItem('searchHistory')
if (existingSearchHistory) {
    searchHistory = JSON.parse(existingSearchHistory);
    console.log(searchHistory)
    //loop over elements in the array and then call additemtosearchhistory on each.
    searchHistory.forEach(element => {
        addItemToSearchHistory(element)
    });
} 


localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

//input bar is wrapped in form. on event (press enter) then the function in the listener is ran
 form.addEventListener("submit", function(event) {
    console.log("pressed")
    //prevents form from refreshing when submitted
    event.preventDefault();
    //retrieves the value of the input inside of element form. Basically taking what you type in bar and placing it inside of api url
    search = event.target.querySelector('input').value;
    if (search) {
        searchHistory.push(search)
        //when user searches add that search to history list
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        console.log(localStorage.getItem('searchHistory'))
        addItemToSearchHistory(search)

        console.log(searchHistory)
        //Then runs the next function to load api details

        removeExistingRecipeRows()

        getRecipes()
    }
    apiRequest2()
 
})

//function to add search item to html class for search history
function addItemToSearchHistory (item) {
    //grabs search history items element defined in index html/dom (ul)
    var searchHistoryContainer = document.querySelector('#search-history-items')
    //creating new li element which will have search item as text
    var searchHistoryItemElement = document.createElement("li")
    //setting text content of new element
    searchHistoryItemElement.textContent = item
    //adding new item to search history element
    searchHistoryContainer.appendChild(searchHistoryItemElement)
}

function deleteSearchHistory () {
    var deleteSearchHistoryContainer = document.querySelector('#search-history-items')
    deleteSearchHistoryContainer.innerHTML = '';
    localStorage.setItem('searchHistory', JSON.stringify([]));
}

const deleteButtonElement = document.querySelector('#history-delete-button')
deleteButtonElement.addEventListener("click", function(event) {
    deleteSearchHistory() 
})

// function to fetch data from api
// Api key and id for other api
const recApiKey = "b66c48f1da5cbf78d437f8b08aa18632"
const recApiId = "965f718b"

async function getRecipes(){
    //api url
    const recipeURL = `https://api.edamam.com/search?q=${search}&app_id=${recApiId}&app_key=${recApiKey}`;
    //wait for the completion of fetch from api
    const response = await fetch(recipeURL);
    //waits for completion of json
    const data = await response.json();
    // for (let i = 0; i < data.hits.length; i++) {
    
    //}
    //createCard(data.hits);
    createRecipeRows (data.hits)
    console.log(data)
}

function createRecipeRows(recipes) {
    const recipeElement = document.querySelector('#recipe-rows')
    recipes.forEach((recipeObject, index) => {
        const recipe = recipeObject.recipe
        console.log(recipe)
        console.log(index)

        let ingredients = ''
        recipe.ingredientLines.forEach((ingredientLine) => {
            const ingredientDiv = `<div>${ingredientLine}</div>`
            ingredients += ingredientDiv
        })


        const recipeHTML = `
        <tr>
            <td>${recipe.label}</td>
            <td>${Math.floor(recipe.calories)}</td>
            <td>${recipe.cuisineType}</td>
            <td>${ingredients}</td>
            <td> 
                <img src="${recipe.image}" />
            </td>
        </tr>
        `
        recipeElement.insertAdjacentHTML('beforeend', recipeHTML)
        
    })
}

function removeExistingRecipeRows() {
    const recipeElement = document.querySelector('#recipe-rows')
    Array.from(recipeElement.children).forEach((child) => {child.remove()})
}

//todo: rename to what it does for more clarity
 async function apiRequest2() {
    const quoteURL = "https://api.quotable.io/random"
    const response = await fetch(quoteURL)
    const data = await response.json();
        console.log(data)
        
        quote.innerHTML = data.content;
        author.innerHTML = "- " + data.author;
    }

function createCard() {

}