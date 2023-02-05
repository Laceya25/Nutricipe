let searchBtn = document.querySelector("#search")

// Api key and id for other api
const nutApiKey = "08705eb334546608d328eb002f53c968"
const nutApiId = "ff99687b"

//for button so that it makes a fetch request on click
searchBtn.addEventListener("click", function() {
    console.log("pressed")
    apiRequest()
})

// function to fetch data from api
async function apiRequest(){
    const recApiKey = "332e2ef599eeb54fcc43f27b932052e9d"
    const recApiId = "965f718b"
    let Response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=" + recApiId + "&app_key" + recApiKey +"q=burger");
    console.log(Response)
    let data = Response.json
    console.log(data)
}