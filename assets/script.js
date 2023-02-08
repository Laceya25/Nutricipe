const form = document.querySelector('form')
let searchBtn = document.querySelector("#search")
const article = document.querySelector('article')




let searchHistory = [] 
//input bar is wrapped in form. on event (press enter) then the function in the listener is ran
 form.addEventListener("submit", function(event) {
    console.log("pressed")
    //prevents form from refreshing when submitted
    event.preventDefault();
    //retrieves the value of the input inside of element form. Basically taking what you type in bar and placing it inside of api url
    search = event.target.querySelector('input').value;
    searchHistory.push(search)
    //when user searches add that search to history list
    addItemToSearchHistory(search)

    console.log(searchHistory)
    //Then runs the next function to load api details
    apiRequest()
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

// function to fetch data from api
// Api key and id for other api
const recApiKey = "b66c48f1da5cbf78d437f8b08aa18632"
const recApiId = "965f718b"

async function apiRequest(){
    //api url
    const recipeURL = `https://api.edamam.com/search?q=${search}&app_id=${recApiId}&app_key=${recApiKey}`;
    //wait for the completion of fetch from api
    const response = await fetch(recipeURL);
    //waits for completion of json
    const data = await response.json();
    createCard();
    console.log(data)
}

 async function apiRequest2() {
    const quoteURL = "https://api.quotable.io/random"
    const response = await fetch(quoteURL)
    const data = await response.json();
        console.log(data)
    }



 
function createCard() {

}

