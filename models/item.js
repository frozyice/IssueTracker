const fs = require('fs');
const path = require('path');

const dataPath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'item.json'        
    );

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset()); //-60
    return local.toJSON().slice(0,16);
});

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
       return 0;  
    }  
 }

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
        this.itemDateCreated = new Date().toDateInputValue();
    }

    saveItem() {
        getItemsFromFile(items => {
            
            items.push(this);
            items.sort(sortByProperty('itemResolveDate'));
            fs.writeFile(dataPath, JSON.stringify(items), (error) => {
                console.log(error);
            });
        });
       
    }

    static getItems(callBack){
        getItemsFromFile(callBack);
    }
}