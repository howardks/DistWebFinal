const fs = require('fs');
const path = require('path');

class filtersAPI {
    constructor() {
        this.appData = JSON.parse(fs.readFileSync(path.resolve('./data/filtersData.json')));
        this.filePath = path.resolve('./data/filtersData.json');
        // this.favoritesData = JSON.parse(fs.readFileSync(this.filePath));


    }

    getFilters() {
        return this.appData;
    }

    getFiltersByUniverse(universe) {
        return this.appData.filter(item => item.universe === universe);
    }

    getFiltersByFavorite(favorite) {
        var favoriteVal = (favorite === 'Favorites') ? true : false;
        return this.appData.filter(item => item.favorite === favoriteVal);
    }
    updateFavoriteStatus(id, newFavoriteStatus) {
        if (id > -1) {

            this.appData[id].favorite = newFavoriteStatus;
            fs.writeFileSync(this.filePath, JSON.stringify(this.appData, undefined, 2));
        }
        return this.appData;
    }

}

module.exports = filtersAPI;
