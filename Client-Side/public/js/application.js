// SVGs for favorite and not favorite
var notFavoriteSVG = 
`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>`;
var favoriteSVG = 
`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd" class="bi bi-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>`;

var data = getCharacters(); // Fetch characters
initialize();

function initialize() {

    generateNav();
    generateContent(data); // Use the fetched data
}

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
                <form class="d-flex border border-primary rounded mx-4 mb-1 p-2">
                    <div class="text-white ms-1 me-2 my-2">Filters: </div> 
                    <select class="form-select-sm bg-dark text-white border-primary mx-1" aria-label="Default select example">
                        <option selected>Any Universe</option>
                        <option value="1">Labyrinth</option>
                        <option value="2">Spongebob</option>
                        <option value="3">R&B Singers</option>
                    </select>
                    <select class="form-select-sm bg-dark text-white border-primary mx-1" aria-label="Default select example">
                        <option selected>Any Favorites</option>
                        <option value="1">Favorites</option>
                        <option value="2">Not Favorites</option>
                    </select>
                    <button class="btn text-white border-primary mx-1">Show All</button>
                </form>
            </div>
        </div>
    </nav>`;
}

function generateContent(data) {
    // Set up content
    var content = document.querySelector(".content");
    content.replaceChildren();
    
    // Create a card for each character
    var grid = document.createElement("div");
    grid.classList.add("row", "row-cols-2", "row-cols-md-3", "row-cols-lg-4", "row-cols-xl-6", "g-4", "mx-5", "my-4", "d-flex");

    var favorites = getFavorites();

    data.forEach(item => {
        var col = document.createElement("div");
        col.classList.add("col");

        var isFavorite = favorites.includes(item.id.toString());
        var favoriteIcon = isFavorite ? favoriteSVG : notFavoriteSVG;

        col.innerHTML = 
        `<div class="card h-100 border-primary">
            <div class="card-header bg-dark text-white">
                <span class="fs-4">${item.name}</span>
                <span class="float-end pt-1 favorite-icon" onclick="toggleFavorite(${item.id}, this)">${favoriteIcon}</span>
            </div>
            <img src="/images/thumb-${item.image}" alt="${item.name} image">
            <div class="card-body d-flex flex-column bg-dark">                
                <button class="btn btn-primary mt-auto" onclick="generateModal(${item.id})">View</a>
            </div>
        </div>`;

        grid.append(col);
    });

    content.append(grid);

    var modalTemplate = document.createElement("div");
    modalTemplate.innerHTML = 
    `<div id="content-modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div id="modal-header" class="modal-header"></div>
                <div id="modal-body" class="modal-body"></div>
                <div id="modal-footer" class="modal-footer"></div>
            </div>
        </div>
    </div>`;

    content.append(modalTemplate);
}

function generateModal(id) {
    populateModal(id);

    const modal = new bootstrap.Modal("#content-modal");
    modal.show();
   
}

function populateModal(id) {
    var modalHeader = document.querySelector("#modal-header");
    modalHeader.innerHTML = `<h4>${this.data[id].name}</h4>`;
    
    var modalBody = document.querySelector("#modal-body");
    modalBody.innerHTML = 
    `<img class="mb-2" src="/images/${this.data[id].image}" alt="${this.data[id].name} image" width="100%">
    <p class="mb-0">${this.data[id].desc}</p>`;

    let prev = (id > 0) ? id - 1 : this.data.length - 1;
    let next = (id < this.data.length - 1) ? id + 1 : 0;
    
    var modalFooter = document.querySelector("#modal-footer");
    modalFooter.innerHTML = 
    `<button type="button" class="btn btn-dark border-primary" onclick="populateModal(${this.data[prev].id})">Prev</button>
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-dark border-primary" onclick="populateModal(${this.data[next].id})">Next</button>`;
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

function getFavorites() {
    var xhttp = new XMLHttpRequest();
    var url = 'http://localhost:3050/favorites/';
    xhttp.open("GET", url, false);  
    xhttp.send();

    return JSON.parse(xhttp.responseText);
}


function toggleFavorite(id, iconElement) {
    var favorites = getFavorites();
    var isFavorite = favorites.includes(id.toString());
    var method = isFavorite ? 'DELETE' : 'POST';
    var url = `http://localhost:3050/favorites/${isFavorite ? 'remove' : 'add'}/${id}`;
    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        var updatedFavorites = getFavorites();
        var isNowFavorite = updatedFavorites.includes(id.toString());

        iconElement.innerHTML = isNowFavorite ? favoriteSVG : notFavoriteSVG;
    };

    xhttp.open(method, url, true);
    xhttp.send();
}
