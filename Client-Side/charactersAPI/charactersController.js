const fs = require('fs');
const path = require("path");

class charactersAPI {
    constructor() {
        this.appData = JSON.parse(fs.readFileSync(path.resolve('./charactersAPI/data/applicationData.json')));
    }

    getAllCharacters() {
        return this.appData;
    }

    getCharacterById(id) {
        return this.appData.find(item => item.id == id);
    }
}

module.exports = charactersAPI;