const fs = require('fs');
const path = require("path");

class filtersAPI {
    constructor() {
        this.appData = JSON.parse(fs.readFileSync(path.resolve('./data/characterData.json')));
        
    }
    getCharactersByUniverse(id) {
        // Assuming universe value of 1 corresponds to "Labyrinth" characters
     
            const universeCharacterMap = {
                1: [0, 1, 2], // Labyrinth
                2: [3, 4, 5], // Spongebob
                3: [6, 7, 8]  // R&B Singers
            };
        
            var characterIds = universeCharacterMap[id];
            return characterIds ? this.appData.filter(character => characterIds.includes(character.id)) : this.appData;
        
    }

    getAllCharacters() {
        return this.appData;
    }

    getFavoritesCharacters(isFavorite) {
        // TODO: Implement the logic to filter characters based on the favorite status
        // This might require additional data or a different approach depending on how favorites are tracked
    }

}

module.exports = filtersAPI;