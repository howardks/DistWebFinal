const fs = require('fs');
const path = require("path");

class FavoritesAPI {
    constructor() {
        this.filePath = path.resolve('./data/favoritesData.json');
        this.favoritesData = JSON.parse(fs.readFileSync(this.filePath));
    }

    addFavorite(characterId) {
        if (!this.favoritesData.includes(characterId)) {
            this.favoritesData.push(characterId);
            fs.writeFileSync(this.filePath, JSON.stringify(this.favoritesData));
        }
    }

    getFavorites() {
        return this.favoritesData;
    }
}

module.exports = FavoritesAPI;
