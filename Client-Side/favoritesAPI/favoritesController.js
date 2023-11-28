const fs = require('fs');
const path = require('path');

class favoritesAPI {
    constructor() {
        this.filePath = path.resolve('./data/favoritesData.json');
        this.favoritesData = JSON.parse(fs.readFileSync(this.filePath));
    }

    addFavorite(id) {
        if (!this.favoritesData.includes(id)) {
            this.favoritesData.push(id);
            fs.writeFileSync(this.filePath, JSON.stringify(this.favoritesData));
        }
    }

    removeFavorite(id) {
        const index = this.favoritesData.indexOf(id);
        if (index > -1) {
            this.favoritesData.splice(index, 1);
            fs.writeFileSync(this.filePath, JSON.stringify(this.favoritesData));
        }
    }
    
    getFavorites() {
        return this.favoritesData;
    }
}

module.exports = favoritesAPI;
