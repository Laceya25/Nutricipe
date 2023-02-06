const form = document.querySelector('form')
let searchBtn = document.querySelector("#search")


// Api key and id for other api
const nutApiKey = "08705eb334546608d328eb002f53c968"
const nutApiId = "ff99687b"

//input bar is wrapped in form. on event (press enter) then the function in the listener is ran
form.addEventListener("submit", function(event) {
    console.log("pressed")
    //prevents form from refreshing when submitted
    event.preventDefault();
    //retrieves the value of the input inside of element form. Basically taking what you type in bar and placing it inside of api url
    search = event.target.querySelector('input').value;
    
    console.log(search)
    //Then runs the next function to load api details
    apiRequest()
})

// function to fetch data from api
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

function createCard() {

}