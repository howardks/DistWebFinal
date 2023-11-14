// Get character data from the REST API
var data = this.getCharacters();

generateNav();
generateContent(data);

function generateNav() {
    // Populate NavBar with home button and character buttons
    var nav = document.querySelector("#nav");

    nav.innerHTML = 
    `<nav class="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
        <div class="container-fluid border-bottom border-primary">
            <span class="fs-1 text-white mb-2 ms-1">Characters</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navigation">
            <ul class="nav navbar-nav me-auto mb-2 mb-sm-0"></ul>
                <form class="d-flex border border-primary rounded mx-4 mb-1">
                    <ul class="nav navbar-nav me-auto mb-2 mb-sm-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false">Filters</a>
                            <ul class="dropdown-menu border-primary bg-dark text-white dropdown-menu-end">
                                <li><a class="dropdown-item text-white" href="#">All Characters</a></li>
                                <li><hr class="dropdown-divider bg-primary"></li>
                                <li><a class="dropdown-item text-white" href="#">Another action</a></li>
                                <li><a class="dropdown-item text-white" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </nav>`;
}

function generateContent(data) {
    // SVGs for favorite and not favorite
    var notFavoriteSVG = 
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>`;
    var favoriteSVG = 
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>`;

    // Set up content
    var content = document.querySelector(".content");
    content.replaceChildren();
    
    // Create a card for each character
    var grid = document.createElement("div");
    grid.classList.add("row", "row-cols-2", "row-cols-md-3", "row-cols-lg-4", "row-cols-xl-6", "g-4", "mx-5", "my-4", "d-flex");

    data.forEach(item => {
        var col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = 
        `<div class="card h-100 border-primary">
            <div class="card-header bg-dark text-white">
                <span class="fs-4">${item.name}</span>
                <span class="float-end pt-1">${favoriteSVG}</span>
            </div>
            <img src="${item.image}" alt="${item.name} image">
            <div class="card-body d-flex flex-column bg-dark">                
                <button class="btn btn-primary mt-auto" onclick="navigate(${item.id})">View</a>
            </div>
        </div>`;

        grid.append(col);
    });
    
    content.append(grid);
}

function generateModal(id) {
    // Just for testing
    //navigate(id);
}

// Function to populate Character pages by ID
function navigate(id) {
    var charData = this.getCharacter(id);
    
    var content = document.querySelector(".content")
    content.replaceChildren();

    content.innerHTML = 
    `<div class="mx-5 my-4">
        <h2 class="text-white">${charData.name}</h2>
        <img class="border border-primary my-3" src="${charData.image}">
        <p class="text-white">${charData.desc}</p>
    </div>
    <div class="mx-5 mb-4">
        <button id="previous-btn" class="btn border-primary text-white">Previous</button>
        <button id="close-btn" class="btn border-primary text-white">Close</button>
        <button id="next-btn" class="btn border-primary text-white">Next</button>
    </div>`;
    
    let prev = (id > 0) ? id - 1 : this.data.length - 1;
    let next = (id < this.data.length - 1) ? id + 1 : 0;

    document.querySelector("#close-btn").setAttribute("onclick", `generateContent(${JSON.stringify(this.data)})`); // Doesn't work yet
    document.querySelector("#previous-btn").setAttribute("onclick", `navigate(${this.data[prev].id})`);
    document.querySelector("#next-btn").setAttribute("onclick", `navigate(${this.data[next].id})`);
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

function addFavorite(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/favorites/" + id, true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert("Character added to favorites!");
        }
    };
    xhttp.send();
}