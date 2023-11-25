const fs = require('fs');
const path = require("path");

class filtersAPI {
    constructor() {
        this.appData = JSON.parse(fs.readFileSync(path.resolve('./data/filtersData.json')));
        
    }
    
    getFilters() {
        return this.appData;
    }
    getFiltersByUniverse(universe) {
        return this.appData.filter(item => item.universe === universe);
    }

    getFiltersByFavorite(favorite) {
        var favoriteVal = (favorite === "Favorites") ? true : false;
        return this.appData.filter(item => item.favorite === favoriteVal);

        
    }

}

module.exports = filtersAPI;