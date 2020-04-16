const fs = require('fs');
const path = require('path');

const dataPath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'item.json'        
    );

const getItemsFromFile = (callBack) => {
    fs.readFile(dataPath, (error, fileContent) => {
        if(error){
            return callBack([]);
        }
        callBack(JSON.parse(fileContent));
    });
}

//Model
module.exports = class Item {
    constructor(itemDesc, itemResolveDate){
        this.itemDesc = itemDesc;
        this.itemResolveDate = itemResolveDate;
    }

    saveItem() {
        getItemsFromFile(items => {
            items.push(this);
            fs.writeFile(dataPath, JSON.stringify(items), (error) => {
                console.log(error);
            });
        });
       
    }

    static getItems(callBack){
        getItemsFromFile(callBack);
    }
}