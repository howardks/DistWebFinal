// Get character data from the REST API
var data = this.getCharacters();

// Populate NavBar with home button and character buttons
var nav = document.querySelector("nav");

var button = document.createElement("button");
button.innerHTML = "Home";
button.setAttribute('onclick', `navHome()`);
nav.append(button);

data.forEach(item => {
    button = document.createElement("button");
    button.innerHTML = `${item.name}`;
    button.setAttribute("onclick", `navigate(${item.id})`);
    nav.append(button);
});

// Function to populate Home page
function navHome() {
    var h1 = document.querySelector("h1");
    h1.innerHTML = "Labyrinth Characters";

    var content = document.querySelector(".content")
    content.replaceChildren();
    content.append("Please select a button above.");
}

// Function to populate Character pages by ID
function navigate(id) {
    var charData = this.getCharacter(id);
    
    var content = document.querySelector(".content")
    content.replaceChildren();
    
    var h2 = document.createElement("h2");
    h2.innerHTML = `${charData.name}`;
    content.append(h2);
    
    var img = document.createElement("img");
    img.setAttribute("src", `${charData.image}`);
    img.classList.add("char-img");
    content.append(img);

    var desc = document.createElement("p");
    desc.innerHTML = `${charData.desc}`;
    content.append(desc);
}

// Function to retrieve all Character data from REST API
function getCharacters() {
    var xhttp = new XMLHttpRequest();
    var url = `http://localhost:3050/characters/character`;
    xhttp.open("GET", url, false);
    xhttp.send();

    return JSON.parse(xhttp.responseText);
}

// Function to retrieve Character data from REST API by ID
function getCharacter(id) {
    var xhttp = new XMLHttpRequest();
    var url = `http://localhost:3050/characters/character/${id}`;
    xhttp.open("GET", url, false);
    xhttp.send();

    return JSON.parse(xhttp.responseText);
}